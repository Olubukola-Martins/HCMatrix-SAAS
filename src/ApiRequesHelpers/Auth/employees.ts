import axios from "axios";

export interface ICreateEmpProps {
  password: string;
  confirmPassword: string;
  token: string;
  uid: string;
}

export const createEmployeeAccount = async (props: ICreateEmpProps) => {
  const url = `${process.env.REACT_APP_AUTHENTICATION_BASE_URL}/user/verification/employee?token=${props.token}&uid=${props.uid}`;
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
