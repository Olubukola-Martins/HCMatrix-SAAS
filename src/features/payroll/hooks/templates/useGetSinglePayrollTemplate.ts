import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import {
  TPayrollTemplate,
  TPayrollTemplateType,
} from "features/payroll/types/template";

interface IDataProps {
  type: TPayrollTemplateType;
  templateId: number;
}
export const QUERY_KEY_FOR_SINGLE_PAYROLL_TEMPLATE = "simple-payroll-template";
const getData = async (props: {
  data: IDataProps;
  auth: ICurrentCompany;
}): Promise<TPayrollTemplate> => {
  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/template/${props.data.type}/${props.data.templateId}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: TPayrollTemplate = res.data.data;

  const data: TPayrollTemplate = {
    ...item,
  };

  return data;
};

export const useGetSinglePayrollTemplate = (props: IDataProps) => {
  const { token, companyId } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_SINGLE_PAYROLL_TEMPLATE],
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
