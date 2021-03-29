import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import {
  makeStyles,
  createMuiTheme,
  MuiThemeProvider,
} from "@material-ui/core/styles";
import { CssBaseline, Typography } from "@material-ui/core";
import NavBarHeader from "components/molecule/NavBarHeader";
import Navigation from "components/molecule/Navigation";
import muiTheme from "../../../styles/theme/default.json";
import { useIsAuthenticated, useAuthHeader } from "react-auth-kit";
import * as userActions from "store/ducks/user";
import jwtService from 'services/jwtService';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    marginTop: 65,
    maxHeight: 800,
    padding: theme.spacing(1),
  },
}));

const LayoutOrganism = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const theme = createMuiTheme(muiTheme);
  // Properties of the organism
  const { children, ...rest } = props;
  const [open, setOpen] = React.useState(true);

  const dispatch = useDispatch();

  const storeUser = useSelector((store) => store.user);

  const isAuthenticated = useIsAuthenticated();
  

  //refresh user store

  useEffect(() => {
   
    if (isAuthenticated() && storeUser.user === null) {

      dispatch(userActions.setUserData(jwtService.getTokenDecoded(localStorage.getItem('id_token'))));
    }

  }, [isAuthenticated,storeUser, dispatch]);

  //events
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <NavBarHeader
          open={open}
          handleDrawerOpen={handleDrawerOpen}
          handleDrawerClose={handleDrawerClose}
        />
        <Navigation
          open={open}
          handleDrawerOpen={handleDrawerOpen}
          handleDrawerClose={handleDrawerClose}
        />
        <main className={classes.content}>{props.children}</main>
      </MuiThemeProvider>
    </div>
  );
});
// Type and required properties
LayoutOrganism.propTypes = {
  children: PropTypes.node,
};
// Default properties
LayoutOrganism.defaultProps = {
  children: null,
};

export default LayoutOrganism;
