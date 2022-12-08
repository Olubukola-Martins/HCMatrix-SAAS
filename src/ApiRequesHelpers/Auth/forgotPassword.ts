import axios from "axios";

export interface IForgotPasswordProps {
  email: string;
}
export const forgetPassword = async (props: IForgotPasswordProps) => {
  const url = `${process.env.REACT_APP_AUTHENTICATION_BASE_URL}/authenticate/forgot-password`;

  const data = props;

  const response = await axios.post(url, data);
  return response;
};