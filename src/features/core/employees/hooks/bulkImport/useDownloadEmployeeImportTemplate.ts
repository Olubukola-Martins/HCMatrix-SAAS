import { useMutation } from "react-query";
import { EmployeeMappingSectionKeyType } from "../../types/bulk-import";
import { useFetchCountries } from "hooks/useFetchCountries";
import { TCountry } from "types/country";
import { TEmployee } from "../../types";
import { TBranch } from "features/core/branches/types";
import { TExchangeRateListItem, TPayGrade } from "features/payroll/types";
import { useFetchEmployees } from "../useFetchEmployees";
import { useFetchBranches } from "features/core/branches/hooks/useFetchBranches";
import { useGetPayGrades } from "features/payroll/hooks/payGrades/useGetPayGrades";
import { useGetExchangeRates } from "features/payroll/hooks/exhangeRates/useGetExchangeRates";
import * as XLSX from "xlsx";
import { getEmployeeFullName } from "../../utils/getEmployeeFullName";
import {
  EMPLOYMENT_ELIGIBILITIES,
  EMPLOYMENT_TYPES,
  GENDERS,
  MARITAL_STATUSES,
  RELATIONSHIPS,
  WORK_MODELS,
} from "constants/general";
import {
  PAYROLL_FREQUENCIES,
  PAYROLL_SCHEME_OPTIONS,
} from "features/payroll/constants";
import { TState } from "types/states";
import { TLga } from "types/lgas";
import { useFetchStates } from "hooks/useFetchStates";
import { useFetchLgas } from "hooks/useFetchLGAs";
import { TIME_ZONES } from "constants/timeZones";

type TResponse = any;
const EMPLOYEE_IMPORT_DOWNLOAD = "employee-import.xlsx";

export type TBulkEmployeeImportError = {
  content: string;
  category: EmployeeMappingSectionKeyType;
};

type TDependencies = {
  countries?: TCountry[];
  states?: TState[];
  lgas?: TLga[];
  timezones?: { label: string; value: string }[];
  employees?: TEmployee[];
  branches?: TBranch[];
  payGrades?: TPayGrade[];
  exchangeRates?: TExchangeRateListItem[];
};
const generateTemplate = async (props: {
  // auth: ICurrentCompany;
  dependencies: TDependencies;
}): Promise<TResponse> => {
  const { dependencies } = props;

  //   dependcies
  const {
    countries,
    branches,
    employees,
    payGrades,
    exchangeRates,
    lgas,
    states,
    timezones,
  } = dependencies;

  //   This Data will just be to create AND NOT update for the time being

  // Process Data (add a new row)
  const creareBaseRow = (indexIncrement: number) => ({
    "First Name": "Uche",
    "Last Name": "Labidi",
    "Employee ID": `SNAP000${indexIncrement + 1}`,
    "License Type": "licensed",
    Email: "uche@example.com",
    "Date of Birth": "12/28/1995",
    Gender: GENDERS?.[indexIncrement]?.value ?? GENDERS?.[0]?.value,
    "Phone Number": "08000000000",
    Eligibility:
      EMPLOYMENT_ELIGIBILITIES?.[indexIncrement] ??
      EMPLOYMENT_ELIGIBILITIES?.[0],
    "Exchange Rate":
      exchangeRates?.[indexIncrement]?.currency ??
      "Please set up exhange rate in settings",
    "Marital Status":
      MARITAL_STATUSES?.[indexIncrement]?.value ?? MARITAL_STATUSES?.[0]?.value,
    Nationality:
      countries?.[indexIncrement].name ?? "Please set up country in settings",
    "Street Address": "no.9 James Boulevard, Victoria Island",
    "Country of Residence":
      countries?.[indexIncrement].name ?? "Please set up country in settings",
    "State of Residence":
      states?.[indexIncrement].name ?? "Please set up state in settings",
    "LGA of Residence":
      lgas?.[indexIncrement].name ?? "Please set up lga in settings",
    "Timezone of Residence":
      timezones?.[indexIncrement].value ?? "Please set up timezone in settings",
    "Passport Expiration Date": "12/28/2025",
    "Alternative Email": "uche.alt@example.com",
    "Alternative Phone Number": "08000000000",
    NIN: "56787023555000",
    "Employment Type":
      EMPLOYMENT_TYPES?.[indexIncrement]?.value ?? EMPLOYMENT_TYPES?.[0]?.value,
    "Work Model":
      WORK_MODELS?.[indexIncrement]?.value ?? WORK_MODELS?.[0]?.value,
    "No of Days Per Week": "5",
    "Hire Date": "01/10/2024",
    "Start Date": "01/11/2024",
    "Probation End Date": "01/12/2024",
    "Confirmation Date": "01/13/2024",
    "Line Manager": `SNAP000${indexIncrement * (2 + 23)}`,
    Branch:
      branches?.[indexIncrement]?.name ?? "Please set up branch in settings",
    "Payroll Type":
      PAYROLL_SCHEME_OPTIONS?.[indexIncrement]?.value ??
      PAYROLL_SCHEME_OPTIONS?.[0]?.value,
    "Monthly Gross": "10000000",
    "Pay Grade":
      payGrades?.[indexIncrement]?.name ??
      "Please set up pay grade in settings",
    "Payroll Frequency":
      PAYROLL_FREQUENCIES?.[indexIncrement] ?? PAYROLL_FREQUENCIES?.[0],
    "Hourly Rate": "7300",
    "Emergency Contact Name": "Uche Okeke",
    "Emergency Contact Relationship":
      RELATIONSHIPS?.[indexIncrement].value ?? RELATIONSHIPS?.[0].value,
    "Emergency Contact Address": "no.9 James Boulevard, Victoria Island",
    "Emergency Contact Phone": "08000000010",
  });
  const NO_OF_EXAMPLES_PROVIDED_TO_USER = 10;
  const rows = Array(NO_OF_EXAMPLES_PROVIDED_TO_USER)
    .fill(0)
    .map((_, index) => creareBaseRow(index));
  const importWorkSheet = XLSX.utils.json_to_sheet(rows);
  const statesWorksheet = XLSX.utils.json_to_sheet(
    states?.map((item) => ({
      Name: item.name,
    })) ?? []
  );
  const lgasWorksheet = XLSX.utils.json_to_sheet(
    lgas?.map((item) => ({
      Name: item.name,
    })) ?? []
  );
  const timezoneWorksheet = XLSX.utils.json_to_sheet(
    timezones?.map((item) => ({
      Name: item.value,
    })) ?? []
  );
  const branchesWorksheet = XLSX.utils.json_to_sheet(
    branches?.map((item) => ({
      Name: item.name,
      Desciption: item.description,
    })) ?? []
  );
  const exchangeRatesWorksheet = XLSX.utils.json_to_sheet(
    exchangeRates?.map((item) => ({
      Name: item.currency,
    })) ?? []
  );
  const employeesWorksheet = XLSX.utils.json_to_sheet(
    employees?.map((item) => ({
      "Employee ID": item.empUid,
      Name: getEmployeeFullName(item),
    })) ?? []
  );
  const countriesWorksheet = XLSX.utils.json_to_sheet(
    countries?.map((item) => ({
      Name: item.name,
    })) ?? []
  );
  const payGradesWorksheet = XLSX.utils.json_to_sheet(
    payGrades?.map((item) => ({
      Name: item.name,
      "Gross Pay": item.grossPay,
    })) ?? []
  );
  const workbook = XLSX.utils.book_new();

  /* calculate column width */
  importWorkSheet["!cols"] = Object.keys(rows[0]).map((key) => ({
    wch: rows.reduce(
      (w, r: { [key: string]: string }) =>
        Math.max(w, Math.max(r[key].length, key.length)),
      12
    ),
  }));
  //   XLSX.utils.sheet_set_array_formula(importWorkSheet, "D2", "=Yes, No");
  XLSX.utils.book_append_sheet(workbook, importWorkSheet, "MAIN IMPORT FILE");
  XLSX.utils.book_append_sheet(workbook, countriesWorksheet, "Countries");
  XLSX.utils.book_append_sheet(workbook, statesWorksheet, "States");
  XLSX.utils.book_append_sheet(workbook, lgasWorksheet, "Local Governments");
  XLSX.utils.book_append_sheet(workbook, timezoneWorksheet, "Timezones");
  XLSX.utils.book_append_sheet(workbook, payGradesWorksheet, "Pay Grades");
  XLSX.utils.book_append_sheet(workbook, branchesWorksheet, "Branches");
  XLSX.utils.book_append_sheet(
    workbook,
    exchangeRatesWorksheet,
    "Exchange Rates"
  );
  XLSX.utils.book_append_sheet(workbook, employeesWorksheet, "Employees");
  //   XLSX.utils.sheet_add_aoa(ws, [["Created "+new Date().toISOString()]], {origin:-1});

  // Package and Release Data (`writeFile` tries to write and save an XLSB file)
  return XLSX.writeFile(workbook, EMPLOYEE_IMPORT_DOWNLOAD);
  //   return download(response, EMPLOYEE_IMPORT_DOWNLOAD);
};

export const useDownloadEmployeeImportTemplate = () => {
  const REASONABLE_LIMIT_FOR_ENTITITY_POPULATON = 500;
  const { data: countries } = useFetchCountries();
  const { data: states } = useFetchStates();
  const { data: lgas } = useFetchLgas();
  const { data: employees } = useFetchEmployees({
    pagination: { limit: REASONABLE_LIMIT_FOR_ENTITITY_POPULATON },
  });
  const { data: branches } = useFetchBranches({
    pagination: { limit: REASONABLE_LIMIT_FOR_ENTITITY_POPULATON },
  });
  const { data: payGrades } = useGetPayGrades({
    pagination: { limit: REASONABLE_LIMIT_FOR_ENTITITY_POPULATON },
  });
  const { data: exchangeRates } = useGetExchangeRates({
    pagination: { limit: REASONABLE_LIMIT_FOR_ENTITITY_POPULATON },
  });
  return useMutation(
    () =>
      generateTemplate({
        dependencies: {
          countries,
          states,
          lgas,
          employees: employees?.data,
          branches: branches?.data,
          payGrades: payGrades?.data,
          exchangeRates: exchangeRates?.data,
          timezones: TIME_ZONES,
        },
      }),
    {}
  );
};
