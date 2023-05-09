import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

type TCreateProps = {
  name: string;
  length: number;
  calculation: string;
  employeesGetAllowance: boolean;
  percentageAmount: number;
  gender: string;
};

const updateLeaveType = async (props: {
  data: TCreateProps;
  auth: ICurrentCompany;
  id: number;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/leave/type/${props.id}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data: TCreateProps = {
    ...props.data,
  };

  const response = await axios.put(url, data, config);
  return response;
};
export const useUpdateLeaveType = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: { data: TCreateProps; id: number }) =>
    updateLeaveType({
      data: props.data,
      id: props.id,
      auth: { token, companyId },
    })
  );
};
