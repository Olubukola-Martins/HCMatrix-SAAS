import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TLoan } from "../types";

export const QUERY_KEY_FOR_LOAN = "loan";

type TData = {
  id: number;
};
const getData = async (props: {
  data: TData;
  auth: ICurrentCompany;
}): Promise<TLoan> => {
  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/loan/${props.data.id}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: TLoan = res.data.data;

  const data: TLoan = {
    ...item,
  };

  return data;
};

export const useGetLoan = (props: TData) => {
  const { token, companyId } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_LOAN, props.id],
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
