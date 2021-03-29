import client from 'utils/apollo';
import { transform, transformAsync } from 'node-json-transform';

import {
	FIND_ENTITY_REFERENCE_LIST,
	QUERY_ROWS,
	FIND_COMPONENT_LIST,
	FIND_TENANT,
	FIND_COMPONENT
} from 'utils/apollo/gql/tenant';
/*
 Here goes initial state and properties to be changed
 */
export const initialState = {
	rows: [],
	columns: [],
	components: [],
	tenant: {
		name: '',
		organization: {
			slogan: '',
			webpage: '',
			legalName: ''
		}
	},
	workflows: [],
	workflow: null
};
/*
 Action types
 */
export const GET_ENTITIES = 'GET_ENTITIES';

export const GET_TENANT = 'GET_TENANT';

export const GET_COMPONENTS = 'GET_COMPONENTS';


/*
 Arrow function for change state
 */
export const setData = payload => ({
	type: GET_ENTITIES,
	payload
});
/*
 Reducer to describe how the state changed
 */
export default function Reducer(state = initialState, action) {
	switch (action.type) {
		case GET_ENTITIES:
			return {
				...state,
				rows: action.payload.rowData,
				columns: action.payload.columnDefs
			};
		case GET_COMPONENTS:
			return {
				...state,
				components: action.payload
			};
		case GET_TENANT:
			return {
				...state,
				tenant: action.payload
			};
	
		default:
			return state;
	}
}


// transformation JSON

const agGridBase = {
	item: {
		columnDefs: 'columns',
		rowData: 'rows'
	},
	operate: [
		{
			run(ary) {
				return transform(ary, nestedAttribute);
			},
			on: 'columnDefs'
		}
	]
};

var nestedAttribute = {
	item: {
		headerName: 'translations.0.translation',
		field: 'name'
	}
};
// Async functions
export const GetEntities = entity => async (dispatch, getState) => {
	client
		.query({
			query: QUERY_ROWS(entity, 50, 1)
		})
		.then(r1 => {
			client
				.query({
					query: FIND_ENTITY_REFERENCE_LIST,
					variables: { val: entity }
				})
				.then(r2 => {
					const result = {
						rows: r1.data[`find${entity}List`].content,
						columns: r2.data.findEntityReferenceList.content[0].attributess.sort(function (a, b) {
							return a.sortno - b.sortno;
						})
					};

					transformAsync(result, agGridBase).then(function (r) {
						dispatch(setData(r));
					});
				});
		});
};

export const GetTenant = id => async (dispatch, getState) => {
	client.query({ query: FIND_TENANT, variables: { id: id } }).then(result => {
		dispatch({
			type: GET_TENANT,
			payload: result.data.findTenant
		});
	});
};

	

export const GetComponents = () => async (dispatch, getState) => {
	client
		.query({
			query: FIND_COMPONENT_LIST
		})
		.then(result => {
			dispatch({
				type: GET_COMPONENTS,
				payload: result.data.findComponentList.content
			});
		});
};
