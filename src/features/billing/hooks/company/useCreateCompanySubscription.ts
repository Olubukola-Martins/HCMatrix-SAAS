import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

export type TCreateCompanySubscriptionProps = {
  autoRenew: boolean;
  billingCycle: string;
  priceType: string;
  licensedEmployeeCount: number;
  unlicensedEmployeeCount: number;
  purchased: Purchased[];
  addOns: AddOns;
  billingDetail: BillingDetail;
};

interface BillingDetail {
  billingName: string;
  phoneNumber: string;
  address: Address;
}

interface Address {
  streetAddress: string;
  countryId: number;
  stateId: number;
  lgaId: number;
  timezone: string;
  longitude: string;
  latitude: string;
}

interface AddOns {
  extraStorageId: number;
  supportCaseId: number;
  trainingSessionId?: any;
}

interface Purchased {
  subscriptionId: number;
}

const createData = async (props: {
  data: TCreateCompanySubscriptionProps;
  auth: ICurrentCompany;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/subscription/company`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data: TCreateCompanySubscriptionProps = {
    ...props.data,
  };

  const response = await axios.post(url, data, config);
  return response;
};
export const useCreateCompanySubscription = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TCreateCompanySubscriptionProps) =>
    createData({ data: props, auth: { token, companyId } })
  );
};
