// TODO: Work on Duplicate Data Validation
// ENSURE ADDRESS is properly mapped for personal info, and is also accounted for in the generated template
// Work on testing validation and actually importing data
// then move on to recent updates

// Also the discussion of create vs update data, and also what fields are required and what happens when they are not filled

// then move on to delete group, & member confirmation, and then to employee info & modals : account for branch, and then the user dashboard, and organogram

// Also limit upload file for employee bulk import to one file

// STICK TO FLOW , before switching to other tasks

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
import { PAYROLL_SCHEME_OPTIONS } from "features/payroll/constants";
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

  //   TODO: Address duplicate inputs as error
  // Process Data (add a new row)
  const rows = [
    {
      "First Name": "A Name",
      "Last Name": "A Name",
      "Employee ID": "A unique ID",
      "Has Self Service": "Yes, or No",
      Email: "Valid Email Address",
      "Date of Birth": "Valid Date",
      Gender: GENDERS.map((item) => item.value).join(","),
      "Phone Number": "Valid Phone Number",
      Eligibility: EMPLOYMENT_ELIGIBILITIES.join(","),
      "Exchange Rate": "A valid Name of Exchange Rate",
      "Marital Status": MARITAL_STATUSES.map((item) => item.value).join(","),
      Nationality: "A valid Country Name",
      "Street Address": "A non empty value",
      "Country of Residence": "A valid country name",
      "State of Residence": "A valid state name",
      "LGA of Residence": "A valid lga name",
      "Timezone of Residence": "A valid timezone",
      "Passport Expiration Date": "A valid Date",
      "Alternative Email": "Valid Email",
      "Alternative Phone Number": "Valid Phone Number",
      NIN: "A valid NIN Number",
      "Start Date": "A valid date",
      "Employment Type": EMPLOYMENT_TYPES.map((item) => item.value).join(","),
      "Work Model": WORK_MODELS.map((item) => item.value).join(","),
      "No of Days Per Week": "1 - 7",
      "Hire Date": "Valid Date",
      "Probation End Date": "Valid Date",
      "Confirmation Date": "Valid Date",
      "Line Manager": "An Existing Employee ID",
      Branch: "An Existing Branch Name",
      "Payroll Type": PAYROLL_SCHEME_OPTIONS.filter(
        (item) => item.value !== "project"
      )
        .map((item) => item.value)
        .join(","),
      "Monthly Gross": "An amount greater than 0",
      "Pay Grade": "An Existing Paygrade Name",
      "Payroll Frequency": ["daily", "monthly"].join(","),
      "Hourly Rate": "An Amount greater than 0",
      "Emergency Contact Name": "Full name",
      "Emergency Contact Relationship": RELATIONSHIPS.map(
        (item) => item.value
      ).join(","),
      "Emergency Contact Address": "An address",
      "Emergency Contact Phone": "A valid phone number",
    },
  ];
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
  const { data: countries } = useFetchCountries();
  const { data: states } = useFetchStates();
  const { data: lgas } = useFetchLgas();
  const { data: employees } = useFetchEmployees({
    pagination: { limit: 500, offset: 0 },
  });
  const { data: branches } = useFetchBranches({
    pagination: { limit: 500, offset: 0 },
  });
  const { data: payGrades } = useGetPayGrades({
    pagination: { limit: 500, offset: 0 },
  });
  const { data: exchangeRates } = useGetExchangeRates({
    pagination: { limit: 500, offset: 0 },
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
