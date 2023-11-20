// simply pass the props here as opposed to making a call
import React from "react";
import { TSingleEmployeeHealthAccess } from "../../../types/employee";

type TProps = { data?: TSingleEmployeeHealthAccess };
const SingleEmployeeHealthAccess: React.FC<TProps> = ({ data }) => {
  return <div>SingleEmployeeHealthAccess</div>;
};

export default SingleEmployeeHealthAccess;
