import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

interface TCreateSisterCompParams {
  name: string;
  email: string;
  phoneNumber: string;
  industryId: number;
}

const createData = async (props: {
  data: TCreateSisterCompParams;
  auth: ICurrentCompany;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/company/sister`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data: TCreateSisterCompParams = {
    ...props.data,
  };

  const response = await axios.post(url, data, config);
  return response;
};
export const useCreateSisterCompany = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TCreateSisterCompParams) =>
    createData({ data: props, auth: { token, companyId } })
  );
};
