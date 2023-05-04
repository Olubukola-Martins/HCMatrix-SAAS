import axios from "axios";
import { ICreateCompProps } from "../types";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";

export const createCompany = async (props: ICreateCompProps) => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/company`;

  // necessary to make immediate changes when in  a central place when schema changes
  const data = props;

  const response = await axios.post(url, data);
  return response;
};
