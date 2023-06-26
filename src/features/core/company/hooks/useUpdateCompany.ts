import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

interface TUpdateCompParams {
  name?: string;
  phoneNumber?: string;
  industryId?: number;
  color?: string;
  address: Address;
  logoUrl?: string;
  website?: string;
}
interface Address {
  streetAddress: string;
  countryId?: number;
  stateId?: number;
  lgaId?: number;
  timezone?: string;
}

const createData = async (props: {
  data: TUpdateCompParams;
  auth: ICurrentCompany;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/company/me`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data: TUpdateCompParams = {
    ...props.data,
  };

  const response = await axios.patch(url, data, config);
  return response;
};
export const useUpdateCompany = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TUpdateCompParams) =>
    createData({ data: props, auth: { token, companyId } })
  );
};
