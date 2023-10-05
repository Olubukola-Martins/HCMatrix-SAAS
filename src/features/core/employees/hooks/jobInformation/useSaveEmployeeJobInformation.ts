import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";
import { TJobInfo } from "../../types";

type TData = TJobInfo;
const createData = async (props: {
  employeeId: number;
  data: TData;
  auth: ICurrentCompany;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/employee/${props.employeeId}/job-information`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data: TData = {
    ...props.data,
  };

  const response = await axios.post(url, data, config);
  return response;
};
export const useSaveEmployeeJobInformation = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: { data: TData; employeeId: number }) =>
    createData({ ...props, auth: { token, companyId } })
  );
};
