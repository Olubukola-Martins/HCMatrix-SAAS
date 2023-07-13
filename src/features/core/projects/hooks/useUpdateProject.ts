import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";
import { TProjectStatus } from "../types";

type TData = {
  id: number;
  body: IBody;
};

interface IBody {
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  status: TProjectStatus;
}
const createData = async (props: { data: TData; auth: ICurrentCompany }) => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/company/project/${props.data.id}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data = {
    ...props.data.body,
  };

  const response = await axios.put(url, data, config);
  return response;
};
export const useUpdateProject = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TData) =>
    createData({ data: props, auth: { token, companyId } })
  );
};
