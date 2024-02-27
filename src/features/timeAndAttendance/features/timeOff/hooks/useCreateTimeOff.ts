import axios from "axios";
import { useMutation } from "react-query";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { ITimeOffProps } from "../types";

export const createData = async (props: {
  data: ITimeOffProps;
  auth: ICurrentCompany;
}) => {
  const updateUrl = `time-off-requests/${props.data.id}`;
  const addUrl = "time-off-requests";
  const acceptedUrl = props.data.id ? updateUrl : addUrl;
  const url = `${MICROSERVICE_ENDPOINTS.TIME_AND_ATTENDANCE}/${acceptedUrl}`;
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

  const requestType = props.data.id ? axios.put : axios.post;
  const response = await requestType(url, data, config);

  return response;
};

export const useCreateTimeOff = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: ITimeOffProps) =>
    createData({ data: props, auth: { companyId, token } })
  );
};
