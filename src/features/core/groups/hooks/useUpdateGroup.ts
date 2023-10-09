import axios from "axios";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";

interface TData {
  id: number;
  body: {
    name: string;
    description: string;
    email: string;
  };
}
export const updateData = async (vals: {
  props: TData;
  auth: ICurrentCompany;
}) => {
  const { props, auth } = vals;
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/company/group/${props.id}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${auth.token}`,
      "x-company-id": auth.companyId,
    },
  };

  // necessary to make immediate changes when in  a central place when schema changes
  const data = props.body;

  const response = await axios.put(url, data, config);
  return response;
};

export const useUpdateGroup = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TData) =>
    updateData({ props, auth: { token, companyId } })
  );
};
