// get the user's permissions via auth kit context
// pull in app permissions
// the app will recive a permission | permissions[] to test against
// if the test passes return the component
// else return null

import React from "react";

interface IProps {
  permissions: string | string[]; //or should be an enum
  component: React.ReactNode;
}

export const UserHasPermissionComp = ({ component }: IProps) => {
  const isUserPermitted = () => {
    // perform chrck
    return true;
  };
  if (!isUserPermitted()) {
    return null;
  }

  return <>{component}</>;
};
