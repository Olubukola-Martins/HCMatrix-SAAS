import axios from "axios";
import { useMutation } from "react-query";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { settingsBreakProps } from "../types";

export const createData = async (props: {
  data: settingsBreakProps;
  auth: ICurrentCompany;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.TIME_AND_ATTENDANCE}/settings/break-policies/multiple`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data = props.data;

  const response = await axios.post(url, data, config);

  return response;
};

export const useSetUpBreak = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: { data: settingsBreakProps }) =>
    createData({ data: props.data, auth: { companyId, token } })
  );
};
