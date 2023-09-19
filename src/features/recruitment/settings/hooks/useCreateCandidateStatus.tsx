import axios from "axios";
import { useMutation } from "react-query";
import { ICreateCandidateStatus } from "../types";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";

export const postCandidateStatus = async (props: ICreateCandidateStatus) => {
  const url = `${MICROSERVICE_ENDPOINTS.RECRUITMENT}/application-statuses/`;

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

export const useCreateCandidateStatus = () => {
  return useMutation(postCandidateStatus);
};
