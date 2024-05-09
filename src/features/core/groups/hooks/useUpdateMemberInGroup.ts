import axios from "axios";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";
type TData = {
  groupId: number;
  managementId: number;
  body: {
    employeeId: number;
    isLead: boolean;
  };
};
export const updateMemberInGroup = async (vals: {
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

  const data = props.body;

  const response = await axios.put(url, data, config);
  return response;
};

export const useUpdateMemberInGroup = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TData) =>
    updateMemberInGroup({ props, auth: { token, companyId } })
  );
};
