import axios from "axios";
import { useMutation } from "react-query";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { ITimeTrackingRule } from "../types";

export const createTimeTrackingRule = async (props: {
  data: ITimeTrackingRule;
  auth: ICurrentCompany;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.TIME_AND_ATTENDANCE}/settings/time-tracking-policies/set-active`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data: any = {
    ...props.data,
  };

  const response = await axios.put(url, data, config);
  return response;
};

export const useCreateTimeTrackingRule = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: ITimeTrackingRule) =>
    createTimeTrackingRule({ data: props, auth: { companyId, token } })
  );
};
