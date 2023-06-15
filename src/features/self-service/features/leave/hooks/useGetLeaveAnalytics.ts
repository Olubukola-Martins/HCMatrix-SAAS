import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { TLeaveAnalytics } from "../types";

interface IGetDataProps extends ICurrentCompany {}
export const QUERY_KEY_FOR_LEAVE_ANALYTICS = "leave-analytics";
const getData = async (props: IGetDataProps): Promise<TLeaveAnalytics> => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/leave/analytic`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
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

export const useGetLeaveAnalytics = (props: IGetDataProps) => {
  const queryData = useQuery(
    [QUERY_KEY_FOR_LEAVE_ANALYTICS],
    () =>
      getData({
        ...props,
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
