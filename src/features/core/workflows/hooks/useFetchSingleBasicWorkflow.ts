import axios from "axios";
import { useApiAuth } from "hooks/useApiAuth";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { TBasicWorkflowStage, TBasicWorkflow } from "./useCreateBasicWorkflow";

// TO DO : need to exist in the general data entities and refactored
interface IGetDataProps {
  id: number;
}
export type TSingleBasicWorkflowStage = TBasicWorkflowStage & { id: number };
type TSingleBasicWorkflow = Omit<TBasicWorkflow, "stages"> & {
  stages: TSingleBasicWorkflowStage[];
};
const getSingleBasicWorkflow = async (
  props: IGetDataProps & ICurrentCompany
): Promise<TSingleBasicWorkflow> => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/workflow/${props.id}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item = res.data.data;

  const stages = item?.stages?.map(
    (item: any): TSingleBasicWorkflowStage => ({
      name: item.name,
      id: item.id,
      employeeId: item.employeeId,
      roleId: item.roleId,
      groupId: item.groupId,
    })
  );

  const data: TSingleBasicWorkflow = {
    id: item.id,
    name: item.name,
    stages,
  };
  return data;
};

export const useFetchSingleBasicWorkflow = (props: IGetDataProps) => {
  const { token, companyId } = useApiAuth();

  const queryData = useQuery(
    ["basic-workflow", props.id],
    () =>
      getSingleBasicWorkflow({
        ...props,
        token,
        companyId,
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
      refetchInterval: false,
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false,
      // ...preventUnnecessaryRefresh
    }
  );

  return queryData;
};
