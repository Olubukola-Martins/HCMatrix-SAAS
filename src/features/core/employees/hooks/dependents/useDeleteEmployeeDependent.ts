import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

type TData = {
  dependentId: number;
  employeeId: number;
};
const delData = async (props: { data: TData; auth: ICurrentCompany }) => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/employee/${props.data.employeeId}/dependent/${props.data.dependentId}`;
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
export const useDeleteEmployeeDependent = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TData) =>
    delData({ data: props, auth: { token, companyId } })
  );
};
