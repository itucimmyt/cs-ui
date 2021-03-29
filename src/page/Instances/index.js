import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import EBSAnimate from 'components/atoms/EBSAnimate';
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SMIcon from "components/atoms/ServiceManagementIcon"
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    background: `radial-gradient(#F1F4F5 0%,  #ffffff 80%)`,
  },
  title: {
    fontSize: 16,
  },
  pos: {
    marginBottom: 12,
  },
}));

export default function InstanceView() {
  const classes = useStyles();
  const routeParams = useParams();
  const storeUser = useSelector((store) => store.user);

  const { instanceID } = routeParams;

  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  let tenant_instance = [];
  let domains = [];

  const { tenants } = storeUser.user;
  /*
	tenants.forEach((tenant, key) => {
		const { instances } = tenant;
		const instance = instances.filter((instance, key) => instance['id'] === instanceID);
		if (instance.length > 0) {
			tenant_instance = [...instance];
		}
	});
*/
  console.log(tenants);
  console.log(instanceID);
  const instance = tenants[0].instances.filter(
    (instance, key) => instance["id"] === instanceID
  );
  if (instance.length > 0) {
    tenant_instance = [...instance];
  }

  console.log(instance);

  const { name, domaininstances } = tenant_instance[0];

  if (domaininstances.length > 0) {
    domains = [...domaininstances];
  } else {
    domains = [];
  }

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const options = ["CHANGE INSTANCE", "CIMMYT-CB-MAIZE", "CIMMYT-CB-WHEAT"];

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
  };

  const handleClickDomain = (item) => {
    window.location.href = item.context;
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  return (
    <div
      className={clsx(
        classes.root,
        "flex flex-col flex-auto flex-shrink-0 items-center p-32"
      )}
    >
      <Typography variant="h5" className="mb-8">
        {name}
      </Typography>
      <ButtonGroup
        variant="contained"
        color="primary"
        ref={anchorRef}
        aria-label="split button"
      >
        <Button onClick={handleClick}>{options[selectedIndex]}</Button>
        <Button
          color="primary"
          size="small"
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu">
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      disabled={index === 2}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
      <div className="flex flex-col flex-auto flex-shrink-0 items-center justify-center p-32">
        <Typography variant="h5" className="mb-8">
          EBS Domains
        </Typography>

        {domains.map((t_domain) => (
          <div>
            <Card
              className="text-center cursor-pointer"
              onClick={(event) => handleClickDomain(t_domain)}
            >
             
               <SMIcon />
            
              <CardContent>
                <Typography variant="h5" component="h2">
                  {t_domain.domain.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {t_domain.domain.info}
                </Typography>
              </CardContent>
            </Card>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={handleChange}
                  name="checkedA"
                />
              }
              label="Set as default"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
