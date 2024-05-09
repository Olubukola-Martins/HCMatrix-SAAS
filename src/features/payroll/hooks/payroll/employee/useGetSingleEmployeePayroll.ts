import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TSingleEmployeePayroll } from "features/payroll/types";

interface IDataProps {
  payrollId?: number;
  employeeId?: number;
}
export const QUERY_KEY_FOR_SINGLE_EMPLOYEE_PAYROLL = "single-employee-payroll";
const getData = async (props: {
  data: IDataProps;
  auth: ICurrentCompany;
}): Promise<TSingleEmployeePayroll> => {
  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/payroll/${props.data.payrollId}/employee/${props.data.employeeId}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: TSingleEmployeePayroll = res.data.data;

  const data: TSingleEmployeePayroll = {
    ...item,
  };

  return data;
};

export const useGetSingleEmployeePayroll = (props: IDataProps) => {
  const { token, companyId } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_SINGLE_EMPLOYEE_PAYROLL, props.payrollId, props.employeeId],
    () =>
      getData({
        auth: {
          companyId,
          token,
        },
        data: { ...props },
      }),
    {
      enabled: !!props.employeeId && !!props.payrollId,
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
