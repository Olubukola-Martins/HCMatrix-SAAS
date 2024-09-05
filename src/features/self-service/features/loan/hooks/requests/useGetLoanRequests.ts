import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany, IPaginationProps, ISearchParams } from "types";
import { DEFAULT_PAGE_SIZE } from "constants/general";
import { useApiAuth } from "hooks/useApiAuth";
import { TLoanRequestStatus, TLoanRequest } from "../../types";
import { myLoanRequestProps } from "../../types/request";

interface IGetDataProps {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;
  status?: TLoanRequestStatus[];
  date?: string;
}

export const QUERY_KEY_FOR_LOAN_REQUESTS = "loan-requests";

const getData = async (props: {
  data: IGetDataProps;
  auth: ICurrentCompany;
}): Promise<{ data: myLoanRequestProps[]; total: number }> => {
  const { pagination } = props.data;
  const limit = pagination?.limit ?? DEFAULT_PAGE_SIZE;
  const offset = pagination?.offset ?? 0;
  const name = props.data.searchParams?.name ?? "";

  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/loan/request/mine`;

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
  const data: myLoanRequestProps[] = result;
  const ans = {
    data,
    total: fetchedData.totalCount,
  };
  return ans;
};

export const useGetLoanRequests = (values: { props: IGetDataProps }) => {
  const { props } = values;
  const { token, companyId } = useApiAuth();

  const { pagination, searchParams, date, status } = props;
  const queryData = useQuery(
    [QUERY_KEY_FOR_LOAN_REQUESTS, pagination, searchParams, date, status],
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
