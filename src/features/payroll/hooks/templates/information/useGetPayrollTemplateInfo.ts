import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import {
  TPayrollTemplateInfo,
  TPayrollTemplateInfoType,
} from "features/payroll/types/template";

interface IDataProps {
  type: TPayrollTemplateInfoType;
}
export const QUERY_KEY_FOR_PAYROLL_TEMPLATE_INFO = "payroll-template-info";
const getData = async (props: {
  data: IDataProps;
  auth: ICurrentCompany;
}): Promise<TPayrollTemplateInfo[]> => {
  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/template/information/${props.data.type}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: TPayrollTemplateInfo[] = res.data.data;

  return item;
};

export const useGetPayrollTemplateInfo = (props: IDataProps) => {
  const { token, companyId } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_PAYROLL_TEMPLATE_INFO, props.type],
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
