import axios from "axios";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";

export type TGroupDataInput = {
  name: string;
  description: string;
  email: string;
  employees: Employee[];
};

interface Employee {
  employeeId: number;
  isLead?: boolean;
}

export const saveGroup = async (vals: {
  props: TGroupDataInput;
  auth: ICurrentCompany;
}) => {
  const { props, auth } = vals;
  let url = `${process.env.REACT_APP_UTILITY_BASE_URL}/company/group`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${auth.token}`,
      "x-company-id": auth.companyId,
    },
  };

  const data = {
    ...props,
  };

  const response = await axios.post(url, data, config);
  return response;
};

export const useAddGroup = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TGroupDataInput) =>
    saveGroup({ props, auth: { token, companyId } })
  );
};
