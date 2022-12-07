import axios from "axios";

export interface IVerifyUserProps {
  token: string;
  uid: string;
  email?: string;
}
export const verifyUserToken = async ({ token, uid }: IVerifyUserProps) => {
  const url = `${process.env.REACT_APP_AUTHENTICATION_BASE_URL}/user/verification?token=${token}&uid=${uid}`;

  const response = await axios.get(url);
  return response;
};

export interface IUserLoginProps {
  emailOrEmpUid: string;
  password: string;
}
export const loginUser = async (props: IUserLoginProps) => {
  const url = `${process.env.REACT_APP_AUTHENTICATION_BASE_URL}/authenticate`;

  // necessary to make immediate changes when in  a central place when schema changes
  const data = props;

  const response = await axios.post(url, data);
  return response;
};
