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
import ExcelJS from "exceljs";
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
  ESSENTIAL_PAYROLL_TYPES_OPTIONS,
  PAYROLL_FREQUENCIES,
  PAYROLL_SCHEME_OPTIONS,
} from "features/payroll/constants";
import { TState } from "types/states";
import { TLga } from "types/lgas";
import { useFetchStates } from "hooks/useFetchStates";
import { useFetchLgas } from "hooks/useFetchLGAs";
import { TIME_ZONES } from "constants/timeZones";
import download from "js-file-download";
import { LICENSE_TYPES } from "../../constants";
import {
  EXCEL_COLUMN_LETTER_MAPPING,
  REASONABLE_AMOUNT_OF_ROWS_TO_HAVE_EXCEL_CELL_VALIDATION,
} from "constants/excel";

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
  dependencies: TDependencies;
}): Promise<TResponse> => {
  const { dependencies } = props;
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
  const NO_OF_EXAMPLES_PROVIDED_TO_USER = 10;

  const createBaseRow = (indexIncrement: number): Record<string, string> => ({
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
      "Please set up exchange rate in settings",
    "Marital Status":
      MARITAL_STATUSES?.[indexIncrement]?.value ?? MARITAL_STATUSES?.[0]?.value,
    Nationality:
      countries?.[indexIncrement]?.name ?? "Please set up country in settings",
    "Street Address": "no.9 James Boulevard, Victoria Island",
    "Country of Residence":
      countries?.[indexIncrement]?.name ?? "Please set up country in settings",
    "State of Residence":
      states?.[indexIncrement]?.name ?? "Please set up state in settings",
    "LGA of Residence":
      lgas?.[indexIncrement]?.name ?? "Please set up lga in settings",
    "Timezone of Residence":
      timezones?.[indexIncrement]?.value ??
      "Please set up timezone in settings",
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
      RELATIONSHIPS?.[indexIncrement]?.value ?? RELATIONSHIPS?.[0]?.value,
    "Emergency Contact Address": "no.9 James Boulevard, Victoria Island",
    "Emergency Contact Phone": "08000000010",
  });

  const rows = Array(NO_OF_EXAMPLES_PROVIDED_TO_USER)
    .fill(0)
    .map((_, index) => createBaseRow(index));

  const workbook = new ExcelJS.Workbook();

  // Function to add a worksheet with data
  const addWorksheet = (name: string, data: any[]) => {
    const worksheet = workbook.addWorksheet(name);
    // set  the column widths
    worksheet.columns = Object.keys(data?.[0] || {}).map((key) => ({
      header: key,
      key: key,
      width:
        Math.max(
          ...data.map((row) => (row[key] ? row[key].length : 0)),
          key.length
        ) + 2,
    }));
    worksheet.addRows(data);
    return worksheet;
  };

  const importWorkSheet = addWorksheet("MAIN IMPORT FILE", rows);
  addWorksheet(
    "Countries",
    countries?.map((item) => ({ Name: item.name })) ?? []
  );
  addWorksheet("States", states?.map((item) => ({ Name: item.name })) ?? []);
  addWorksheet(
    "Local Governments",
    lgas?.map((item) => ({ Name: item.name })) ?? []
  );
  addWorksheet(
    "Timezones",
    timezones?.map((item) => ({ Name: item.value })) ?? []
  );
  addWorksheet(
    "Branches",
    branches?.map((item) => ({
      Name: item.name,
      Description: item.description,
    })) ?? []
  );
  addWorksheet(
    "Exchange Rates",
    exchangeRates?.map((item) => ({ Name: item.currency })) ?? []
  );
  addWorksheet(
    "Employees",
    employees?.map((item) => ({
      "Employee ID": item.empUid,
      Name: getEmployeeFullName(item),
    })) ?? []
  );
  addWorksheet(
    "Pay Grades",
    payGrades?.map((item) => ({
      Name: item.name,
      "Gross Pay": item.grossPay,
    })) ?? []
  );

  const importWorkSheetColumns = Object.keys(rows[0]);

  // Add data validation to cells
  validateImportWorkSheetCells(
    importWorkSheet,
    importWorkSheetColumns,
    dependencies
  );

  // Write the workbook to a buffer
  const buffer = await workbook.xlsx.writeBuffer();

  // Use FileSaver to save the file
  download(new Blob([buffer]), EMPLOYEE_IMPORT_DOWNLOAD);
};

const validateImportWorkSheetCells = (
  worksheet: ExcelJS.Worksheet,
  importWorkSheetColumns: string[],
  dependencies: TDependencies
) => {
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
  const getIndexOfColumn = (col: string): number => {
    return importWorkSheetColumns.indexOf(col) + 1;
  };
  for (
    let i = 2;
    i < REASONABLE_AMOUNT_OF_ROWS_TO_HAVE_EXCEL_CELL_VALIDATION;
    i++
  ) {
    worksheet.getCell(
      `${
        EXCEL_COLUMN_LETTER_MAPPING?.[getIndexOfColumn("Timezone of Residence")]
      }${i}`
    ).dataValidation = {
      type: "list",
      allowBlank: false,
      formulae: [`"${timezones?.map((item) => item.value).join(",")}"`],
      showErrorMessage: true,
      errorTitle: "Invalid input",
      error: "Please select a value from the dropdown",
    };
    worksheet.getCell(
      `${EXCEL_COLUMN_LETTER_MAPPING?.[getIndexOfColumn("Branch")]}${i}`
    ).dataValidation = {
      type: "list",
      allowBlank: false,
      formulae: [`"${branches?.map((item) => item.name).join(",")}"`],
      showErrorMessage: true,
      errorTitle: "Invalid input",
      error: "Please select a value from the dropdown",
    };
    worksheet.getCell(
      `${EXCEL_COLUMN_LETTER_MAPPING?.[getIndexOfColumn("Line Manager")]}${i}`
    ).dataValidation = {
      type: "list",
      allowBlank: true,
      formulae: [`"${employees?.map((item) => item.empUid).join(",")}"`],
      showErrorMessage: true,
      errorTitle: "Invalid input",
      error: "Please select a value from the dropdown",
    };
    worksheet.getCell(
      `${EXCEL_COLUMN_LETTER_MAPPING?.[getIndexOfColumn("License Type")]}${i}`
    ).dataValidation = {
      type: "list",
      allowBlank: false,
      formulae: [`"${LICENSE_TYPES.join(",")}"`],
      showErrorMessage: true,
      errorTitle: "Invalid input",
      error: "Please select a value from the dropdown",
    };
    worksheet.getCell(
      `${EXCEL_COLUMN_LETTER_MAPPING?.[getIndexOfColumn("Pay Grade")]}${i}`
    ).dataValidation = {
      type: "list",
      allowBlank: true,
      formulae: [`"${payGrades?.map((item) => item.name).join(",")}"`],
      showErrorMessage: true,
      errorTitle: "Invalid input",
      error: "Please select a value from the dropdown",
    };
    worksheet.getCell(
      `${
        EXCEL_COLUMN_LETTER_MAPPING?.[getIndexOfColumn("Payroll Frequency")]
      }${i}`
    ).dataValidation = {
      type: "list",
      allowBlank: false,
      formulae: [`"${PAYROLL_FREQUENCIES.map((item) => item).join(",")}"`],
      showErrorMessage: true,
      errorTitle: "Invalid input",
      error: "Please select a value from the dropdown",
    };
    worksheet.getCell(
      `${EXCEL_COLUMN_LETTER_MAPPING?.[getIndexOfColumn("Payroll Type")]}${i}`
    ).dataValidation = {
      type: "list",
      allowBlank: false,
      formulae: [
        `"${ESSENTIAL_PAYROLL_TYPES_OPTIONS.map((item) => item.value).join(
          ","
        )}"`,
      ],
      showErrorMessage: true,
      errorTitle: "Invalid input",
      error: "Please select a value from the dropdown",
    };
    // TODO: Refactor to use enums as keys
    // TODO: FIx too long dropdown error
    // TODO: Use Essentail Payroll on the file mapping validation as well
    // TODO: Add non list validation to other fields
    worksheet.getCell(
      `${
        EXCEL_COLUMN_LETTER_MAPPING?.[
          getIndexOfColumn("Emergency Contact Relationship")
        ]
      }${i}`
    ).dataValidation = {
      type: "list",
      allowBlank: false,
      formulae: [`"${RELATIONSHIPS.map((item) => item.value).join(",")}"`],
      showErrorMessage: true,
      errorTitle: "Invalid input",
      error: "Please select a value from the dropdown",
    };
    worksheet.getCell(
      `${EXCEL_COLUMN_LETTER_MAPPING?.[getIndexOfColumn("Work Model")]}${i}`
    ).dataValidation = {
      type: "list",
      allowBlank: false,
      formulae: [`"${WORK_MODELS.map((item) => item.value).join(",")}"`],
      showErrorMessage: true,
      errorTitle: "Invalid input",
      error: "Please select a value from the dropdown",
    };
    worksheet.getCell(
      `${
        EXCEL_COLUMN_LETTER_MAPPING?.[getIndexOfColumn("Employment Type")]
      }${i}`
    ).dataValidation = {
      type: "list",
      allowBlank: false,
      formulae: [`"${EMPLOYMENT_TYPES.map((item) => item.value).join(",")}"`],
      showErrorMessage: true,
      errorTitle: "Invalid input",
      error: "Please select a value from the dropdown",
    };
    worksheet.getCell(
      `${
        EXCEL_COLUMN_LETTER_MAPPING?.[getIndexOfColumn("LGA of Residence")]
      }${i}`
    ).dataValidation = {
      type: "list",
      allowBlank: true,
      formulae: [`"${lgas?.map((item) => item.name).join(",")}"`],
      showErrorMessage: true,
      errorTitle: "Invalid input",
      error: "Please select a value from the dropdown",
    };
    worksheet.getCell(
      `${
        EXCEL_COLUMN_LETTER_MAPPING?.[getIndexOfColumn("State of Residence")]
      }${i}`
    ).dataValidation = {
      type: "list",
      allowBlank: false,
      formulae: [`"${states?.map((item) => item.name).join(",")}"`],
      showErrorMessage: true,
      errorTitle: "Invalid input",
      error: "Please select a value from the dropdown",
    };
    worksheet.getCell(
      `${
        EXCEL_COLUMN_LETTER_MAPPING?.[getIndexOfColumn("Country of Residence")]
      }${i}`
    ).dataValidation = {
      type: "list",
      allowBlank: false,
      formulae: [`"${countries?.map((item) => item.name).join(",")}"`],
      showErrorMessage: true,
      errorTitle: "Invalid input",
      error: "Please select a value from the dropdown",
    };
    worksheet.getCell(
      `${EXCEL_COLUMN_LETTER_MAPPING?.[getIndexOfColumn("Nationality")]}${i}`
    ).dataValidation = {
      type: "list",
      allowBlank: false,
      formulae: [`"${countries?.map((item) => item.name).join(",")}"`],
      showErrorMessage: true,
      errorTitle: "Invalid input",
      error: "Please select a value from the dropdown",
    };
    worksheet.getCell(
      `${EXCEL_COLUMN_LETTER_MAPPING?.[getIndexOfColumn("Exchange Rate")]}${i}`
    ).dataValidation = {
      type: "list",
      allowBlank: false,
      formulae: [`"${exchangeRates?.map((item) => item.currency).join(",")}"`],
      showErrorMessage: true,
      errorTitle: "Invalid input",
      error: "Please select a value from the dropdown",
    };
    // TODO: Make all key column indexes enums for reusablity & consistency
    worksheet.getCell(
      `${EXCEL_COLUMN_LETTER_MAPPING?.[getIndexOfColumn("Gender")]}${i}`
    ).dataValidation = {
      type: "list",
      allowBlank: false,
      formulae: [`"${GENDERS.map((item) => item.value).join(",")}"`],
      showErrorMessage: true,
      errorTitle: "Invalid input",
      error: "Please select a value from the dropdown",
    };
    worksheet.getCell(
      `${EXCEL_COLUMN_LETTER_MAPPING?.[getIndexOfColumn("Marital Status")]}${i}`
    ).dataValidation = {
      type: "list",
      allowBlank: false,
      formulae: [`"${MARITAL_STATUSES.map((item) => item.value).join(",")}"`],
      showErrorMessage: true,
      errorTitle: "Invalid input",
      error: "Please select a value from the dropdown",
    };
    worksheet.getCell(
      `${EXCEL_COLUMN_LETTER_MAPPING?.[getIndexOfColumn("Eligibility")]}${i}`
    ).dataValidation = {
      type: "list",
      allowBlank: false,
      formulae: [`"${EMPLOYMENT_ELIGIBILITIES.map((item) => item).join(",")}"`],
      showErrorMessage: true,
      errorTitle: "Invalid input",
      error: "Please select a value from the dropdown",
    };
  }
};

export const useDownloadEmployeeImportTemplate = () => {
  const REASONABLE_LIMIT_FOR_ENTITY_POPULATION = 500;
  const { data: countries } = useFetchCountries();
  const { data: states } = useFetchStates();
  const { data: lgas } = useFetchLgas();
  const { data: employees } = useFetchEmployees({
    pagination: { limit: REASONABLE_LIMIT_FOR_ENTITY_POPULATION },
  });
  const { data: branches } = useFetchBranches({
    pagination: { limit: REASONABLE_LIMIT_FOR_ENTITY_POPULATION },
  });
  const { data: payGrades } = useGetPayGrades({
    pagination: { limit: REASONABLE_LIMIT_FOR_ENTITY_POPULATION },
  });
  const { data: exchangeRates } = useGetExchangeRates({
    pagination: { limit: REASONABLE_LIMIT_FOR_ENTITY_POPULATION },
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
