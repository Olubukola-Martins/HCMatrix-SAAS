import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

type TCreateProps = {
  status: "approved" | "rejected";
  comment?: string;
};

const updateApproval = async (props: {
  data: TCreateProps;
  auth: ICurrentCompany;
  approvalId: number;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/leave/reliever-approval/${props.approvalId}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data: TCreateProps = {
    ...props.data,
  };

  const response = await axios.patch(url, data, config);
  return response;
};
export const useApproveOrRejectLeaveRelieverRequest = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: { data: TCreateProps; approvalId: number }) =>
    updateApproval({
      data: props.data,
      approvalId: props.approvalId,
      auth: { token, companyId },
    })
  );
};
