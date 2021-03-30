import React from "react";
import PropTypes from "prop-types";
// CORE COMPONENTS AND ATOMS TO USE
import clsx from "clsx";
import { makeStyles, useTheme, fade } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom"; 
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import {
  ChevronLeft,
  ChevronRight,
  LensRounded
} from "@material-ui/icons";
import EbsLogo from "components/atoms/EBSLogoVertical";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  logo: {
    marginLeft: 0,
    width: 150,
    height: 92,
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
}));

const NavigationMolecule = React.forwardRef((props, ref) => {
  // Properties of the molecule
  const { open, children, ...rest } = props;
  const classes = useStyles();
  let history = useHistory();
  
    //events
    const handleClick = (path) => {
      history.push(path)
    };

  return (
    <Drawer
      className={classes.drawer}
      anchor="left"
      variant="permanent"
      open={open}
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <EbsLogo className={classes.logo} />

      <List>
        {[
          {
            key: "rm",
            title: "Request Manager",
            icon: "icon",
            tag: "ddd",
            path: "/sm/requestmanager",
          },
          {
            key: "gsm",
            title: "Genotyping Service Manager",
            icon: "icon",
            tag: "ddd",
            path: "",
          },
          {
            key: "sc",
            title: "Service Catalog",
            icon: "icon",
            tag: "ddd",
            path: "",
          },
          {
            key: "plims",
            title: "PLIMS",
            icon: "icon",
            tag: "ddd",
            path: "",
          },
          {
            key: "sp",
            title: "Shipment Tool",
            icon: "icon",
            tag: "ddd",
            path: "",
          },
        ].map((item, index) => (
          <ListItem button key={item.key} onClick={()=> handleClick(item.path)}>
            <ListItemIcon>
              <LensRounded/>
            </ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItem>
        ))}
      </List>
      <div className={classes.drawerHeader}>
        <IconButton
          onClick={open ? props.handleDrawerClose : props.handleDrawerOpen}
        >
          {open ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </div>
    </Drawer>
  );
});
// Type and required properties
NavigationMolecule.propTypes = {
  open: PropTypes.bool.isRequired,
  children: PropTypes.node,
};
// Default properties
NavigationMolecule.defaultProps = {
  open: true,
  children: null,
};

export default NavigationMolecule;
