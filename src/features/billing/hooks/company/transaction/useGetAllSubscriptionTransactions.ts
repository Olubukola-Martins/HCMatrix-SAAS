import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany, IPaginationProps } from "types";
import { DEFAULT_PAGE_SIZE } from "constants/general";
import { useApiAuth } from "hooks/useApiAuth";

interface IGetDataProps {
  pagination?: IPaginationProps;
}

export const QUERY_KEY_FOR_ALL_COMPANY_SUBCRIPTION_TRANSACTIONS =
  "all-company-subscription-transactions";

type TResponseData = {
  id: number;
  purchasedCount: number;
  licensedEmployeeCount: number;
  unlicensedEmployeeCount: number;
  totalAmount: string;
  billingCycle: string;
  createdAt: string;
  updatedAt: string;
};

const getData = async (props: {
  data: IGetDataProps;
  auth: ICurrentCompany;
}): Promise<{ data: TResponseData[]; total: number }> => {
  const { pagination } = props.data;
  const limit = pagination?.limit ?? DEFAULT_PAGE_SIZE;
  const offset = pagination?.offset ?? 0;

  let url = `${MICROSERVICE_ENDPOINTS.UTILITY}/subscription/company/transaction`;

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

  const data: TResponseData[] = result.map(
    (item: TResponseData): TResponseData => ({ ...item })
  );

  const ans = {
    data,
    total: fetchedData.totalCount,
  };

  return ans;
};

export const useGetAllSubscriptionTransactionss = ({
  props,
}: {
  props: IGetDataProps;
}) => {
  const { token, companyId } = useApiAuth();

  const { pagination } = props;
  const queryData = useQuery(
    [QUERY_KEY_FOR_ALL_COMPANY_SUBCRIPTION_TRANSACTIONS, pagination],
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
