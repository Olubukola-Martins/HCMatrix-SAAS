import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";
import { TLoanType } from "../../types";

const createData = async (props: {
  data: TLoanType;
  auth: ICurrentCompany;
}) => {
  const updateUrl = `/loan/type/${props.data.id}`;
  const addUrl = "/loan/type";
  const acceptedUrl = props.data.id ? updateUrl : addUrl;

  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}${acceptedUrl}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data: TLoanType = {
    ...props.data,
  };

     const requestType = props.data.id ? axios.put : axios.post;
   const response = await requestType(url, data, config);
  return response;
};
export const useAddAndUpdateLoanType = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props:  TLoanType) =>
    createData({ data: props, auth: { token, companyId } })
  );
};
