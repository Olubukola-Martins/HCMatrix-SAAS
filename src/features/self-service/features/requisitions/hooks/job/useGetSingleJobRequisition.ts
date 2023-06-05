import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { TJobRequisition } from "../../types/job";

interface IGetDataProps extends ICurrentCompany {
  id: number;
}
export const QUERY_KEY_FOR_SINGLE_JOB_REQUISITION = "single-job-requisition";
const getData = async (props: IGetDataProps): Promise<TJobRequisition> => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/requisition/job/${props.id}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: TJobRequisition = res.data.data;

  const data: TJobRequisition = {
    ...item,
  };

  return data;
};

export const useGetSingleJobRequisition = (props: IGetDataProps) => {
  const queryData = useQuery(
    [QUERY_KEY_FOR_SINGLE_JOB_REQUISITION, props.id],
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
