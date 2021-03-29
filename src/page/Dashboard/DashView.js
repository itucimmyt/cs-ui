import EBSAnimate from "components/atoms/EBSAnimate";
import { makeStyles } from "@material-ui/core/styles";

import clsx from "clsx";
import React from "react";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
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
const useStyles = makeStyles((theme) => ({
  root: {
    background: `radial-gradient(#F1F4F5 0%,  #ffffff 80%)`,
    color: theme.palette.primary.contrastText,
  },
}));

function DashView(props) {
  const classes = useStyles();
  const storeUser = useSelector((store) => store.user);
  const [open, setOpen] = React.useState(false);
  const { instances } = storeUser.user.tenants[0]; //this could be automate by user

  function handleClick(instance) {
    props.history.push(`/instances/${instance.id}`);
  }

  // if its just have one instance
  if (instances.length === 1) {
    props.history.push(`/instances/${instances[0].id}`);
  }

  const t_instances = instances.map((instance, key) => (
    <Button
      key={key}
      variant="contained"
      color="primary"
      className="w-224 m-10 bg-ebs-green"
      aria-label="Login"
      disabled={false}
      onClick={(event) => handleClick(instance)}
    >
      {instance.name}
    </Button>
  ));

  return (
    <div
      
    >
      
      <div className="flex flex-col items-center justify-center w-full">
        <EBSAnimate animation="transition.expandIn">
          <Card className="w-full max-w-md">
            <CardContent className="flex flex-col items-center justify-center p-32 text-center">
              <Typography variant="h4" className="mb-8">
                Welcome to the EBS!
              </Typography>
              <img
                className="w-128 m-32"
                src="assets/images/logos/EBS.png"
                alt="logo"
              />
              <Typography variant="subtitle1" className="mb-16">
                <FormattedMessage
                  id="tnt.comp.comsoon.title"
                  defaultMessage="What instance would you like to access?"
                />
              </Typography>
              <div>{t_instances}</div>
            </CardContent>
          </Card>
        </EBSAnimate>
      </div>
    </div>
  );
}

export default DashView;
