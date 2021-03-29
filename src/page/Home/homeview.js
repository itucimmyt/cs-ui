import React from "react"; 
import { makeStyles } from "@material-ui/core/styles";
 

//Your styles here
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

export default function HomeView(props) {
  // Props
  const { property, Function, ...rest } = props;
  const classes = useStyles();

 
  return (
      <div id="sample_manager" />
    
  );
}
// Type and required properties
HomeView.propTypes = { 
};
// Default properties
HomeView.defaultProps = {
  
};
