import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { TLeaveAnalytics } from "../types";
import { useApiAuth } from "hooks/useApiAuth";

interface IGetDataProps  {}
export const QUERY_KEY_FOR_LEAVE_ANALYTICS = "leave-analytics";
const getData = async (auth:ICurrentCompany,props: IGetDataProps): Promise<TLeaveAnalytics> => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/leave/analytic`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${auth.token}`,
      "x-company-id": auth.companyId,
    },
    params: {},
  };

  const res = await axios.get(url, config);
  const item: TLeaveAnalytics = res.data.data;

  const data: TLeaveAnalytics = {
    ...item,
  };

  return data;
};

export const useGetLeaveAnalytics = (props: IGetDataProps ={}) => {
  const {token, companyId} = useApiAuth()
  const queryData = useQuery(
    [QUERY_KEY_FOR_LEAVE_ANALYTICS],
    () =>
      getData({token, companyId},{
        ...props,
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
