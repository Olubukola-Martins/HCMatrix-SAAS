import axios from "axios";
import { useQuery } from "react-query";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { ICurrentCompany } from "types";
import { AnalyticsRecordProps } from "../types";

interface IGetDataProps {
  branchId: number;
  departmentId: number;
}

export const QUERY_KEY_FOR_ANALYTICS_RECORDS = "analyticsRecords";

const getData = async (props: {
  data: IGetDataProps;
  auth: ICurrentCompany;
}): Promise<AnalyticsRecordProps> => {
  const branchId = props.data.branchId;
  const departmentId = props.data.departmentId;
  const url = `${MICROSERVICE_ENDPOINTS.TIME_AND_ATTENDANCE}/dashboard/analytics`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
    params: {
      branchId,
      departmentId,
    },
  };
  const res = await axios.get(url, config);

  const item: AnalyticsRecordProps = res.data.data;
  const data: AnalyticsRecordProps = {
    ...item,
  };

  return data;
};
export const useGetAnalyticsRecord = (values: { props: IGetDataProps }) => {
  const { props } = values;
  const { companyId, token } = useApiAuth();
  const { branchId, departmentId } = props;
  const queryData = useQuery(
    [QUERY_KEY_FOR_ANALYTICS_RECORDS, branchId, departmentId],
    () =>
      getData({
        auth: { token, companyId },
        data: {
          ...props,
        },
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
