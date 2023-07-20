import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TPayrollScheme } from "features/payroll/types/payrollSchemes";
import { TDirectSalaryPayrollScheme } from "features/payroll/types/payrollSchemes/directSalary";
import { TOfficePayrollScheme } from "features/payroll/types/payrollSchemes/office";
import { TWagesPayrollScheme } from "features/payroll/types/payrollSchemes/wages";
import { TSingleProjectPayrollScheme } from "features/payroll/types/payrollSchemes/singleProject";
import { TSingleWagePayrollScheme } from "features/payroll/types/payrollSchemes/singleWage";

interface IDataProps {
  typeOrId: "office" | "direct-salary" | "wages" | number;
}

export const QUERY_KEY_FOR_PAYROLL_SCHEME_BY_TYPE_OR_ID =
  "payroll-scheme-by-type-or-id";
const getData = async (props: {
  data: IDataProps;
  auth: ICurrentCompany;
}): Promise<TPayrollScheme> => {
  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/scheme/${props.data.typeOrId}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: TPayrollScheme = res.data.data;

  let data: TPayrollScheme = {
    ...item,
  };
  let dataToBeReturned = data;
  if (props.data.typeOrId === "direct-salary") {
    dataToBeReturned = data as TDirectSalaryPayrollScheme;
  }
  if (props.data.typeOrId === "office") {
    dataToBeReturned = data as TOfficePayrollScheme;
  }
  if (props.data.typeOrId === "wages") {
    dataToBeReturned = data as TWagesPayrollScheme;
  }
  if (typeof props.data.typeOrId === "number") {
    dataToBeReturned = data as
      | TSingleProjectPayrollScheme
      | TSingleWagePayrollScheme;
  }

  return dataToBeReturned;
};

export const useGetPayrollSchemeByTypeOrId = (props: IDataProps) => {
  const { token, companyId } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_PAYROLL_SCHEME_BY_TYPE_OR_ID],
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
