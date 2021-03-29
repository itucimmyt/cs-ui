import FuseUtils from 'utils/FuseUtils';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import oauth from 'axios-oauth-client';
import { useSignIn } from "react-auth-kit";
/* eslint-disable camelcase */

class JwtService extends FuseUtils.EventEmitter {
	init() {
		// this.setInterceptors();
		this.handleAuthentication();
	}

	setInterceptors = () => {
		axios.interceptors.response.use(
			response => {
				return response;
			},
			err => {
				return new Promise((resolve, reject) => {
					if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
						// if you ever get an unauthorized response, logout the user
						this.emit('onAutoLogout', 'Invalid access_token');
						this.setSession(null);
					}
					throw err;
				});
			}
		);
	};

	authorityCode = () => {
		let url = `${process.env.REACT_APP_AUTH_CONFIG_AUTH_URL}?client_id=${process.env.REACT_APP_AUTH_CONFIG_CLIENT_ID}&scope=openid&`;
		const redirectUrl = `redirect_uri=${process.env.REACT_APP_AUTH_CONFIG_CALLBACK_URL}&response_type=code`;
		url += redirectUrl;
		window.location.href = url;
	};

	handleAuthentication = () => {
		const access_token = this.getAccessToken();
		const id_token = this.getIdToken();

		if (!access_token) {
			this.emit('onNoAccessToken');
			return;
		}

		if (this.isAuthTokenValid(id_token)) {
			// this.setSession(access_token);
			this.emit('onAutoLogin', true);
		} else {
			this.setSession(null);
			this.emit('onAutoLogout', 'access_token expired');
		}
	};

	onAuthenticated = callback => {
		return true;
	};
	
 
	signInWithWSO2 = (authCode) => {
		console.log(authCode)
		const getAuthorizationCode = oauth.client(
			axios.create({
				method: 'POST',
				auth: {
					username: process.env.REACT_APP_AUTH_CONFIG_CLIENT_ID,
					password: process.env.REACT_APP_AUTH_CONFIG_CLIENT_SECRET
				},
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}),
			{
				url: process.env.REACT_APP_AUTH_CONFIG_TOKEN_URL,
				grant_type: 'authorization_code',
				redirect_uri: process.env.REACT_APP_AUTH_CONFIG_CALLBACK_URL,
				code: authCode
			}
		);

		return new Promise((resolve, reject) => {
			getAuthorizationCode()
			.then(response => {
				this.setSession(response.access_token);
				this.setToken(response.id_token);
				resolve(response);
			})
			.catch(error => {
				this.logout();
				reject(new Error('Failed to login with wso2.'))
			});
		});
	}

	setSession = access_token => {
		if (access_token) {
			localStorage.setItem('access_token', access_token);
			// axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
		} else {
			localStorage.removeItem('access_token');
			// delete axios.defaults.headers.common.Authorization;
		}
	};

	setToken = id_token => {
		if (id_token) {
			localStorage.setItem('id_token', id_token);
		} else {
			localStorage.removeItem('access_token');
		}
	};


	logout = () => {
		this.setSession(null);
	};

	isAuthTokenValid = id_token => {
		if (!id_token) {
			return false;
		}
		const decoded = jwtDecode(id_token);
		const currentTime = Date.now() / 1000;
		if (decoded.exp < currentTime) {
			console.warn('access token expired');
			return false;
		}

		return true;
	};

	getTokenDecoded = () => {
		return jwtDecode(window.localStorage.getItem('id_token'));
	};

	getAccessToken = () => {
		return window.localStorage.getItem('access_token');
	};

	getIdToken = () => {
		return window.localStorage.getItem('id_token');
	};
}

const instance = new JwtService();

export default instance;
