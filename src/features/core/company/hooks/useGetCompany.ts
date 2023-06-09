import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { TCompany } from "../types";
import { useApiAuth } from "hooks/useApiAuth";

interface IGetDataProps extends ICurrentCompany {}
export const QUERY_KEY_FOR_SINGLE_COMPANY = "single-company";
const getData = async (props: IGetDataProps): Promise<TCompany> => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/company/me`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: TCompany = res.data.data;

  const data: TCompany = {
    ...item,
  };

  return data;
};

export const useGetCompany = () => {
  const { token, companyId } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_SINGLE_COMPANY],
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
