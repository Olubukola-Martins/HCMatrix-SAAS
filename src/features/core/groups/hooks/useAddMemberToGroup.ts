import axios from "axios";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

type IAddMemberToGroupProps = {
  id: number;
  body: {
    employeeId: number;
    isLead: boolean;
  };
};
export const addMemberToGroup = async (vals: {
  props: IAddMemberToGroupProps;
  auth: ICurrentCompany;
}) => {
  const { props, auth } = vals;
  let url = `${process.env.REACT_APP_UTILITY_BASE_URL}/company/group/${props.id}/management`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${auth.token}`,
      "x-company-id": auth.companyId,
    },
  };

  // necessary to make immediate changes when in  a central place when schema changes
  const data = props.body;

  const response = await axios.post(url, data, config);
  return response;
};

export const useAddMemberToGroup = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: IAddMemberToGroupProps) =>
    addMemberToGroup({ props, auth: { token, companyId } })
  );
};
