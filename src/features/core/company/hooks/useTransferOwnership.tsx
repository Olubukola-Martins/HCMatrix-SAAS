import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

type TTransferOwnerData = {
  employeeId: number;
};
const createData = async (props: {
  data: TTransferOwnerData;
  auth: ICurrentCompany;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/company/transfer-ownership`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data: TTransferOwnerData = {
    ...props.data,
  };

  const response = await axios.post(url, data, config);
  return response;
};
export const useTransferOwnership = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TTransferOwnerData) =>
    createData({ data: props, auth: { token, companyId } })
  );
};
