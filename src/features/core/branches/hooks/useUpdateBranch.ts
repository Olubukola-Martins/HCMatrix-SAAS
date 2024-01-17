import axios from "axios";
import { useMutation } from "react-query";
import { TCreateBranchProps } from "../types";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { removeUndefinedProperties } from "utils/dataHelpers/removeUndefinedProperties";
import { TAddress } from "features/core/employees/types";

interface IUpdateBranchProps {
  id: number;
  data: TCreateBranchProps;
}
export const updateBranch = async (vals: {
  props: IUpdateBranchProps;
  auth: ICurrentCompany;
}) => {
  const { props, auth } = vals;
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/company/branch/${props.id}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${auth.token}`,
      "x-company-id": auth.companyId,
    },
  };

  // necessary to make immediate changes when in  a central place when schema changes
  const data: TCreateBranchProps = {
    ...props.data,
    address: {
      ...props.data.address,
      lgaId: props.data.address.lgaId ?? undefined,
    },
  };

  const response = await axios.put(url, data, config);
  return response;
};

export const useUpdateBranch = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: IUpdateBranchProps) =>
    updateBranch({ props, auth: { token, companyId } })
  );
};
