import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

export type TAddProps = {
  hospitalId: number;
  body: {
    hmoPlanId: number;
  };
};

const createData = async (props: {
  data: TAddProps;
  auth: ICurrentCompany;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/health-access/hospital/${props.data.hospitalId}/management`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data = {
    ...props.data.body,
  };

  const response = await axios.post(url, data, config);
  return response;
};
export const useAddHMOPlanToHospital = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TAddProps) =>
    createData({ data: props, auth: { token, companyId } })
  );
};
