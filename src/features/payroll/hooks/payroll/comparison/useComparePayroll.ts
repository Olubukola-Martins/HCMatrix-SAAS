import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";

export type TPayrollComaparisonType = "basic" | "advanced";
interface IGetDataProps {
  payrollId: number;
  type: TPayrollComaparisonType;
  selected: string;
  against: string;
}

export const QUERY_KEY_FOR_PAYROLL_COMPARISON = "payroll-comparison";

const getData = async (props: {
  data: IGetDataProps;
  auth: ICurrentCompany;
}): Promise<PayrollComparisonData | null> => {
  const { against, selected, payrollId, type } = props.data;

  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/payroll/${payrollId}/comparison/${type}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
    params: {
      selected,
      against,
    },
  };

  const res = await axios.get(url, config);
  const fetchedData: PayrollComparisonData | null = res.data;

  return fetchedData;
};

export const useComparePayroll = (props: { data: IGetDataProps }) => {
  const { token, companyId } = useApiAuth();

  const { against, selected, payrollId, type } = props.data;
  const queryData = useQuery(
    [QUERY_KEY_FOR_PAYROLL_COMPARISON, against, selected, payrollId, type],
    () =>
      getData({
        auth: { token, companyId },
        data: {
          ...props.data,
        },
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};

interface PayrollComparisonData {
  componentHeadersToDisplay: string[];
  selectedPayroll: PayrollData;
  againstPayroll: PayrollData;
}

interface PayrollData {
  componentsToDisplay: ComponentsToDisplay;
  totalAllowances: number;
  totalDeductions: number;
  totalNetPay: number;
  totalGrossPay: number;
  totalTax: number;
  totalPension: number;
  id: number;
  schemeId: number;
  name: string;
  date: string;
  disbursementDate: null;
  description: string;
  frequency: string;
  status: string;
  costCentreId: number;
  employeeId: number;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  employeePayrolls: EmployeePayroll[];
}

interface EmployeePayroll {
  componentsToDisplay: ComponentsToDisplay;
  id: number;
  payrollId: number;
  employeeId: number;
  empUid: string;
  eligibility: string;
  fullName: string;
  netPay: string;
  grossPay: string;
  totalAllowances: string;
  totalDeductions: string;
  tax: string;
  pension: string;
  currency: string;
  exchangeRate: string;
  isActive: boolean;
}

type ComponentsToDisplay = Record<string, number>;
