import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";
import { TAddress } from "types/address";

export type TUpdateBillingDetailsProps = {
  name: string;
  phone: string;
  address: TAddress;
};

const createData = async (props: {
  data: TUpdateBillingDetailsProps;
  auth: ICurrentCompany;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/subscription/company/billing/info`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data: TUpdateBillingDetailsProps = {
    ...props.data,
  };

  const response = await axios.post(url, data, config);
  return response;
};
export const useUpdateSubscriptionBillingDetails = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TUpdateBillingDetailsProps) =>
    createData({ data: props, auth: { token, companyId } })
  );
};
