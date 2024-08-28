import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TApprovalStatus } from "types/statuses";
import { TShiftSwapRequest } from "../types";


interface IDataProps {
  shiftSwapId: number;
}
export const QUERY_KEY_FOR_SHIFT_SWAP_PARTNER_APPROVAL_STAGE =
  "shift-swap-partner-approval-stage";
export const getShiftSwapPartnerApprovalStage = async (props: {
  data: IDataProps;
  auth: ICurrentCompany;
}): Promise<TShiftSwapPartnerStageApiResponse> => {
  try {
    const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/shift-swap/${props.data.shiftSwapId}/partner-approval/stage`;

    const config = {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${props.auth.token}`,
        "x-company-id": props.auth.companyId,
      },
    };

    const res = await axios.get(url, config);
    const item: TShiftSwapPartnerStageApiResponse = res.data.data;

    const data: TShiftSwapPartnerStageApiResponse = item
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

export const useGetShiftSwapPartnerApprovalStage = (props: IDataProps) => {
  const { token, companyId } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_SHIFT_SWAP_PARTNER_APPROVAL_STAGE, props.shiftSwapId],
    () =>
      getShiftSwapPartnerApprovalStage({
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

export type TShiftSwapPartnerStageApiResponse =
  | null
  | undefined
  | TShiftSwapApprovalStage;

export type TShiftSwapApprovalStage = {
  id: number;
  swapId: number;
  status: TApprovalStatus;
  comment?: null | string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  shift_swap: TShiftSwapRequest;
};
