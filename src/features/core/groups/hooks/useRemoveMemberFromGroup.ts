import axios from "axios";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

type TData = {
  groupId: number;
  managementId: number;
};
export const removeMemberFromGroup = async (vals: {
  props: TData;
  auth: ICurrentCompany;
}) => {
  const { props, auth } = vals;
  let url = `${process.env.REACT_APP_UTILITY_BASE_URL}/company/group/${props.groupId}/management/${props.managementId}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${auth.token}`,
      "x-company-id": auth.companyId,
    },
  };

  const response = await axios.delete(url, config);
  return response;
};

export const useRemoveMemberFromGroup = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TData) =>
    removeMemberFromGroup({ props, auth: { token, companyId } })
  );
};
