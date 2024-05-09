import axios from "axios";
import { useMutation } from "react-query";

import { TCreateDepProps } from "../types";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { removeUndefinedProperties } from "utils/dataHelpers/removeUndefinedProperties";

const createDepartment = async (vals: {
  props: TCreateDepProps;
  auth: ICurrentCompany;
}) => {
  const { props, auth } = vals;
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/company/department`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${auth.token}`,
      "x-company-id": auth.companyId,
    },
  };

  // sanitize data
  const data = {
    ...removeUndefinedProperties(props),
  };

  const response = await axios.post(url, data, config);
  return response;
};

export const useCreateDepartment = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TCreateDepProps) =>
    createDepartment({ props, auth: { token, companyId } })
  );
};
