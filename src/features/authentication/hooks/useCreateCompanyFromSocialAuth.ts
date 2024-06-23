import axios from "axios";
import { ICreateCompSocialAuthProps, TGeneralAuthResponse } from "../types";
import { useMutation } from "react-query";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { TCompany } from "features/core/company/types";
import { getAuthenticatedUser } from "./useGetAuthUser";

type TResponse = {
  message: TGeneralAuthResponse["message"];
  data: {
    payload: TGeneralAuthResponse["data"]["payload"];
  };
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

  const data = {
    name: props.name,
    phoneNumber: props?.phoneNumber,
    industryId: props.industryId,
  };

  const response = await axios.post(url, data, config);
  const originalResult = response.data as unknown as {
    message: string;
    data: TCompany;
  };
  // Below is done to ensure that the reponse from this fn matches that from TGeneralAuthResponse when a company is created
  const authUser = await getAuthenticatedUser({ auth: { token: props.token } });

  return {
    message: originalResult.message,
    data: {
      payload: authUser.payload,
    },
  };
};

export const useCreateCompanyFromSocialAuth = () => {
  return useMutation(createCompanyFromSocialAuth);
};
