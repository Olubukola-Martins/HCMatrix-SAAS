import { TAuthUser } from "./auth-user";

export type TGeneralAuthResponse = {
  data: TAuthUser & { accessToken: string };
  message: string;
};
