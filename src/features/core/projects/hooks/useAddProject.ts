import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";
import { TProjectStatus } from "../types";

type TData = {
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  status?: TProjectStatus;
  employees: Employee[];
};

interface Employee {
  employeeId: number;
}

const createData = async (props: { data: TData; auth: ICurrentCompany }) => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/company/project`;
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
export const useAddProject = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: { data: TData }) =>
    createData({ ...props, auth: { token, companyId } })
  );
};
