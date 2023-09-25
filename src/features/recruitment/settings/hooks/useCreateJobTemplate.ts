import axios from "axios";
import { useMutation } from "react-query";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { ICurrentCompany } from "types";

interface ICreateJobTemplate extends ICurrentCompany {
  title: string;
  description: string;
  departmentId: number;
}
export const postJobTemplateData = async (props: ICreateJobTemplate) => {
  const url = `${MICROSERVICE_ENDPOINTS.RECRUITMENT}/settings/job-templates`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const data: any = {
    title: props.title,
    description: props.description,
    departmentId: props.departmentId,
  };

  const response = await axios.post(url, data, config);
  return response;
};

export const useCreateJobTemplate = () => {
  return useMutation(postJobTemplateData);
};
