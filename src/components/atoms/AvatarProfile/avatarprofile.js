import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Popover,
  Typography,
  Icon,
  ListItemText,
  Avatar,
  Chip,
  MenuItem,
  Link,
  ListItemIcon,
  Divider,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { useSignOut } from "react-auth-kit";
import { FormattedMessage } from "react-intl";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
}));
//MAIN FUNCTION
/*
 @param props: component properties
 @param ref: reference made by React.forward
*/
const AvatarProfileAtom = React.forwardRef((props, ref) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();
  const classes = useStyles();
  const signOut = useSignOut()
  const user = useSelector(({ user }) => user.user);

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    /* 
     @prop data-testid: Id to use inside avatarprofile.test.js file.
     */
    <React.Fragment>
      {user ? (
        <Chip
          avatar={
            <Avatar className="" alt="user photo" src={user.person.photoURL} />
          }
          label={
            <React.Fragment>
              <Typography className={classes.title} variant="subtitle1" noWrap>
                {user.person.familyName}, {user.person.additionalName}
              </Typography>
              <Divider />
              <Typography className={classes.title} variant="subtitle2" noWrap>
                {user.person.jobTitle}
              </Typography>
            </React.Fragment>
          }
          onClick={handleClick("bottom-end")}
          variant="default"
          color="primary"
          clickable
        />
      ) : (
        <Chip size="small" />
      )}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <MenuItem
          component={Link}
          to="/profile"
          onClick={handleClose}
          role="button"
        >
          <ListItemIcon>
            <Icon>account_circle</Icon>
          </ListItemIcon>
          <ListItemText
            primary={
              <FormattedMessage
                id="tnt.nav.profile.lbl.profile"
                defaultMessage="Profile"
              />
            }
          />
        </MenuItem>
        <MenuItem
          component={Link}
          to="/account/general"
          onClick={handleClose}
          role="button"
        >
          <ListItemIcon>
            <Icon>settings_applications</Icon>
          </ListItemIcon>
          <ListItemText
            primary={
              <FormattedMessage
                id="tnt.nav.profile.lbl.account"
                defaultMessage="Account"
              />
            }
          />
        </MenuItem>
        <MenuItem
          onClick={() => {
            signOut();
            handleClose();
          }}
        >
          <ListItemIcon>
            <Icon>exit_to_app</Icon>
          </ListItemIcon>
          <ListItemText
            primary={
              <FormattedMessage
                id="tnt.nav.profile.lbl.logout"
                defaultMessage="Logout"
              />
            }
          />
        </MenuItem>
      </Popover>
    </React.Fragment>
  );
});
// Type and required properties
AvatarProfileAtom.propTypes = {};
// Default properties
AvatarProfileAtom.defaultProps = {};

export default AvatarProfileAtom;
