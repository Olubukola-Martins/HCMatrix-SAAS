import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany, IPaginationProps } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TPayrollWalletTransaction } from "features/payroll/types/wallet";
import { DEFAULT_PAGE_SIZE } from "constants/general";

export const QUERY_KEY_FOR_PAYROLL_WALLET_TRANSACTIONS =
  "payroll-wallet-transactions";
type TParams = {
  pagination?: IPaginationProps;
} & Partial<Pick<TPayrollWalletTransaction, "provider" | "status" | "type">> & {
    fromDate?: string;
    toDate?: string;
  };
const getData = async (props: {
  auth: ICurrentCompany;
  params: TParams;
}): Promise<{ data: TPayrollWalletTransaction[]; total: number }> => {
  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/wallet/dashboard`;
  const { pagination } = props.params;
  const limit = pagination?.limit ?? DEFAULT_PAGE_SIZE;
  const offset = pagination?.offset ?? 0;
  delete props.params.pagination; //delete pagination, so the spread can occur appropriately on one level
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
    params: {
      limit,
      offset,
      ...props.params,
    },
  };

  const res = await axios.get(url, config);
  const fetchedData = res.data.data;
  const result = fetchedData.result;

  const data: TPayrollWalletTransaction[] = result.map(
    (item: TPayrollWalletTransaction): TPayrollWalletTransaction => ({
      ...item,
    })
  );

  const ans = {
    data,
    total: fetchedData.totalCount,
  };

  return ans;
};

export const useGetPayrollWalletTransactions = (params: TParams) => {
  const { token, companyId } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_PAYROLL_WALLET_TRANSACTIONS, params],
    () =>
      getData({
        auth: {
          companyId,
          token,
        },
        params,
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
