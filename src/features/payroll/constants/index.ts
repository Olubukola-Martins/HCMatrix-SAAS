import { TPayrollSchemeType } from "../types/payrollSchemes";

export const employeeInformationOptions = [
  {
    label: "Date of Birth",
    value: "dob",
  },
  {
    label: "Staff ID",
    value: "empuid",
  },
  {
    label: "Address",
    value: "address",
  },
  {
    label: "Email",
    value: "email",
  },
  {
    label: "Phone Number",
    value: "phoneNumber",
  },
  {
    label: "Bank Information",
    value: "bankInformation",
  },
  {
    label: "Bank Verification Number",
    value: "bvn",
  },
  {
    label: "National Identification Number",
    value: "nin",
  },
  {
    label: "Full Name",
    value: "fullName",
  },
  {
    label: "Designation",
    value: "designation",
  },
  {
    label: "Exchange Rate",
    value: "exchangeRate",
  },
  {
    label: "Branch",
    value: "branch",
  },
  {
    label: "Department",
    value: "department",
  },
  {
    label: "Tax Information",
    value: "taxId",
  },
  {
    label: "NSITF Information",
    value: "nstifId",
  },
  {
    label: "ITF Information",
    value: "itfId",
  },
  {
    label: "Pension Information",
    value: "pensionId",
  },
  {
    label: "Payroll Type",
    value: "payrollType",
  },
];
export const payrollInformationOptions = [
  {
    label: "Net Pay",
    value: "netPay",
  },
  {
    label: "Cost Centre",
    value: "costCentre",
  },
  {
    label: "Gross Pay",
    value: "grossPay",
  },
  {
    label: "NSITF",
    value: "nsitf",
  },
  {
    label: "ITF",
    value: "itf",
  },
  {
    label: "Pension",
    value: "pension",
  },
  {
    label: "Tax",
    value: "tax",
  },
  {
    label: "Overtime",
    value: "overtime",
  },

  {
    label: "Leave allowance",
    value: "leaveAllowance",
  },
  {
    label: "13th Month Salary",
    value: "13thMonthSalary",
  },
  {
    label: "Total Allowances",
    value: "totalAllowances",
  },
  {
    label: "Total Deductions",
    value: "totalDeductions",
  },
];

const PAYROLL_SCHEMES: TPayrollSchemeType[] = [
  "direct-salary",
  "office",
  "project",
  "wages",
];
export const PAYROLL_SCHEME_OPTIONS: {
  value: TPayrollSchemeType;
  label: string;
}[] = PAYROLL_SCHEMES.map((item) => ({
  label: item.split("-").join(" "),
  value: item,
}));
