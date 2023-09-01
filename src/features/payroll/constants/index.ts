import { TPayrollSchemeType } from "../types/payrollSchemes";

// PM COnvo: Employee Id, Address, Name, Tax ID, Phone, Email, (Alt), all org IDS, bank details, Exchange Rate, payroll type
export const employeeInformationOptions = [
  // {
  //   label: "Profile Picture",
  //   value: "image",
  // },
  {
    label: "Staff ID",
    value: "empuid",
  },
  {
    label: "Full Name",
    value: "name",
  },
  // {
  //   label: "Date of Birth",
  //   value: "dob",
  // },
  {
    label: "Address",
    value: "address",
  },
  {
    label: "Email",
    value: "email",
  },
  {
    label: "Alternative Email",
    value: "altEmail",
  },
  {
    label: "Phone Number",
    value: "phoneNumber",
  },
  {
    label: "Alternative Phone Number",
    value: "altPhoneNumber",
  },
  {
    label: "National Identification Number",
    value: "nin",
  },
  {
    label: "Gender",
    value: "gender",
  },
  {
    label: "Bank Name",
    value: "bankName",
  },
  {
    label: "Account Number",
    value: "accountNumber",
  },
  {
    label: "Bank Verification Number",
    value: "bvn",
  },

  {
    label: "Designation",
    value: "designation",
  },
  {
    label: "Employment Eligibility",
    value: "eligibility",
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
    label: "Tax ID",
    value: "taxId",
  },
  {
    label: "Tax Authority",
    value: "taxAuthority",
  },
  {
    label: "NSITF ID",
    value: "nstifID",
  },
  {
    label: "NSITF Authority",
    value: "nstifAuthority",
  },
  {
    label: "ITF ID",
    value: "itfId",
  },
  {
    label: "ITF Authority",
    value: "itfAuthority",
  },
  {
    label: "Pension ID",
    value: "pensionId",
  },
  {
    label: "Pension Administrator",
    value: "pensionAuthority",
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
    label: "NSITF Pay",
    value: "nsitf",
  },
  {
    label: "ITF Pay",
    value: "itf",
  },
  {
    label: "Pension Pay",
    value: "pension",
  },
  {
    label: "Tax Pay",
    value: "tax",
  },
  {
    label: "Overtime Pay",
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
