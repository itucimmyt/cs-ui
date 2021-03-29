import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  makeStyles,
  createMuiTheme,
  MuiThemeProvider,
} from "@material-ui/core/styles";
import { FormattedMessage } from "react-intl";
import {
	AppBar,
	CssBaseline,
	Toolbar,
	Typography,
	IconButton,
	Card,
	Button,
	CardContent
  } from "@material-ui/core";
import {
	Search,
	Dashboard,
	Star,
	AccessTime,
	FilterList,
	Help,
	AccountCircle,
	Menu,
	DashboardRounded
  } from "@material-ui/icons";
import NavBarHeader from "components/molecule/NavBarHeader";
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
  const [open, setOpen] = React.useState(false);

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
        <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>

          <IconButton color="inherit" aria-label="open drawer" edge="start">
            <DashboardRounded/>
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            <FormattedMessage
              id="cs.dashboard"
              defaultMessage="Dashboard"
            />
          </Typography>

          
        </Toolbar>
      </AppBar>      
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
