import axios from "axios";
import { useMutation } from "react-query";
import { IUpdateDegProps } from "../types";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";

export const updateDesignation = async (vals: {
  props: IUpdateDegProps;
  auth: ICurrentCompany;
}) => {
  const { props, auth } = vals;
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/company/designation/${props.id}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${auth.token}`,
      "x-company-id": auth.companyId,
    },
  };

  const data = props.data;

  const response = await axios.put(url, data, config);
  return response;
};
export const useUpdateDesignation = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: IUpdateDegProps) =>
    updateDesignation({ props, auth: { token, companyId } })
  );
};
