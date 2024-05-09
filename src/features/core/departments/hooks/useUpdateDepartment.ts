import axios from "axios";
import { useMutation } from "react-query";
import { IUpdateDeptProps } from "../types";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { removeUndefinedProperties } from "utils/dataHelpers/removeUndefinedProperties";

const updateDepartment = async (vals: {
  props: IUpdateDeptProps;
  auth: ICurrentCompany;
}) => {
  const { props, auth } = vals;
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/company/department/${props.id}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${auth.token}`,
      "x-company-id": auth.companyId,
    },
  };

  const data = removeUndefinedProperties(props.data);

  const response = await axios.put(url, data, config);
  return response;
};

export const useUpdateDepartment = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: IUpdateDeptProps) =>
    updateDepartment({ props, auth: { token, companyId } })
  );
};
