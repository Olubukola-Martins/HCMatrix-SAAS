import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";
import { TSaveCompanyParams } from "../types";

const createData = async (props: {
  data: TSaveCompanyParams;
  auth: ICurrentCompany;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/company/parameter/setting`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data: TSaveCompanyParams = {
    ...props.data,
  };

  const response = await axios.post(url, data, config);
  return response;
};
export const useSaveCompanyParamSetting = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TSaveCompanyParams) =>
    createData({ data: props, auth: { token, companyId } })
  );
};
