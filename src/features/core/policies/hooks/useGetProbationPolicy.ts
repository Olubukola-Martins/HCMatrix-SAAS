import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TProbationPolicy } from "../types/probation";

interface IGetDataProps extends ICurrentCompany {}
export const QUERY_KEY_FOR_PROBATION_POLICY = "probation-policy";
const getData = async (props: IGetDataProps): Promise<TProbationPolicy> => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/company/policy/probation`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: TProbationPolicy = res.data.data;

  const data: TProbationPolicy = {
    ...item,
  };

  return data;
};

export const useGetProbationPolicy = () => {
  const { token, companyId } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_PROBATION_POLICY],
    () =>
      getData({
        token,
        companyId,
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
