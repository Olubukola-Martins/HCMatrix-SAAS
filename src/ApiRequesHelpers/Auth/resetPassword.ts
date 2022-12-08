import axios from "axios";

export interface IResetUserPProps {
  password: string;
  confirmPassword: string;
  token: string;
  uid: string;
}

export const resetUserPassword = async (props: IResetUserPProps) => {
  const url = `${process.env.REACT_APP_AUTHENTICATION_BASE_URL}/authenticate/reset-password?token=${props.token}&uid=${props.uid}`;
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
