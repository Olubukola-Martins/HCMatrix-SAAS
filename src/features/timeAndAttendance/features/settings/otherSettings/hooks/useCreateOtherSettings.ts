import axios from "axios";
import { useMutation } from "react-query";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { IOtherSettings } from "../types";

export const createData = async (props: {
  data: IOtherSettings;
  auth: ICurrentCompany;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.TIME_AND_ATTENDANCE}/settings/general/others`;
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

  const response = await axios.post(url, data, config);
  return response;
};

export const useCreateOtherSettings = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: IOtherSettings) =>
    createData({ data: props, auth: { companyId, token } })
  );
};
