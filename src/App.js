import React from "react";
 
import { Provider } from "react-redux";
import { AuthProvider,useIsAuthenticated,useAuthHeader } from "react-auth-kit";



import Routes from "Routes";
// globalization
import { IntlProvider } from "react-intl";

// material
import { CssBaseline } from "@material-ui/core";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

//duck store
import store from "./store";

// theme
//import muiTheme from "styles/theme/default.json";
//const theme = createMuiTheme(muiTheme);

function App() {

   

  const [state, setState] = React.useState({
    locale: localStorage.getItem("locale") || "en",
    message: localStorage.getItem("language"),
  });
  


  return (     
      <Provider store={store}>
        <IntlProvider
          locale={state.locale}
          messages={state.messages}
          defaultLocale={"en"}
        >
          <AuthProvider
            authStorageType="cookie"
            authStorageName="_auth_t"
            authTimeStorageName="_auth_time"
            stateStorageName="_auth_state"
            cookieDomain={window.location.hostname}
            cookieSecure={window.location.protocol === "https:"}
          >
            <Routes/>
          </AuthProvider>
        </IntlProvider>
      </Provider>
    
  );
}

export default App;
