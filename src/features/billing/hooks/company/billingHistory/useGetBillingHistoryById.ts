import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { AciveCompanySubscription } from "features/billing/types/company/active-company-subscription";

interface IDataProps {
  id: number;
}
export const QUERY_KEY_FOR_BILLING_HISTORY_BY_ID =
  "company-billing-history-by-id";
const getData = async (props: {
  data: IDataProps;
  auth: ICurrentCompany;
}): Promise<TSingleBillingHistory> => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/subscription/company/billing/history/${props.data.id}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: TSingleBillingHistory = res.data.data;

  const data: TSingleBillingHistory = {
    ...item,
  };

  return data;
};

export const useGetBillingHistoryById = (props: IDataProps) => {
  const { token, companyId } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_BILLING_HISTORY_BY_ID, props.id],
    () =>
      getData({
        auth: {
          companyId,
          token,
        },
        data: { ...props },
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};

export type TSingleBillingHistory = {
  id: number;
  companyId: number;
  companySubscriptionId: number;
  billingDate: string;
  totalDiscountAmount: string;
  totalVatAmount: string;
  totalAmount: string;
  amountPaid: string;
  currency: string;
  status: string;
  name: string;
  phone: string;
  addressId: number;
  paymentReference: string;
  createdAt: string;
  updatedAt: string;
  companySubscription: CompanySubscription;
  address: Address;
};

interface Address {
  id: number;
  companyId: number;
  streetAddress: string;
  countryId: number;
  stateId: number;
  lgaId: number;
  timezone: string;
  longitude: string;
  latitude: string;
  createdAt: string;
  updatedAt: string;
  country: Country;
  state: State;
  lga: Lga;
}

interface Lga {
  id: number;
  name: string;
  stateId: number;
  createdAt: string;
  updatedAt: string;
}

interface State {
  id: number;
  name: string;
  countryId: number;
  createdAt: string;
  updatedAt: string;
}

interface Country {
  id: number;
  name: string;
  sortName: string;
  code: string;
  createdAt: string;
  updatedAt: string;
}

type CompanySubscription = AciveCompanySubscription;
