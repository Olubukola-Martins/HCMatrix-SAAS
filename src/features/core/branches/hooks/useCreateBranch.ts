import axios from "axios";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";
import { TCreateBranchProps } from "../types";

export const createBranch = async (vals: {
  props: TCreateBranchProps;
  auth: ICurrentCompany;
}) => {
  const { props, auth } = vals;
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/company/branch`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${auth.token}`,
      "x-company-id": auth.companyId,
    },
  };

  const data: TCreateBranchProps = {
    ...props,
  };

  const response = await axios.post(url, data, config);
  return response;
};

export const useCreateBranch = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TCreateBranchProps) =>
    createBranch({ props, auth: { token, companyId } })
  );
};
