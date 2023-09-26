import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TPayrolSettingData } from "./useHandlelPayrollSetting";

export type TPayrollSetting = TPayrolSettingData & {
  id: number;
  companyId: number;
  createdAt: string;
  updatedAt: string;
};

export const QUERY_KEY_FOR_PAYROLL_SETTING = "payroll-setting";
const getData = async (props: {
  auth: ICurrentCompany;
}): Promise<TPayrollSetting> => {
  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/payroll/setting`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: TPayrollSetting = res.data.data;

  const data: TPayrollSetting = {
    ...item,
  };

  return data;
};

export const useGetPayrollSetting = () => {
  const { token, companyId } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_PAYROLL_SETTING],
    () =>
      getData({
        auth: {
          companyId,
          token,
        },
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
