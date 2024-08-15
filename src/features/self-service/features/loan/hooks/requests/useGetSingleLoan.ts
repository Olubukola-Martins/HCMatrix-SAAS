import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { ILoanDetails } from "../../types/loan";

export const QUERY_KEY_FOR_SINGLE_LOAN = "single-loan";

type TData = {
  id: number;
};
const getData = async (props: {
  data: TData;
  auth: ICurrentCompany;
}): Promise<ILoanDetails> => {
  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/loan/${props.data.id}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: ILoanDetails = res.data.data;

  const data: ILoanDetails = {
    ...item,
  };

  return data;
};

export const useGetSingleLoan = (props: TData) => {
  const { token, companyId } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_SINGLE_LOAN, props.id],
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
