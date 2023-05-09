import axios from "axios";
import { useApiAuth } from "hooks/useApiAuth";

import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

type TDelProps = {
  id: number;
};

const deleteLeaveType = async (props: {
  data: TDelProps;
  auth: ICurrentCompany;
}) => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/self-service/leave/type/${props.data.id}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const response = await axios.delete(url, config);
  return response;
};
export const useDeleteLeaveType = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TDelProps) =>
    deleteLeaveType({ data: props, auth: { token, companyId } })
  );
};

export default useDeleteLeaveType;
