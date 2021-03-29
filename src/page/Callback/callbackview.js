import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import queryString from "query-string";
import EBSSplashScreen from "components/atoms/EBSSplashScreen";
import * as AuthActions from 'store/ducks/auth';
import { useHistory } from "react-router-dom"; 
import { loginStatus } from "utils/enums";
import { useSignIn } from "react-auth-kit";
import jwtService from 'services/jwtService';
export default function CallbackView() {

  const dispatch = useDispatch();
  const storeAuth = useSelector((store) => store.auth);
  let history = useHistory();
  const signIn = useSignIn();
	useEffect(() => {
		const authResult = queryString.parse(window.location.search);

		if (authResult.code != null) {
      
			dispatch(AuthActions.oAuthAuthentication(authResult.code));

		} else {
		//	dispatch(Actions.showMessage({ message: 'Not Login' }));
		}

    if(storeAuth.loginState=== loginStatus.SUCCESS){
      const isLogin = signIn({
        token: jwtService.getIdToken(), //Just a random token
        tokenType: "Bearer", // Token type set as Bearer
        authState: { name: "React User", uid: 123456 }, // Dummy auth user state
        expiresIn: 120, // Token Expriration time, in minutes
      });
     // console.log(storeAuth.token_id)
      //dispatch(UserActions.setUserData(storeAuth.token_id))

      if (isLogin) {
        history.push("/");
      } else {
        //  dispatch(actionAuth.changeLoginStatus(loginStatus.FAIL));
      }

    }
	}, [storeAuth,dispatch]);
  return <EBSSplashScreen />;
}
