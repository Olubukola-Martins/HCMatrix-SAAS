import axios from "axios";
import { useMutation } from "react-query";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import {
  IUpdateSwapPartnerApprovals,
} from "../types";

export const createData = async (props: {
  data: IUpdateSwapPartnerApprovals;
  auth: ICurrentCompany;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.TIME_AND_ATTENDANCE}/shift-swap/partner-approval/${props.data.id}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data: any = {
    status: props.data.status,
    comment: props.data.comment,
  };

  const response = await axios.patch(url, data, config);

  return response;
};

export const useUpdateSwapPartnerRequest = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: IUpdateSwapPartnerApprovals) =>
    createData({ data: props, auth: { companyId, token } })
  );
};
