import axios from "axios";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

interface ICreateProps {
  delegatorId: number;
  delegateeId: number;
  startDate: string;
  endDate: string;
  permissions: {
    permissionId: number;
  }[];
  description: string;
}
const saveDelegation = async (vals: {
  props: ICreateProps;
  auth: ICurrentCompany;
}) => {
  const { auth, props } = vals;
  const url = `${process.env.REACT_APP_AUTHENTICATION_BASE_URL}/permission/delegation`;
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
export const useSaveDelegation = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: ICreateProps) =>
    saveDelegation({ props, auth: { token, companyId } })
  );
};

export default useSaveDelegation;
