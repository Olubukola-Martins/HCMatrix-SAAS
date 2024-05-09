import axios from "axios";
import { useMutation } from "react-query";
import { useApiAuth } from "hooks/useApiAuth";
import { ICurrentCompany } from "types";

type TData = { id: number };
export const deleteSingleGroup = async (vals: {
  props: TData;
  auth: ICurrentCompany;
}) => {
  const { props, auth } = vals;
  const id = props.id;

  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/company/group/${id}`;

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

export const useDeleteGroup = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TData) =>
    deleteSingleGroup({ props, auth: { token, companyId } })
  );
};
