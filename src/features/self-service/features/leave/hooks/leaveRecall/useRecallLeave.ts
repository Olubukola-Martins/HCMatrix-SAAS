import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";
import { TLeaveRecall } from "../../types";

type TRecallLeaveProps = Pick<
  TLeaveRecall,
  "leaveId" | "length" | "newEndDate" | "specificDates"
>;

const createLeaveType = async (props: {
  data: TRecallLeaveProps;
  auth: ICurrentCompany;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/leave/recall`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data: TRecallLeaveProps = {
    ...props.data,
  };

  const response = await axios.post(url, data, config);
  return response;
};
export const useRecallLeave = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TRecallLeaveProps) =>
    createLeaveType({ data: props, auth: { token, companyId } })
  );
};
