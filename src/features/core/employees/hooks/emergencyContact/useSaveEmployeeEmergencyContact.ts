import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";
import { TEmergencyContact } from "../../types";

type TData = TEmergencyContact;
const createData = async (props: {
  employeeId: number;
  data: TData;
  auth: ICurrentCompany;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/employee/${props.employeeId}/emergency-contact`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data: TData = {
    ...props.data,
  };

  const response = await axios.post(url, data, config);
  return response;
};
export const useSaveEmployeeEmergencyContact = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: { data: TData; employeeId: number }) =>
    createData({ ...props, auth: { token, companyId } })
  );
};
