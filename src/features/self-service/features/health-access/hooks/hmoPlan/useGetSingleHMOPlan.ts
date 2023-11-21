import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { THospital } from "../../types/hospital/hospital";

interface IDataProps {
  id: number;
}
export const QUERY_KEY_FOR_SINGLE_HMO_PLAN = "single-hmo-plan";
const getData = async (props: {
  data: IDataProps;
  auth: ICurrentCompany;
}): Promise<THospital> => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/health-access/hmo-plan/${props.data.id}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: THospital = res.data.data;

  const data: THospital = {
    ...item,
  };

  return data;
};

export const useGetSingleHMOPlan = (props: IDataProps) => {
  const { token, companyId } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_SINGLE_HMO_PLAN, props.id],
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
