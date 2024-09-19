import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany, IPaginationProps, ISearchParams } from "types";
import { DEFAULT_PAGE_SIZE } from "constants/general";
import { useApiAuth } from "hooks/useApiAuth";
import {
  TTransaction,
  TTransactionStatus,
  TTransactionType,
} from "features/payroll/types";

interface IGetDataProps {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;
  type?: TTransactionType[];
  status?: TTransactionStatus[];
  employeeId?: number;
}

export type TTransactionApiEntity =
  | { costCentreId?: number; entity: "cost-centre" }
  | "transaction";

export const QUERY_KEY_FOR_TRANSACTIONS_BY_API_ENTITY =
  "transactions-by-entity";

const getData = async (props: {
  data: IGetDataProps;
  auth: ICurrentCompany;
  transactionApiEntity: TTransactionApiEntity;
}): Promise<{ data: TTransaction[]; total: number }> => {
  const { pagination, type, status, employeeId } = props.data;
  const limit = pagination?.limit ?? DEFAULT_PAGE_SIZE;
  const offset = pagination?.offset ?? 0;
  const name = props.data.searchParams?.name ?? "";

  let url = `${MICROSERVICE_ENDPOINTS.PAYROLL}`;
  if (
    typeof props.transactionApiEntity === "string" &&
    props.transactionApiEntity === "transaction"
  ) {
    url += `/${props.transactionApiEntity}`;
  }
  if (
    typeof props.transactionApiEntity === "object" &&
    props.transactionApiEntity.entity === "cost-centre"
  ) {
    url += `/${props.transactionApiEntity.entity}/${props.transactionApiEntity.costCentreId}/transaction`;
  }

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
    params: {
      limit,
      offset,
      search: name,
      type: type?.join(","),
      status: status?.join(","),
      employeeId,
    },
  };

  const res = await axios.get(url, config);
  const fetchedData = res.data.data;
  const result = fetchedData.result;

  const data: TTransaction[] = result.map(
    (item: TTransaction): TTransaction => ({ ...item })
  );

  const ans = {
    data,
    total: fetchedData.totalCount,
  };

  return ans;
};

export const useGetTransactionsByApiEntity = (data: {
  props: IGetDataProps;
  transactionApiEntity: TTransactionApiEntity;
}) => {
  const { props, transactionApiEntity } = data;
  const { token, companyId } = useApiAuth();

  const { pagination, searchParams, type, status, employeeId } = props;
  const queryData = useQuery(
    [
      QUERY_KEY_FOR_TRANSACTIONS_BY_API_ENTITY,
      transactionApiEntity,
      searchParams,
      type,
      status,
      employeeId,
      pagination?.limit,
      pagination?.offset,
    ],
    () =>
      getData({
        transactionApiEntity,
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
