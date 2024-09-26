import { TBulkEmployeeImportError } from "../../hooks/bulkImport/useValidateBulkEmployeeImportData";
import { TCountry, TEmployee } from "../../types";
import {
  TBulkImportEmployeeProp,
  EmployeeMappingSectionKeyType,
} from "../../types/bulk-import";
import { TBranch } from "features/core/branches/types";
import { TExchangeRateListItem, TPayGrade } from "features/payroll/types";
import { isEmailValid } from "utils/formHelpers/validation";
import { TLga } from "types/lgas";
import { TState } from "types/states";
import { BULK_EMPLOYEE_IMPORT_MAPPING_SECTIONS } from "../../constants";
import { TLicenseType } from "features/authentication/types/auth-user";
import { personalInfoValidationSchema } from "./validation/personal-information";
import { ZodError } from "zod";
import { emergencyContactValidationSchema } from "./validation/emergency-contact";
import { jobInformationValidationSchema } from "./validation/job-information";
import { employeeInformationValidationSchema } from "./validation/employee-information";

type TValidateProps = { employee: TBulkImportEmployeeProp; rowId: number };
export const validateBulkEmployeeInfo = (
  props: TValidateProps
): {
  isDataValid: boolean;
  errors: TBulkEmployeeImportError[];
  transformedEmployee: TBulkImportEmployeeProp;
} => {
  const { employee, rowId } = props;

  let transformedEmployee: Pick<
    TBulkImportEmployeeProp,
    "email" | "empUid" | "firstName" | "lastName" | "licenseType"
  > = employee;

  const category: EmployeeMappingSectionKeyType = "employeeInformation";
  const errors: TBulkEmployeeImportError[] = [];
  const INDENTIFIER = employee?.empUid ?? `Row ${rowId}`;
  const schema = employeeInformationValidationSchema();

  try {
    const parsedEmployee = schema.parse(transformedEmployee);
    transformedEmployee = {
      ...parsedEmployee,
      licenseType:
        parsedEmployee.licenseType as TBulkImportEmployeeProp["licenseType"],
    };
  } catch (error) {
    if (error instanceof ZodError) {
      const validationErrors = error.issues.map((issue) => ({
        content: `${INDENTIFIER}: ${issue.path.join(",")} - ${
          issue.message
        }. Value provided ${
          transformedEmployee?.[
            issue.path?.[0] as keyof typeof transformedEmployee
          ]
        }`,
        category,
      }));
      errors.push(...validationErrors);
    } else {
    }
  }

  return { isDataValid: errors.length === 0, errors, transformedEmployee };
};
export const validateBulkEmergencyContact = (
  props: TValidateProps & { countries?: TCountry[] }
): {
  isDataValid: boolean;
  errors: TBulkEmployeeImportError[];
  emergencyContact: TBulkImportEmployeeProp["emergencyContact"];
} => {
  const { employee, rowId } = props;
  const INDENTIFIER = employee?.empUid ?? `Row ${rowId}`;
  const category: EmployeeMappingSectionKeyType = "emergencyContact";
  const errors: TBulkEmployeeImportError[] = [];

  let emergencyContact = employee?.emergencyContact;

  if (emergencyContact === undefined) {
    return {
      isDataValid: true,
      emergencyContact,
      errors,
    };
  }
  const schema = emergencyContactValidationSchema(props);
  try {
    emergencyContact = schema.parse(emergencyContact);
  } catch (error) {
    if (error instanceof ZodError) {
      const validationErrors = error.issues.map((issue) => ({
        content: `${INDENTIFIER}: ${issue.path.join(",")} - ${
          issue.message
        }. Value provided ${
          emergencyContact?.[issue.path?.[0] as keyof typeof emergencyContact]
        }`,
        category,
      }));
      errors.push(...validationErrors);
    } else {
    }
  }

  return { isDataValid: errors.length === 0, errors, emergencyContact };
};
export const validateBulkJobInformation = (
  props: TValidateProps & {
    employees?: TEmployee[];
    branches?: TBranch[];
    payGrades?: TPayGrade[];
  }
): {
  isDataValid: boolean;
  errors: TBulkEmployeeImportError[];
  jobInformation: TBulkImportEmployeeProp["jobInformation"];
} => {
  const { employee, rowId } = props;

  const category: EmployeeMappingSectionKeyType = "jobInformation";
  const errors: TBulkEmployeeImportError[] = [];
  const INDENTIFIER = employee?.empUid ?? `Row ${rowId}`;

  let jobInformation = employee?.jobInformation;

  if (jobInformation === undefined) {
    return {
      isDataValid: true,
      jobInformation,
      errors,
    };
  }

  // jobInformationValidationSchema
  const schema = jobInformationValidationSchema(props);
  try {
    jobInformation = schema.parse(
      jobInformation
    ) as TBulkImportEmployeeProp["jobInformation"];
  } catch (error) {
    if (error instanceof ZodError) {
      const validationErrors = error.issues.map((issue) => ({
        content: `${INDENTIFIER}: ${issue.path.join(",")} - ${
          issue.message
        }. Value provided ${
          jobInformation?.[issue.path?.[0] as keyof typeof jobInformation]
        }`,
        category,
      }));
      errors.push(...validationErrors);
    } else {
    }
  }

  return { isDataValid: errors.length === 0, errors, jobInformation };
};

export const validateBulkPersonalInformation = (
  props: TValidateProps & {
    exchangeRates?: TExchangeRateListItem[];
    countries?: TCountry[];
    states?: TState[];
    lgas?: TLga[];
  }
): {
  isDataValid: boolean;
  errors: TBulkEmployeeImportError[];
  personalInformation: TBulkImportEmployeeProp["personalInformation"];
} => {
  const { employee, rowId } = props;

  const category: EmployeeMappingSectionKeyType = "personalInformation";
  const errors: TBulkEmployeeImportError[] = [];
  const INDENTIFIER = employee?.empUid ?? `Row ${rowId}`;

  let personalInformation = employee?.personalInformation;

  if (personalInformation === undefined) {
    return {
      isDataValid: true,
      personalInformation,
      errors,
    };
  }

  const schema = personalInfoValidationSchema(props);
  try {
    personalInformation = schema.parse(
      personalInformation
    ) as TBulkImportEmployeeProp["personalInformation"];

    delete (personalInformation as unknown as any)["address"]; //done because backend does not accept address in bulk import as of the time of writing this code
  } catch (error) {
    if (error instanceof ZodError) {
      const validationErrors = error.issues.map((issue) => ({
        content: `${INDENTIFIER}: ${issue.path.join(",")} - ${
          issue.message
        }. Value provided ${
          personalInformation?.[
            issue.path?.[0] as keyof typeof personalInformation
          ] ??
          personalInformation?.[
            issue.path?.[0] as keyof typeof personalInformation
          ]
        }`,
        category,
      }));
      errors.push(...validationErrors);
    } else {
    }
  }
  return { isDataValid: errors.length === 0, errors, personalInformation };
};

// HELPERS FNS

const isValueEmpty = (value: unknown): boolean => {
  if (
    value === undefined ||
    value === null ||
    (value as string)?.length === 0 ||
    (value as number)?.toString().length === 0
  ) {
    return true;
  }
  return false;
};
