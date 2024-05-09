import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TWorkflowApprovalType } from "../../types";
import { TApprovalStage } from "../../types/approval-stage";
import { getLeaveRelieveApprovalStage } from "features/self-service/features/leave/hooks/leaveRelieverApproval/stage/useGetLeaveRelieveApprovalStage";

interface IGetDataProps {
  id: number;
  type: TWorkflowApprovalType;
}

export const QUERY_KEY_FOR_APPROVAL_STAGES = "approval-stages";
const getApprovalStages = async (props: {
  data: IGetDataProps;
  auth: ICurrentCompany;
}): Promise<{ data: TApprovalStage[]; total: number }> => {
  let data: TApprovalStage[] = [];

  try {
    let url = `${MICROSERVICE_ENDPOINTS.UTILITY}/workflow/approval/stage/${props.data.type}/${props.data.id}`;

    const config = {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${props.auth.token}`,
        "x-company-id": props.auth.companyId,
      },
    };

    const res = await axios.get(url, config);
    const result = res?.data?.data;
    const resultData =
      result?.map((item: TApprovalStage): TApprovalStage => ({ ...item })) ??
      [];

    data = [...data, ...resultData];

    const ans = {
      data,
      total: data.length,
    };

    return ans;
  } catch (error:any) {
    if (error?.response?.status === 404) {
      const ans = {
        data,
        total: data.length,
      };

      return ans;
    }
    throw error;
  }
};

const getData = async (props: {
  data: IGetDataProps;
  auth: ICurrentCompany;
}): Promise<{ data: TApprovalStage[]; total: number }> => {
  let data: TApprovalStage[] = [];
  try {
    // the code below accounts for leave reliever stage
    if (props.data.type === "leave") {
      const leaveRelieveApprovalStage = await getLeaveRelieveApprovalStage({
        auth: props.auth,
        data: {
          leaveId: props.data.id,
        },
      });
      if (leaveRelieveApprovalStage) {
        const leaveRelieveApprovalStageFormatted: TApprovalStage = {
          id: leaveRelieveApprovalStage.id,
          entityId: leaveRelieveApprovalStage.leave.id,
          enableTwoFactorAuth: false,
          status: leaveRelieveApprovalStage.status,
          name: "Leave Reliever",
          type: "leave-relieve",
          leaveReliever: leaveRelieveApprovalStage.leave.reliever,
          approvals: [],
          createdAt: leaveRelieveApprovalStage.createdAt,
          updatedAt: leaveRelieveApprovalStage.updatedAt,
        };

        data = [...data, leaveRelieveApprovalStageFormatted];
      }
    }
    const approvalStages = await getApprovalStages({
      auth: props.auth,
      data: {
        id: props.data.id,
        type: props.data.type,
      },
    });
    data = [...data, ...approvalStages.data];

    const ans = {
      data,
      total: data.length,
    };

    return ans;
  } catch (error: any) {
    if (error?.response?.status === 404) {
      const ans = {
        data,
        total: data.length,
      };

      return ans;
    }
    throw error;
  }
};

export const useGetApprovalStages = ({
  props: { id, type },
}: {
  props: IGetDataProps;
}) => {
  const { token, companyId } = useApiAuth();

  const queryData = useQuery(
    [QUERY_KEY_FOR_APPROVAL_STAGES, id, type],
    () =>
      getData({
        auth: { token, companyId },
        data: {
          id,
          type,
        },
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
