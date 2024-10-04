import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany, IPaginationProps } from "types";
import { DEFAULT_PAGE_SIZE } from "constants/general";
import { useApiAuth } from "hooks/useApiAuth";
import { TSubscriptionStatus } from "features/billing/types/company/active-company-subscription/common";
import { TBillingCycle } from "features/billing/types/billingCycle";

interface IGetDataProps {
  pagination?: IPaginationProps;
}

export const QUERY_KEY_FOR_BILLING_HISTORY = "company-billing-history";

export type TBillingHistory = {
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
};

interface CompanySubscription {
  id: number;
  type: string;
  billingCycle: TBillingCycle;
  status: TSubscriptionStatus;
}
const getData = async (props: {
  data: IGetDataProps;
  auth: ICurrentCompany;
}): Promise<{ data: TBillingHistory[]; total: number }> => {
  const { pagination } = props.data;
  const limit = pagination?.limit ?? DEFAULT_PAGE_SIZE;
  const offset = pagination?.offset ?? 0;

  let url = `${MICROSERVICE_ENDPOINTS.UTILITY}/subscription/company/billing/history`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
    params: {
      limit,
      offset,
    },
  };

  const res = await axios.get(url, config);
  const fetchedData = res.data.data;
  const result = fetchedData.result;

  const data: TBillingHistory[] = result.map(
    (item: TBillingHistory): TBillingHistory => ({ ...item })
  );

  const ans = {
    data,
    total: fetchedData.totalCount,
  };

  return ans;
};

export const useGetBillingHistory = ({ props }: { props: IGetDataProps }) => {
  const { token, companyId } = useApiAuth();

  const { pagination } = props;
  const queryData = useQuery(
    [QUERY_KEY_FOR_BILLING_HISTORY, pagination],
    () =>
      getData({
        auth: { token, companyId },
        data: {
          ...props,
        },
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
