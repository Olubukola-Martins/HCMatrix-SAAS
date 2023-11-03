import axios from "axios";
import { ICreateCompSocialAuthProps, TGeneralAuthResponse } from "../types";
import { useMutation } from "react-query";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { TCompany } from "features/core/company/types";

type TResponse = {
  message: TGeneralAuthResponse["message"];
  data: TGeneralAuthResponse["data"]["payload"][0];
  // data: TCompany;
};
export const createCompanyFromSocialAuth = async (
  props: ICreateCompSocialAuthProps
): Promise<TResponse> => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/company/auth`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
    },
  };

  const data: any = props;
  delete data["token"];

  const response = await axios.post(url, data, config);
  const result = response.data as unknown as TResponse;
  return result;
};

export const useCreateCompanyFromSocialAuth = () => {
  return useMutation(createCompanyFromSocialAuth);
};
