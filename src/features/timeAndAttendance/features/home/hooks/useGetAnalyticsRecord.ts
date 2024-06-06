import axios from "axios";
import { useQuery } from "react-query";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { ICurrentCompany } from "types";
import { AnalyticsRecordProps } from "../types";

export const QUERY_KEY_FOR_ANALYTICS_RECORDS = "analyticsRecords";

const getData = async (
  props: ICurrentCompany
): Promise<AnalyticsRecordProps> => {
  const url = `${MICROSERVICE_ENDPOINTS.TIME_AND_ATTENDANCE}/dashboard/analytics`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };
  const res = await axios.get(url, config);

  const item: AnalyticsRecordProps = res.data.data;
  const data: AnalyticsRecordProps = {
    ...item,
  };

  return data;
};
export const useGetAnalyticsRecord = () => {
  const { companyId, token } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_ANALYTICS_RECORDS],
    () => getData({ token, companyId }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
