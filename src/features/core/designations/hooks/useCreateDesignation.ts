import axios from "axios";
import { ICreateDegProps } from "../types";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";

export const createDesignation = async (vals: {
  props: ICreateDegProps;
  auth: ICurrentCompany;
}) => {
  const { props, auth } = vals;
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/company/designation`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${auth.token}`,
      "x-company-id": auth.companyId,
    },
  };

  const data = props;

  const response = await axios.post(url, data, config);
  return response;
};

export const useCreateDesignation = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: ICreateDegProps) =>
    createDesignation({ props, auth: { token, companyId } })
  );
};
