import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";
import { removeUndefinedProperties } from "utils/dataHelpers/removeUndefinedProperties";

type TBody = {
  name: string;
  description: string;
  assignedToId: number;
  status: string;
  priority: string;
  dateAssigned: string;
  dueDate: string;
};

type TData = {
  id: number;
  body: Partial<TBody>;
};
const createData = async (props: { data: TData; auth: ICurrentCompany }) => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/task/${props.data.id}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data: TData["body"] = {
    ...removeUndefinedProperties(props.data.body),
  };

  const response = await axios.patch(url, data, config);
  return response;
};
export const useUpdateTask = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TData) =>
    createData({ data: props, auth: { token, companyId } })
  );
};
