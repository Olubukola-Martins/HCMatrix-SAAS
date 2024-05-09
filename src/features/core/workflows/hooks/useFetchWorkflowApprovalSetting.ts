import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { TWorkflowApprovalSetting, TWorkflowApprovalType } from "../types";

// TO DO : need to exist in the general data entities and refactored
interface IGetDataProps extends ICurrentCompany {
  type: TWorkflowApprovalType;
}
export const QUERY_KEY_FOR_WORKFLOW_APPROVAL_SETTING =
  "workflow-approval-setting";
const getWorkflowApprovalSetting = async (
  props: IGetDataProps
): Promise<TWorkflowApprovalSetting> => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/workflow/approval/setting/${props.type}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: TWorkflowApprovalSetting = res.data.data;

  const data: TWorkflowApprovalSetting = {
    ...item,
  };

  return data;
};

export const useFetchWorkflowApprovalSetting = (props: IGetDataProps) => {
  const queryData = useQuery(
    [QUERY_KEY_FOR_WORKFLOW_APPROVAL_SETTING, props.type],
    () =>
      getWorkflowApprovalSetting({
        ...props,
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
