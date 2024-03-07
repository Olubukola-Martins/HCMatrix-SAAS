import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TWorkflowApprovalType } from "../../types";
import { TApprovalStage } from "../../types/approval-stage";

interface IGetDataProps {
  id: number;
  type: TWorkflowApprovalType;
}

export const QUERY_KEY_FOR_APPROVAL_STAGES = "approval-stages";

const getData = async (props: {
  data: IGetDataProps;
  auth: ICurrentCompany;
}): Promise<{ data: TApprovalStage[]; total: number }> => {
  let url = `${MICROSERVICE_ENDPOINTS.UTILITY}/workflow/approval/stage/${props.data.type}/${props.data.id}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const res = await axios.get(url, config);
  const result = res.data.data;

  const data: TApprovalStage[] = result.map(
    (item: TApprovalStage): TApprovalStage => ({ ...item })
  );

  const ans = {
    data,
    total: data.length,
  };

  return ans;
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
