 
import {client} from 'utils/apollo/apollo'
import { FIND_USER_LIST } from 'utils/apollo/gql/user';

 
 

// constants
const dataInitial = {
  user: null, 
  roles: []
};

 
const SET_USER_DATA = '[USER] SET DATA';
const USER_REGISTER = '[USER] REGISTER';
const IS_REGISTERING = '[USER] REGISTERING';
const USER_ROLES = '[USER] ROLES';
const REMOVE_USER_DATA = '[USER] REMOVE DATA';
const USER_LOGGED_OUT = '[USER] LOGGED OUT';


// reducer
export default function authReducer(state = dataInitial, action) {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        user: action.payload,
      };
    case USER_ROLES:
        return {
            ...state,
            roles: action.payload,
          };
    
    default:
      return state;
  }
}

// actions
export const setUserData = tokenData => async (dispatch, getState) => {

   const userName = tokenData['http://wso2.org/claims/emailaddress'].toLowerCase();
 
	
	client
		.query({
			query: FIND_USER_LIST,
			variables: { val: userName }
		})
		.then(response => {
			const profile = response.data.findUserList.content[0];
			
			if (profile) {
				dispatch({
					type: SET_USER_DATA,
					payload: profile
				});

				dispatch({
					type: USER_ROLES,
					payload: [`${profile.roles[0].description}`]
				});

				if (profile.roles[0].description === 'poweruser') {
					dispatch({
						type: USER_ROLES,
						payload: ['staff']
					});
				}

				if (profile.person.status === 'Inactive') {
					dispatch({
						type: USER_ROLES,
						payload: []
					});
				}
			}
		});
};


