import React from "react";
import PropTypes from "prop-types";
// CORE COMPONENTS
import { SvgIcon } from "@material-ui/core";

//MAIN FUNCTION
/*
 @param props: component properties
 @param ref: reference made by React.forward
*/
const ServiceManagementIconAtom = React.forwardRef((props, ref) => {
  return (
    /* 
     @prop data-testid: Id to use inside servicemanagementicon.test.js file.
     */
    <SvgIcon
      data-testid={"ServiceManagementIconTestId"}
      fontSize="large"
      {...props}
    >
      <svg
        className="h-6 mr-2 fill-current"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fillRule="evenodd"
        clipRule="evenodd"
        strokeLinejoin="round"
        strokeMiterlimit="2"
      >
        <path fill="none" d="M0 0h24v24H0z" />
        <path
          d="M19.205 4a.8.8 0 01-.005 1.6h-.8v12.8c-.076.855-.62 1.449-1.598 1.6H7.198c-.963-.086-1.597-.769-1.597-1.6V5.6h-.8a.8.8 0 010-1.6h2.4v14.4h9.601L16.801 4h2.404zm-7.433 12.8c-.733-.56-2.971-2.514-2.971-5.506C8.8 7.714 12 4 12 4s3.2 3.715 3.2 7.294c0 2.992-2.239 4.947-2.971 5.505.09-.953.17-2.268.17-3.884 0-3.58-.4-7.295-.4-7.295s-.4 3.716-.4 7.295c0 1.616.082 2.93.172 3.884z"
          fill="current"
        />
      </svg>
    </SvgIcon>
  );
});
// Type and required properties
ServiceManagementIconAtom.propTypes = {};
// Default properties
ServiceManagementIconAtom.defaultProps = {};

export default ServiceManagementIconAtom;
