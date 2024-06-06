import { useMutation } from "react-query";
import {
  EmployeeBulkTemplateColumnName,
  EmployeeBulkTemplateExportSheetName,
  EmployeeMappingSectionKeyType,
} from "../../types/bulk-import";
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
  ESSENTIAL_PAYROLL_TYPES,
  PAYROLL_FREQUENCIES,
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
const REASONABLE_LIMIT_FOR_ENTITY_POPULATION = 500;
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

  const rows = createExampleRows(
    employees,
    exchangeRates,
    countries,
    states,
    lgas,
    timezones,
    branches,
    payGrades,
    NO_OF_EXAMPLES_PROVIDED_TO_USER
  );

  const workbook = new ExcelJS.Workbook();

  // Function to add a worksheet with data
  const addWorksheet = (
    name: EmployeeBulkTemplateExportSheetName,
    data: Record<string, string | undefined | null>[],
    headers?: string[]
  ) => {
    data = data ?? [];
    headers = headers ?? Object.keys(data?.[0] || {});
    const worksheet = workbook.addWorksheet(name);
    // set  the column widths
    worksheet.columns = headers.map((key) => ({
      header: key,
      key: key,
      width:
        Math.max(
          ...data?.map((row) => {
            const defaultWidth = 30;
            if (row?.[key]?.length) {
              return row?.[key]?.length ?? defaultWidth;
            }
            return defaultWidth;
          }),
          key.length
        ) + 2,
    }));
    worksheet.addRows(data);
    return worksheet;
  };

  const importWorkSheet = addWorksheet(
    EmployeeBulkTemplateExportSheetName.MAIN_IMPORT_FILE,
    rows
    // Object.keys(rows?.[0] || {})
  );
  addWorksheet(
    EmployeeBulkTemplateExportSheetName.COUNTRIES,
    countries?.map((item) => ({ Name: item.name })) ?? []
  );
  addWorksheet(
    EmployeeBulkTemplateExportSheetName.STATES,
    states?.map((item) => ({ Name: item.name })) ?? []
  );
  addWorksheet(
    EmployeeBulkTemplateExportSheetName.LOCAL_GOVERNMENTS,
    lgas?.map((item) => ({ Name: item.name })) ?? []
  );
  addWorksheet(
    EmployeeBulkTemplateExportSheetName.TIMEZONES,
    timezones?.map((item) => ({ Name: item.value })) ?? []
  );
  addWorksheet(
    EmployeeBulkTemplateExportSheetName.BRANCHES,
    branches?.map((item) => ({
      Name: item.name,
      Description: item.description,
    })) ?? []
  );
  addWorksheet(
    EmployeeBulkTemplateExportSheetName.EXCHANGE_RATES,
    exchangeRates?.map((item) => ({ Name: item.currency })) ?? []
  );
  addWorksheet(
    EmployeeBulkTemplateExportSheetName.EMPLOYEES,
    employees?.map((item) => ({
      "Employee ID": item.empUid,
      Name: getEmployeeFullName(item),
    })) ?? []
  );
  addWorksheet(
    EmployeeBulkTemplateExportSheetName.PAYGRADES,
    payGrades?.map((item) => ({
      Name: item.name,
      "Gross Pay": item.grossPay,
    })) ?? []
  );

  const importWorkSheetColumns = Object.keys(rows[0]);

  // Add data validation to cells
  validateImportWorkSheetCells(importWorkSheet, importWorkSheetColumns);

  // Write the workbook to a buffer
  const buffer = await workbook.xlsx.writeBuffer();

  // Use FileSaver to save the file
  download(new Blob([buffer]), EMPLOYEE_IMPORT_DOWNLOAD);
};

const validateImportWorkSheetCells = (
  worksheet: ExcelJS.Worksheet,
  importWorkSheetColumns: string[]
) => {
  const getIndexOfColumn = (col: EmployeeBulkTemplateColumnName): number => {
    return importWorkSheetColumns.indexOf(col) + 1;
  };
  const columnFormulaMappings: {
    name: EmployeeBulkTemplateColumnName;
    formulae: string[];
    allowBlank?: boolean;
  }[] = [
    {
      name: EmployeeBulkTemplateColumnName.LICENSE_TYPE,
      formulae: [`"${LICENSE_TYPES.join(",")}"`],
    },
    {
      name: EmployeeBulkTemplateColumnName.GENDER,
      formulae: [`"${GENDERS.map((item) => item.value).join(",")}"`],
    },
    {
      name: EmployeeBulkTemplateColumnName.EMPLOYMENT_TYPE,
      formulae: [`"${EMPLOYMENT_TYPES.map((item) => item.value).join(",")}"`],
    },
    {
      name: EmployeeBulkTemplateColumnName.WORK_MODEL,
      formulae: [`"${WORK_MODELS.map((item) => item.value).join(",")}"`],
    },
    {
      name: EmployeeBulkTemplateColumnName.ELIGIBILITY,
      formulae: [`"${EMPLOYMENT_ELIGIBILITIES.join(",")}"`],
    },
    {
      name: EmployeeBulkTemplateColumnName.PAYROLL_TYPE,
      formulae: [`"${ESSENTIAL_PAYROLL_TYPES.join(",")}"`],
    },
    {
      name: EmployeeBulkTemplateColumnName.PAYROLL_FREQUENCY,
      formulae: [`"${PAYROLL_FREQUENCIES.join(",")}"`],
    },
    {
      name: EmployeeBulkTemplateColumnName.EMERGENCY_CONTACT_RELATIONSHIP,
      formulae: [`"${RELATIONSHIPS.map((item) => item.value).join(",")}"`],
    },
    {
      name: EmployeeBulkTemplateColumnName.LINE_MANAGER,
      formulae: [
        `${EmployeeBulkTemplateExportSheetName.EMPLOYEES}!$A$2:$A$${REASONABLE_LIMIT_FOR_ENTITY_POPULATION}`,
      ],
    },
    {
      name: EmployeeBulkTemplateColumnName.EXCHANGE_RATE,
      formulae: [
        `${EmployeeBulkTemplateExportSheetName.EXCHANGE_RATES}!$A$2:$A$${REASONABLE_LIMIT_FOR_ENTITY_POPULATION}`,
      ],
    },
    {
      name: EmployeeBulkTemplateColumnName.MARITAL_STATUS,
      formulae: [`"${MARITAL_STATUSES.map((item) => item.value).join(",")}"`],
    },
    {
      name: EmployeeBulkTemplateColumnName.NATIONALITY,
      formulae: [
        `${EmployeeBulkTemplateExportSheetName.COUNTRIES}!$A$2:$A$${REASONABLE_LIMIT_FOR_ENTITY_POPULATION}`,
      ],
    },
    {
      name: EmployeeBulkTemplateColumnName.COUNTRY_OF_RESIDENCE,
      formulae: [
        `${EmployeeBulkTemplateExportSheetName.COUNTRIES}!$A$2:$A$${REASONABLE_LIMIT_FOR_ENTITY_POPULATION}`,
      ],
    },
    {
      name: EmployeeBulkTemplateColumnName.STATE_OF_RESIDENCE,
      formulae: [
        `${EmployeeBulkTemplateExportSheetName.STATES}!$A$2:$A$${REASONABLE_LIMIT_FOR_ENTITY_POPULATION}`,
      ],
    },
    {
      name: EmployeeBulkTemplateColumnName.LGA_OF_RESIDENCE,
      allowBlank: true,
      formulae: [
        `${EmployeeBulkTemplateExportSheetName.LOCAL_GOVERNMENTS}!$A$2:$A$${REASONABLE_LIMIT_FOR_ENTITY_POPULATION}`,
      ],
    },
    {
      name: EmployeeBulkTemplateColumnName.TIMEZONE_OF_RESIDENCE,
      formulae: [
        `${EmployeeBulkTemplateExportSheetName.TIMEZONES}!$A$2:$A$${REASONABLE_LIMIT_FOR_ENTITY_POPULATION}`,
      ],
    },
    {
      name: EmployeeBulkTemplateColumnName.BRANCH,
      formulae: [
        `${EmployeeBulkTemplateExportSheetName.BRANCHES}!$A$2:$A$${REASONABLE_LIMIT_FOR_ENTITY_POPULATION}`,
      ],
    },
    {
      name: EmployeeBulkTemplateColumnName.PAY_GRADE,
      allowBlank: true,
      formulae: [
        `${EmployeeBulkTemplateExportSheetName.PAYGRADES}!$A$2:$A$${REASONABLE_LIMIT_FOR_ENTITY_POPULATION}`,
      ],
    },
  ];
  for (
    let i = 2;
    i < REASONABLE_AMOUNT_OF_ROWS_TO_HAVE_EXCEL_CELL_VALIDATION;
    i++
  ) {
    columnFormulaMappings.forEach(({ name, formulae, allowBlank = false }) => {
      worksheet.getCell(
        `${EXCEL_COLUMN_LETTER_MAPPING?.[getIndexOfColumn(name)]}${i}`
      ).dataValidation = {
        type: "list",
        allowBlank,
        formulae,
        showErrorMessage: true,
        errorTitle: "Invalid input",
        error: "Please select a value from the dropdown",
      };
    });
  }
  Promise.resolve();
};

export const useDownloadEmployeeImportTemplate = () => {
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
const createExampleRows = (
  employees: TEmployee[] | undefined,
  exchangeRates: TExchangeRateListItem[] | undefined,
  countries: TCountry[] | undefined,
  states: TState[] | undefined,
  lgas: TLga[] | undefined,
  timezones: { label: string; value: string }[] | undefined,
  branches: TBranch[] | undefined,
  payGrades: TPayGrade[] | undefined,
  NO_OF_EXAMPLES_PROVIDED_TO_USER: number
) => {
  const createBaseRow = (
    indexIncrement: number
  ): Record<EmployeeBulkTemplateColumnName, string | undefined | null> => ({
    [EmployeeBulkTemplateColumnName.FIRST_NAME]: "Uche",
    [EmployeeBulkTemplateColumnName.LAST_NAME]: "Labidi",
    [EmployeeBulkTemplateColumnName.EMPLOYEE_ID]: `SNAP000${indexIncrement}`,
    [EmployeeBulkTemplateColumnName.LICENSE_TYPE]:
      LICENSE_TYPES?.[indexIncrement] ?? LICENSE_TYPES?.[0],
    [EmployeeBulkTemplateColumnName.EMAIL]: "uche@example.com",
    [EmployeeBulkTemplateColumnName.DATE_OF_BIRTH]: "12/28/1995",
    [EmployeeBulkTemplateColumnName.GENDER]:
      GENDERS?.[indexIncrement]?.value ?? GENDERS?.[0]?.value,
    [EmployeeBulkTemplateColumnName.PHONE_NUMBER]: "08000000000",
    [EmployeeBulkTemplateColumnName.ELIGIBILITY]:
      EMPLOYMENT_ELIGIBILITIES?.[indexIncrement] ??
      EMPLOYMENT_ELIGIBILITIES?.[0],
    [EmployeeBulkTemplateColumnName.EXCHANGE_RATE]:
      exchangeRates?.[indexIncrement]?.currency ?? exchangeRates?.[0]?.currency,
    [EmployeeBulkTemplateColumnName.MARITAL_STATUS]:
      MARITAL_STATUSES?.[indexIncrement]?.value ?? MARITAL_STATUSES?.[0]?.value,
    [EmployeeBulkTemplateColumnName.NATIONALITY]:
      countries?.[indexIncrement]?.name ?? countries?.[0]?.name,
    [EmployeeBulkTemplateColumnName.STREET_ADDRESS]:
      "no.9 James Boulevard, Victoria Island",
    [EmployeeBulkTemplateColumnName.COUNTRY_OF_RESIDENCE]:
      countries?.[indexIncrement]?.name ?? countries?.[0]?.name,
    [EmployeeBulkTemplateColumnName.STATE_OF_RESIDENCE]:
      states?.[indexIncrement]?.name ?? states?.[0]?.name,
    [EmployeeBulkTemplateColumnName.LGA_OF_RESIDENCE]:
      lgas?.[indexIncrement]?.name ?? lgas?.[0]?.name,
    [EmployeeBulkTemplateColumnName.TIMEZONE_OF_RESIDENCE]:
      timezones?.[indexIncrement]?.value ?? timezones?.[0]?.value,
    [EmployeeBulkTemplateColumnName.PASSPORT_EXPIRATION_DATE]: "12/28/2025",
    [EmployeeBulkTemplateColumnName.ALTERNATIVE_EMAIL]: "uche.alt@example.com",
    [EmployeeBulkTemplateColumnName.ALTERNATIVE_PHONE_NUMBER]: "08000000000",
    [EmployeeBulkTemplateColumnName.NIN]: "56787023555000",
    [EmployeeBulkTemplateColumnName.EMPLOYMENT_TYPE]:
      EMPLOYMENT_TYPES?.[indexIncrement]?.value ?? EMPLOYMENT_TYPES?.[0]?.value,
    [EmployeeBulkTemplateColumnName.WORK_MODEL]:
      WORK_MODELS?.[indexIncrement]?.value ?? WORK_MODELS?.[0]?.value,
    [EmployeeBulkTemplateColumnName.NO_OF_DAYS_PER_WEEK]: "5",
    [EmployeeBulkTemplateColumnName.HIRE_DATE]: "01/10/2024",
    [EmployeeBulkTemplateColumnName.START_DATE]: "01/11/2024",
    [EmployeeBulkTemplateColumnName.PROBATION_END_DATE]: "01/12/2024",
    [EmployeeBulkTemplateColumnName.CONFIRMATION_DATE]: "01/13/2024",
    [EmployeeBulkTemplateColumnName.LINE_MANAGER]:
      employees?.[indexIncrement]?.empUid ?? employees?.[0]?.empUid,
    [EmployeeBulkTemplateColumnName.BRANCH]:
      branches?.[indexIncrement]?.name ?? branches?.[0]?.name,
    [EmployeeBulkTemplateColumnName.PAYROLL_TYPE]:
      ESSENTIAL_PAYROLL_TYPES?.[indexIncrement] ?? ESSENTIAL_PAYROLL_TYPES?.[0],
    [EmployeeBulkTemplateColumnName.MONTHLY_GROSS]: `1000${indexIncrement}000`,
    [EmployeeBulkTemplateColumnName.PAY_GRADE]:
      payGrades?.[indexIncrement]?.name ?? payGrades?.[0]?.name,
    [EmployeeBulkTemplateColumnName.PAYROLL_FREQUENCY]:
      PAYROLL_FREQUENCIES?.[indexIncrement] ?? PAYROLL_FREQUENCIES?.[0],
    [EmployeeBulkTemplateColumnName.HOURLY_RATE]: "7300",
    [EmployeeBulkTemplateColumnName.EMERGENCY_CONTACT_NAME]: "Uche Okeke",
    [EmployeeBulkTemplateColumnName.EMERGENCY_CONTACT_RELATIONSHIP]:
      RELATIONSHIPS?.[indexIncrement]?.value ?? RELATIONSHIPS?.[0]?.value,
    [EmployeeBulkTemplateColumnName.EMERGENCY_CONTACT_ADDRESS]:
      "no.9 James Boulevard, Victoria Island",
    [EmployeeBulkTemplateColumnName.EMERGENCY_CONTACT_PHONE]: "08000000010",
  });

  const rows = Array(NO_OF_EXAMPLES_PROVIDED_TO_USER)
    .fill(0)
    .map((_, index) => createBaseRow(index));
  return rows;
};
