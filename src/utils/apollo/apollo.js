import { ApolloClient, InMemoryCache } from '@apollo/client';
 

export const client = new ApolloClient({
	cache: new InMemoryCache({
		addTypename: false
	}),
	uri: process.env.REACT_APP_CSAPI_URI_GRAPHQL,
	headers: {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
		 authorization: `Bearer ${localStorage.getItem('id_token')}`
	}
});
