import axios from "axios";
import { useMutation } from "react-query";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { IRepaymentPlanChangeStatus } from "../../types/repayment";

export const createData = async (props: {
  data: IRepaymentPlanChangeStatus;
  auth: ICurrentCompany;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/loan/payment/${props.data.loanId}/schedule/${props.data.scheduleId}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data: any = {
    paidAt: props.data.paidAt,
  };

  const response = await axios.patch(url, data, config);
  return response;
};

export const useChangeRepaymentPlanStatus = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: IRepaymentPlanChangeStatus) =>
    createData({ data: props, auth: { companyId, token } })
  );
};
