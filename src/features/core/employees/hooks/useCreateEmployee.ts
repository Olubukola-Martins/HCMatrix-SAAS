import axios from "axios";
import { ICreateEmpProps } from "../types";
import { useMutation } from "react-query";
import { useApiAuth } from "hooks/useApiAuth";
import { ICurrentCompany } from "types";

export const createEmployee = async (vals: {
  props: ICreateEmpProps;
  auth: ICurrentCompany;
}) => {
  const { props, auth } = vals;
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/employee`;
  const config = {
    headers: {
      // Accept: "application/json",
      Authorization: `Bearer ${auth.token}`,
      "x-company-id": auth.companyId,
    },
  };

  // necessary to make immediate changes when in  a central place when schema changes
  const data = {
    ...props,
  };

  const response = await axios.post(url, data, config);
  return response;
};

export const useCreateEmployee = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: ICreateEmpProps) =>
    createEmployee({ props, auth: { token, companyId } })
  );
};
