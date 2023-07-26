import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TTaxAuthority } from "features/payroll/types";

interface IDataProps {
  id: number;
}
export const QUERY_KEY_FOR_SINGLE_TAX_AUTHORITY = "single-tax-authority";
const getData = async (props: {
  data: IDataProps;
  auth: ICurrentCompany;
}): Promise<TTaxAuthority> => {
  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/tax-authority/${props.data.id}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: TTaxAuthority = res.data.data;

  const data: TTaxAuthority = {
    ...item,
  };

  return data;
};

export const useGetSingleTaxAuthority = (props: IDataProps) => {
  const { token, companyId } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_SINGLE_TAX_AUTHORITY],
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
