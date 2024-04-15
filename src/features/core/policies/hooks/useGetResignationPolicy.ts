import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { TResignationPolicy } from "../types/resignation";
import { useApiAuth } from "hooks/useApiAuth";

interface IGetDataProps extends ICurrentCompany {}
export const QUERY_KEY_FOR_RESIGNATION_POLICY = "resignation-policy";
const getData = async (props: IGetDataProps): Promise<TResignationPolicy> => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/company/policy/resignation`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: TResignationPolicy = res.data.data;

  const data: TResignationPolicy = item;

  return data;
};

export const useGetResignationPolicy = () => {
  const { token, companyId } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_RESIGNATION_POLICY],
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
