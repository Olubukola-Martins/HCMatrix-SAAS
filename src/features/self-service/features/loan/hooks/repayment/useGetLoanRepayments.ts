import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany, IPaginationProps, ISearchParams } from "types";
import { DEFAULT_PAGE_SIZE } from "constants/general";
import { useApiAuth } from "hooks/useApiAuth";
import { TLoanRepayment } from "../../types";

interface IGetDataProps {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;
}

type TLoanAPIRepaymentType = "mine" | undefined;
export const QUERY_KEY_FOR_LOAN_REPAYMENTS = "loan-repayments";

const getData = async (props: {
  type: TLoanAPIRepaymentType;
  data: IGetDataProps;
  auth: ICurrentCompany;
}): Promise<{ data: TLoanRepayment[]; total: number }> => {
  const { pagination } = props.data;
  const limit = pagination?.limit ?? DEFAULT_PAGE_SIZE;
  const offset = pagination?.offset ?? 0;
  const name = props.data.searchParams?.name ?? "";

  let url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/loan/repayment/`;
  if (props.type === "mine") {
    url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/loan/repayment/${props.type}`;
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
    },
  };

  const res = await axios.get(url, config);
  const fetchedData = res.data.data;
  const result = fetchedData.result;

  const data: TLoanRepayment[] = result.map(
    (item: TLoanRepayment): TLoanRepayment => ({ ...item })
  );

  const ans = {
    data,
    total: fetchedData.totalCount,
  };

  return ans;
};

export const useGetLoanRepayments = (values: {
  props: IGetDataProps;
  type: TLoanAPIRepaymentType;
}) => {
  const { props, type } = values;
  const { token, companyId } = useApiAuth();

  const { pagination, searchParams } = props;
  const queryData = useQuery(
    [QUERY_KEY_FOR_LOAN_REPAYMENTS, type, pagination, searchParams],
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
