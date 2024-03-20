import axios from "axios";
import { useMutation } from "react-query";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { goBreakProps } from "../types";

export const createData = async (props: {
  data: goBreakProps;
  auth: ICurrentCompany;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.TIME_AND_ATTENDANCE}/attendance/start-break/${props.data.breakPolicyId}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const response = await axios.post(url, {}, config);
  return response;
};

export const useGoBreak = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: goBreakProps) =>
    createData({ data: props, auth: { companyId, token } })
  );
};
