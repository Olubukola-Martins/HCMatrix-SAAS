import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany, IPaginationProps, ISearchParams } from "types";
import { DEFAULT_PAGE_SIZE } from "constants/general";
import { useApiAuth } from "hooks/useApiAuth";
import { TLoanRequestStatus, TLoanRequest } from "../../types";

interface IGetDataProps {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;
  status?: TLoanRequestStatus[];
  date?: string;
}

type TLoanAPIRequestType = "mine" | undefined;
export const QUERY_KEY_FOR_LOAN_REQUESTS = "loan-requests";

const getData = async (props: {
  type: TLoanAPIRequestType;
  data: IGetDataProps;
  auth: ICurrentCompany;
}): Promise<{ data: TLoanRequest[]; total: number }> => {
  const { pagination } = props.data;
  const limit = pagination?.limit ?? DEFAULT_PAGE_SIZE;
  const offset = pagination?.offset ?? 0;
  const name = props.data.searchParams?.name ?? "";

  let url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/loan/request/`;
  if (props.type === "mine") {
    url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/loan/request/${props.type}`;
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
      status: props.data.status?.join(","),
      date: props.data.date,
    },
  };

  const res = await axios.get(url, config);
  const fetchedData = res.data.data;
  const result = fetchedData.result;

  const data: TLoanRequest[] = result.map(
    (item: TLoanRequest): TLoanRequest => ({ ...item })
  );

  const ans = {
    data,
    total: fetchedData.totalCount,
  };

  return ans;
};

export const useGetLoanRequests = (values: {
  props: IGetDataProps;
  type: TLoanAPIRequestType;
}) => {
  const { props, type } = values;
  const { token, companyId } = useApiAuth();

  const { pagination, searchParams, date, status } = props;
  const queryData = useQuery(
    [QUERY_KEY_FOR_LOAN_REQUESTS, type, pagination, searchParams, date, status],
    () =>
      getData({
        type,
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
