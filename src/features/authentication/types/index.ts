import { FormInstance } from "antd";
import { TAuthUser } from "./auth-user";
import { TGeneralAuthResponse } from "./general-auth-response";
import { TAddress } from "types/address";

export { type TAuthUser, type TGeneralAuthResponse };
export interface IRefreshTokenProps {
  refreshToken: string;
  token: string;
}

export interface IAuthDets {
  user: TAuthUser["user"];
  userToken: string;

  companies: TAuthUser["payload"];
}

export interface ICreateCompProps {
  name: string;
  email: string;
  phoneNumber: string;
  industryId: number;
  customerFullName: string;
  password: string;
  confirmPassword: string;
}

export interface IVerifyUserProps {
  token: string;
  uid: string;
  email?: string;
}

export interface ICreateEmpProps {
  password: string;
  confirmPassword: string;
  token: string;
  uid: string;
}

export interface IForgotPasswordProps {
  email: string;
}

export interface ICreateCompSocialAuthProps {
  name: string;
  phoneNumber: string;
  industryId: number;
  token: string;
}

export interface IResetUserPProps {
  password: string;
  confirmPassword: string;
  token: string;
  uid: string;
}
export interface IUserLoginProps {
  emailOrEmpUid: string;
  password: string;
}

export interface ILoginProps {
  autoLoginDetails?: {
    email: string;
    password: string;
  };
}

export interface stepperInputProps {
  onFinished: any;
  initialValues: any;
  setCurrent?: any;
  email?: string;
  isLoading?: boolean;
  form?: FormInstance<any>;
}

export interface ICreateInvitedEmpProps {
  token: string;
  uid: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  personalInformation: {
    dob: string;
    gender: string;
    phoneNumber: string;
    eligibility: string;
    maritalStatus: string;
    nationality: string;
    address: TAddress;
    passportExpirationDate?: string;
    validDocumentUrl?: string;
  };
}
