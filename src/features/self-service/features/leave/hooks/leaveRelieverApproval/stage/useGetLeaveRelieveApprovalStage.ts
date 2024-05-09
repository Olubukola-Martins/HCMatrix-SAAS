import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TApprovalStatus } from "types/statuses";
import { TLeave } from "../../../types";

interface IDataProps {
  leaveId: number;
}
export const QUERY_KEY_FOR_LEAVE_RELIEVE_APPROVAL_STAGE =
  "leave-relieve-approval-stage";
export const getLeaveRelieveApprovalStage = async (props: {
  data: IDataProps;
  auth: ICurrentCompany;
}): Promise<TLeaveRelieveApprovalStageApiResponse> => {
  try {
    const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/leave/${props.data.leaveId}/reliever-approval/stage`;

    const config = {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${props.auth.token}`,
        "x-company-id": props.auth.companyId,
      },
    };

    const res = await axios.get(url, config);
    const item: TLeaveRelieveApprovalStageApiResponse = res.data.data;

    const data: TLeaveRelieveApprovalStageApiResponse = item
      ? {
          ...item,
        }
      : null;

    return data;
  } catch (error: any) {
    if (error?.response?.status === 404) {
      return null;
    }
    throw error;
  }
};

export const useGetLeaveRelieveApprovalStage = (props: IDataProps) => {
  const { token, companyId } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_LEAVE_RELIEVE_APPROVAL_STAGE, props.leaveId],
    () =>
      getLeaveRelieveApprovalStage({
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

export type TLeaveRelieveApprovalStageApiResponse =
  | null
  | undefined
  | TLeaveRelieveApprovalStage;
export type TLeaveRelieveApprovalStage = {
  id: number;
  leaveId: number;
  status: TApprovalStatus;
  comment?: null | string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  leave: TLeave;
};
