import axios from "axios";
import { ICreateEmpProps } from "../types";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";

export const createEmployeeAccount = async (props: ICreateEmpProps) => {
  const url = `${MICROSERVICE_ENDPOINTS.AUTHENTICATION}/user/verification/employee?token=${props.token}&uid=${props.uid}`;
  const config = {
    headers: {
      Accept: "application/json",
    },
  };

  const data: any = {
    password: props.password,
    confirmPassword: props.confirmPassword,
  };

  const response = await axios.post(url, data, config);
  return response;
};
