import axios from "axios";
import { useMutation } from "react-query";
import { IPostSwitch } from "../types";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";

export const postBenefits = async (props: IPostSwitch) => {
  const url = `${MICROSERVICE_ENDPOINTS.RECRUITMENT}/settings/employment-benefits`;

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

export const useCreateBenefits = () => {
  return useMutation(postBenefits);
};
