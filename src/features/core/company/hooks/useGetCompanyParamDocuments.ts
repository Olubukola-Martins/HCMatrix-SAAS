import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";

import { useApiAuth } from "hooks/useApiAuth";

interface IGetDataProps extends ICurrentCompany {}
export const QUERY_KEY_FOR_COMPANY_PARAMETER_DOCUMENTS =
  "company-parameter-document";

type TData = {
  id: number;
  key: string;
  value: Value;
  companyId: number;
  createdAt: string;
  updatedAt: string;
};

interface Value {
  companyHandBook: string;
}
const getData = async (props: IGetDataProps): Promise<TData> => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/company/parameter/document`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: TData = res.data.data;

  const data: TData = {
    ...item,
  };

  return data;
};

export const useGetCompanyParamDocuments = () => {
  const { token, companyId } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_COMPANY_PARAMETER_DOCUMENTS],
    () =>
      getData({
        companyId,
        token,
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
