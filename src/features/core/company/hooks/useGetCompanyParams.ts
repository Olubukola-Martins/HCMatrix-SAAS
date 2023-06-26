import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";

import { useApiAuth } from "hooks/useApiAuth";
import { TCompanyParams } from "../types/companyParams";

interface IGetDataProps extends ICurrentCompany {}
export const QUERY_KEY_FOR_COMPANY_PARAMETERS = "company-parameters";
const getData = async (props: IGetDataProps): Promise<TCompanyParams> => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/company/parameter/setting`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: TCompanyParams = res.data.data;

  const data: TCompanyParams = {
    ...item,
  };

  return data;
};

export const useGetCompanyParams = () => {
  const { token, companyId } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_COMPANY_PARAMETERS],
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
