import axios from "axios";
import oauth from "axios-oauth-client";
import { useSignIn } from "react-auth-kit";
import { loginStatus } from "utils/enums";
import jwtService from 'services/jwtService';
import * as  userActions from 'store/ducks/user';

// constants
const dataInitial = {
  token_id: "",
  loginState: loginStatus.NOT_LOGGED,
};
const SET_LOGIN_STATUS = "SET_LOGIN_STATUS";
const SET_TOKEN = "SET_TOKEN";

// reducer
export default function authReducer(state = dataInitial, action) {
  switch (action.type) {
    case SET_LOGIN_STATUS:
      return {
        ...state,
        loginState: action.payload,
      };
    case SET_TOKEN:
      return {
        ...state,
        token_id: action.payload,
      };
    default:
      return state;
  }
}

// actions
export function getLogin() {
  return (dispatch, getState) => {
    let url = `${process.env.REACT_APP_AUTH_CONFIG_AUTH_URL}?client_id=${process.env.REACT_APP_AUTH_CONFIG_CLIENT_ID}&scope=openid&`;
    const redirectUrl = `redirect_uri=${process.env.REACT_APP_AUTH_CONFIG_CALLBACK_URL}&response_type=code`;
    url += redirectUrl;
    window.location.href = url;
  };
}

export function oAuthAuthentication(authCode) {
 
  return (dispatch, getState) =>
    jwtService
      .signInWithWSO2(authCode)
      .then(() => {
        const codeDecoded = jwtService.getTokenDecoded();
       
        dispatch(userActions.setUserData(codeDecoded));

        // dispatch(GetTenant(1));
       // dispatch(UserActions.getUserData(codeDecoded));
 
       dispatch({
        type: SET_LOGIN_STATUS,
        payload: loginStatus.SUCCESS,
      });

      dispatch({
        type: SET_TOKEN,
        payload: jwtService.getIdToken(),
      });   

      }) 
      .catch((error) => {
        dispatch({
          type: SET_LOGIN_STATUS,
          payload: loginStatus.FAIL,
        });
      });
};
const setSession = (access_token) => {
  if (access_token) {
    localStorage.setItem("access_token", access_token);
    axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
  } else {
    localStorage.removeItem("access_token");
    delete axios.defaults.headers.common.Authorization;
  }
};

const setToken = (id_token) => {
  if (id_token) {
    localStorage.setItem("id_token", id_token);
  } else {
    localStorage.removeItem("access_token");
  }
};

const logout = () => {
  setSession(null);
};

export const changeLoginStatus = (status) => (dispatch, getState) => {
  dispatch({
    type: SET_LOGIN_STATUS,
    payload: status,
  });
};
