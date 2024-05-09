import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

export type TAddHospitalProps = {
  name: string;
  address: Address;
  categoryId: number;
  isRecommended?: boolean;
  phoneNumber?: string;
  hmoPlanManagement: HmoPlanManagement[];
};

interface HmoPlanManagement {
  hmoPlanId: number;
}

interface Address {
  streetAddress: string;
  countryId: number;
  stateId: number;
  lgaId?: number;
}
const createData = async (props: {
  data: TAddHospitalProps;
  auth: ICurrentCompany;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/health-access/hospital`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data: TAddHospitalProps = {
    ...props.data,
  };

  const response = await axios.post(url, data, config);
  return response;
};
export const useAddHospital = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TAddHospitalProps) =>
    createData({ data: props, auth: { token, companyId } })
  );
};
