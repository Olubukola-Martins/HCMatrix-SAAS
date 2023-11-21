import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

type TData = {
  employeeId: number;
  dependentId: number;
};
const createData = async (props: { data: TData; auth: ICurrentCompany }) => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/health-access/employee/${props.data.employeeId}/dependent/${props.data.dependentId}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const response = await axios.delete(url, config);
  return response;
};
export const useRemoveDependantInEmployeeHealthAccess = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TData) =>
    createData({ data: props, auth: { token, companyId } })
  );
};
