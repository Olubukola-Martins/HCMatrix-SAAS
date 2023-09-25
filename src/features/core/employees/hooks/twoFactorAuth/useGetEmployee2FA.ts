import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";

type TEmployee2FA = {
  id: number;
  employeeId: number;
  isVerified: boolean;
  isDisabled: boolean;
  lastUsedAt: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: any;
};

interface IDataProps {
  id: number;
}
export const QUERY_KEY_FOR_EMPLOYEE_2FA = "employee-2fa";
const getData = async (props: {
  data: IDataProps;
  auth: ICurrentCompany;
}): Promise<TEmployee2FA> => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/employee/totp`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: TEmployee2FA = res.data.data;

  const data: TEmployee2FA = {
    ...item,
  };

  return data;
};

export const useGetEmployee2FA = (props: IDataProps) => {
  const { token, companyId } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_EMPLOYEE_2FA],
    () =>
      getData({
        auth: {
          companyId,
          token,
        },
        data: { ...props },
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
