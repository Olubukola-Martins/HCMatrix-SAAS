import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TTaskComment } from "../../types";

export const QUERY_KEY_FOR_SINGLE_TASK_COMMENTS = "single-task-comments";
interface IGetDataProps {
  taskId: number;
}
const getData = async (props: {
  data: IGetDataProps;
  auth: ICurrentCompany;
}): Promise<{ data: TTaskComment[]; total: number }> => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/task/${props.data.taskId}/comment`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const res = await axios.get(url, config);
  const result = res.data.data;

  const data: TTaskComment[] = result.map(
    (item: TTaskComment): TTaskComment => ({ ...item })
  );

  const ans = {
    data,
    total: data.length,
  };

  return ans;
};

export const useGetAllTaskComments = (props: IGetDataProps) => {
  const { token, companyId } = useApiAuth();

  const queryData = useQuery(
    [QUERY_KEY_FOR_SINGLE_TASK_COMMENTS, props.taskId],
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
