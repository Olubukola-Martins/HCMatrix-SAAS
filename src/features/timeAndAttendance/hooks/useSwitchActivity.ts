import axios from "axios";
import { useMutation } from "react-query";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { switchActivityProps } from "../types";

export const createData = async (props: {
  data: switchActivityProps;
  auth: ICurrentCompany;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.TIME_AND_ATTENDANCE}/activities/switch`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data: any = {
    ...props.data
  };

  const response = await axios.post(url, data, config);
  return response;
};

export const useSwitchActivity = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: switchActivityProps) =>
    createData({ data: props, auth: { companyId, token } })
  );
};
