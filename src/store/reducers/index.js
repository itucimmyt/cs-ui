
import { combineReducers } from 'redux';
import tenant from 'store/ducks/tenant';
import auth from 'store/ducks/auth';
import user from 'store/ducks/user';

const createReducer = asyncReducers =>
	combineReducers({
		auth,	
		tenant,
		user,
		...asyncReducers
	});

export default createReducer;
