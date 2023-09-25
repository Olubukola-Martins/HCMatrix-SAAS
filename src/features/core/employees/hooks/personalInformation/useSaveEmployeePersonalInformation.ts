import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

type TData = {
  dob: string;
  gender: string;
  phoneNumber: string;
  eligibility: string;
  exchangeRateId: number;
  maritalStatus: string;
  nationality: string;
  address: Address;
  passportExpirationDate: string;
  validDocumentUrl?: string;
  alternativeEmail?: string;
  alternativePhoneNumber?: string;
  nin?: string;
  taxId?: string;
  taxAuthority?: string;
};

interface Address {
  streetAddress: string;
  countryId: number;
  stateId: number;
  lgaId: number;
  timezone: string;
}
const createData = async (props: {
  employeeId: number;
  data: TData;
  auth: ICurrentCompany;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/employee/${props.employeeId}/personal-information`;
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
export const useSaveEmployeePersonalInformation = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: { data: TData; employeeId: number }) =>
    createData({ ...props, auth: { token, companyId } })
  );
};
