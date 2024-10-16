import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

type TData = {
  hospitalId: number;
  hmoPlanId: number;
};
export const removeHMOPlanFromHospital = async (props: {
  data: TData;
  auth: ICurrentCompany;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/health-access/hospital/${props.data.hospitalId}/management/${props.data.hmoPlanId}`;
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
export const useRemoveHMOPlanFromHospital = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TData) =>
    removeHMOPlanFromHospital({ data: props, auth: { token, companyId } })
  );
};
