import axios from "axios";
import { useMutation } from "react-query";
import { IPostSwitch } from "../types";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";

export const postCandidateSource = async (props: IPostSwitch) => {
  const url = `${MICROSERVICE_ENDPOINTS.RECRUITMENT}/settings/application-sources/`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const data: any = {
    name: props.name,
  };

  const response = await axios.post(url, data, config);
  return response;
};

export const useCreateCandidateSource = () => {
  return useMutation(postCandidateSource);
};
