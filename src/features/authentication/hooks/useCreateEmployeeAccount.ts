import axios from "axios";
import { ICreateEmpProps, TGeneralAuthResponse } from "../types";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useMutation } from "react-query";

const createEmployeeAccount = async (
  props: ICreateEmpProps
): Promise<TGeneralAuthResponse> => {
  const url = `${MICROSERVICE_ENDPOINTS.AUTHENTICATION}/user/verification/employee`;
  const config = {
    headers: {
      Accept: "application/json",
    },
    params: {
      uid: props.uid,
      token: props.token,
    },
  };

  const data = {
    password: props.password,
    confirmPassword: props.confirmPassword,
  };

  const response = await axios.post(url, data);
  const result = response.data as unknown as TGeneralAuthResponse;
  return result;
};

export const useCreateEmployeeAccount = () => {
  return useMutation(createEmployeeAccount);
};
