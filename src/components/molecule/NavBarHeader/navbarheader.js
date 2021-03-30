import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
// CORE COMPONENTS AND ATOMS TO USE
import {
  AppBar,
  CssBaseline,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Chip,
  Paper,
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
  Done,
} from "@material-ui/icons";
import { makeStyles, fade } from "@material-ui/core/styles";
import ServiceManagementIcon from "components/atoms/ServiceManagementIcon";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router-dom";
import AvatarProfile from "components/atoms/AvatarProfile";
import { useDispatch, useSelector } from "react-redux";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  avatar: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  grow: {
    flexGrow: 0.02,
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  actions: {
    flexGrow: 1,
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("md")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,

    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
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
    padding: theme.spacing(3),
  },
}));

const NavBarHeaderMolecule = React.forwardRef((props, ref) => {
  // Properties of the molecule
  const classes = useStyles();
  const { open, children, ...rest } = props;
  let history = useHistory();

  //events
  const handleOnClickDashboard = () => {
    history.push("/dashboard");
  };

  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };

  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={props.handleDrawerOpen}
          edge="start"
          className={clsx(classes.menuButton, open && classes.hide)}
        >
          <Menu />
        </IconButton>
        <IconButton color="inherit" aria-label="open drawer" edge="start">
          <ServiceManagementIcon />
        </IconButton>
        <Typography className={classes.title} variant="h6" noWrap>
          <FormattedMessage
            id="sm.serviceManagement"
            defaultMessage={"Service Management"}
          />
        </Typography>

        <div className={classes.actions}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleOnClickDashboard}
          >
            <Dashboard />
          </IconButton>
          <IconButton color="inherit" aria-label="open drawer" edge="start">
            <Star />
          </IconButton>
          <IconButton color="inherit" aria-label="open drawer" edge="start">
            <AccessTime />
          </IconButton>
          <IconButton color="inherit" aria-label="open drawer" edge="start">
            <FilterList />
          </IconButton>
        </div>
        <IconButton
          aria-label="show 17 new notifications"
          color="inherit"
          edge="end"
        >
          <Search />
        </IconButton>
        <IconButton
          aria-label="show 17 new notifications"
          color="inherit"
          edge="end"
        >
          <Help />
        </IconButton>
        <AvatarProfile />
      </Toolbar>
    </AppBar>
  );
});
// Type and required properties
NavBarHeaderMolecule.propTypes = {
  open: PropTypes.bool.isRequired,
  children: PropTypes.node,
};
// Default properties
NavBarHeaderMolecule.defaultProps = {
  open: true,
  children: null,
};

export default NavBarHeaderMolecule;
