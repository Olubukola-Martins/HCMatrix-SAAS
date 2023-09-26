import axios from "axios";
import { useMutation } from "react-query";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { ICurrentCompany } from "types";

interface ICreateRecruitmentEmail extends ICurrentCompany {
  subject: string;
  name: string;
  body: string;
}
export const postOfferTemplateData = async (props: ICreateRecruitmentEmail) => {
  const url = `${MICROSERVICE_ENDPOINTS.RECRUITMENT}/settings/offer-templates`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const data: any = {
    name: props.name,
    subject: props.subject,
    body: props.body,
  };

  const response = await axios.post(url, data, config);
  return response;
};

export const useCreateOfferTemplate = () => {
  return useMutation(postOfferTemplateData);
};
