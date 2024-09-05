import axios from "axios";
import { useMutation } from "react-query";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { IEligibilityCriteriaProps } from "../../../types/setting";

export const createData = async (props: {
  data: IEligibilityCriteriaProps;
  auth: ICurrentCompany;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/loan/setting/eligibility-criteria`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data: any = {
    maxPercentage: props.data.maxPercentage,
    maxApplicationDuringRepayment: props.data.maxApplicationDuringRepayment,
    employmentDuration: props.data.employmentDuration,
    employmentStatus: props.data.employmentStatus,
  };

  const response = await axios.post(url, data, config);
  return response;
};

export const useEligibilityCriteria = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: IEligibilityCriteriaProps) =>
    createData({ data: props, auth: { companyId, token } })
  );
};
