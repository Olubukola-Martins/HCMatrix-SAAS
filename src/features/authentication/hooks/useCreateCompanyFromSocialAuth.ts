import axios from "axios";
import { ICreateCompSocialAuthProps } from "../types";
import { useMutation } from "react-query";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";

export const createCompanyFromSocialAuth = async (
  props: ICreateCompSocialAuthProps
) => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/company/auth`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
    },
  };

  // necessary to make immediate changes when in  a central place when schema changes
  const data: any = props;
  delete data["token"];

  const response = await axios.post(url, data, config);
  return response;
};

export const useCreateCompanyFromSocialAuth = () => {
  return useMutation(createCompanyFromSocialAuth);
};
