import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";
import { TAddress } from "types/address";

type TProps = {
  billingName: string;
  phoneNumber: string;
  address: TAddress;
};

const createData = async (props: { data: TProps; auth: ICurrentCompany }) => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/subscription/company/billing-detail`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data: TProps = {
    ...props.data,
  };

  const response = await axios.put(url, data, config);
  return response;
};
export const useUpdateSubscriptionBillingDetails = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TProps) =>
    createData({ data: props, auth: { token, companyId } })
  );
};
