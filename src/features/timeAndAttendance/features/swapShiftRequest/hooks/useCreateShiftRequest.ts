import axios from "axios";
import { useMutation } from "react-query";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { PostMySwapShiftRequestProps } from "../types";

export const createData = async (props: {
  data: PostMySwapShiftRequestProps;
  auth: ICurrentCompany;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.TIME_AND_ATTENDANCE}/shift-swap`;
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

export const useCreateShiftRequest = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: PostMySwapShiftRequestProps) =>
    createData({ data: props, auth: { companyId, token } })
  );
};
