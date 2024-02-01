import axios from "axios";
import { useMutation } from "react-query";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { locationProps } from "../types";

export const createData = async (props: {
  data: locationProps;
  auth: ICurrentCompany;
  id?: number;
}) => {
  const updateUrl = `${props.id}`;
  const addUrl = "multiple";
  const acceptedUrl = props.id ? updateUrl : addUrl;
  const url = `${MICROSERVICE_ENDPOINTS.TIME_AND_ATTENDANCE}/settings/branch-locations/${acceptedUrl}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data = props.data;

  const requestType = props.id ? axios.put : axios.post;
  const response = await requestType(url, data, config);
  return response;
};

export const useCreateLocation = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: { data: locationProps; id?: number }) =>
    createData({ data: props.data, auth: { companyId, token }, id: props.id })
  );
};
