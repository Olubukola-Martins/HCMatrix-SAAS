import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

type TProps = {
  data: Datum[];
};

interface Datum {
  employeeId: number;
  licenseType: "licensed" | "unlicensed";
}

const createData = async (props: { data: TProps; auth: ICurrentCompany }) => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/subscription/company/employee/license`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data: TProps = {
    ...props.data,
  };

  const response = await axios.post(url, data, config);
  return response;
};
export const useAddLicensesToEmployees = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TProps) =>
    createData({ data: props, auth: { token, companyId } })
  );
};
