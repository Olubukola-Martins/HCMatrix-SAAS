// VALIDATION FNS

import {
  EMPLOYMENT_ELIGIBILITIES,
  EMPLOYMENT_TYPES,
  GENDERS,
  MARITAL_STATUSES,
  MAX_NO_OF_WORKING_DAYS_PER_WEEK,
  RELATIONSHIPS,
  WORK_MODELS,
} from "constants/general";
import { TBulkEmployeeImportError } from "../../hooks/bulkImport/useValidateBulkEmployeeImportData";
import { TCountry, TEmployee } from "../../types";
import {
  TBulkImportEmployeeProp,
  EmployeeMappingSectionKeyType,
} from "../../types/bulk-import";
import { TBranch } from "features/core/branches/types";
import { TExchangeRateListItem, TPayGrade } from "features/payroll/types";
import moment from "moment";
import {
  isDateGreaterThanOrEqualToCurrentDay,
  isDateLesserThanOrEqualToCurrentDay,
  isEmailValid,
  isPhoneNumberValid,
} from "utils/formHelpers/validation";
import { PAYROLL_SCHEME_OPTIONS } from "features/payroll/constants";
import { TLga } from "types/lgas";
import { TState } from "types/states";
import { TIME_ZONES } from "constants/timeZones";
import { BULK_EMPLOYEE_IMPORT_MAPPING_SECTIONS } from "../../constants";

type TValidateProps = { employee: TBulkImportEmployeeProp; rowId: number };
// TODO: Check for optional params as they might just want to import a section and therfore don't need validation for things like firstname
export const validateBulkEmployeeInfo = (
  props: TValidateProps
): {
  isDataValid: boolean;
  errors: TBulkEmployeeImportError[];
  transformedEmployee: TBulkImportEmployeeProp;
} => {
  const { employee, rowId } = props;

  let transformedEmployee: TBulkImportEmployeeProp = employee;

  const category: EmployeeMappingSectionKeyType = "employeeInformation";
  const errors: TBulkEmployeeImportError[] = [];
  const INDENTIFIER = employee?.empUid ?? `Row ${rowId}`;
  const ACCEPTED_SELF_SERVICE_VALUES = ["Yes", "No"];
  const section = BULK_EMPLOYEE_IMPORT_MAPPING_SECTIONS.find(
    (item) => item.key === "employeeInformation"
  );
  const getConcernedInput = (inputName: string) =>
    section?.inputs.find((item) => item.name === inputName);
  // empUid
  if (
    isValueEmpty(employee?.empUid) &&
    getConcernedInput("empUid")?.optional === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER} is missing an employee ID`,
    });
  }
  // first name
  if (
    isValueEmpty(employee?.firstName) &&
    getConcernedInput("firstName")?.optional === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER} is missing a first name`,
    });
  }
  // last name
  if (
    isValueEmpty(employee?.lastName) &&
    getConcernedInput("lastName")?.optional === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER} is missing a last name`,
    });
  }
  // has self service
  if (
    isValueEmpty(employee?.hasSelfService) &&
    getConcernedInput("hasSelfService")?.optional === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER} is missing a self service value`,
    });
  }
  if (
    !isValueEmpty(employee?.hasSelfService) &&
    ACCEPTED_SELF_SERVICE_VALUES.map((item) => item.toLowerCase()).includes(
      `${(employee?.hasSelfService as unknown as string).toLowerCase()}`
    ) === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER} self service has to be one of the following ${ACCEPTED_SELF_SERVICE_VALUES.join(
        ","
      )}.`,
    });
  }
  // email
  if (
    isValueEmpty(employee?.email) &&
    getConcernedInput("email")?.optional === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER} is missing an email value`,
    });
  }
  if (
    !isValueEmpty(employee?.email) &&
    isEmailValid(employee?.email) === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER} has an invalid email address.`,
    });
  }

  transformedEmployee = {
    ...transformedEmployee,
    hasSelfService:
      `${employee?.hasSelfService}`.toLowerCase() === "yes" ? true : false,
  };
  return { isDataValid: errors.length === 0, errors, transformedEmployee };
};
export const validateBulkEmergencyContact = (
  props: TValidateProps & { countries?: TCountry[] }
): {
  isDataValid: boolean;
  errors: TBulkEmployeeImportError[];
  emergencyContact: TBulkImportEmployeeProp["emergencyContact"];
} => {
  const { employee, rowId, countries } = props;
  const category: EmployeeMappingSectionKeyType = "emergencyContact";
  const errors: TBulkEmployeeImportError[] = [];
  const INDENTIFIER = employee?.empUid ?? `Row ${rowId}`;
  const ACCEPTED_RELATIONSHIP_VALUES = RELATIONSHIPS.map((item) => item.value);
  let emergencyContact = employee?.emergencyContact;
  const section = BULK_EMPLOYEE_IMPORT_MAPPING_SECTIONS.find(
    (item) => item.key === "emergencyContact"
  );
  const getConcernedInput = (inputName: string) =>
    section?.inputs.find((item) => item.name === inputName);
  if (emergencyContact === undefined) {
    return {
      isDataValid: true,
      emergencyContact,
      errors,
    };
  }
  // fullName
  if (
    isValueEmpty(emergencyContact?.fullName) &&
    getConcernedInput("fullName")?.optional === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER} is missing full name`,
    });
  }
  // address
  if (
    isValueEmpty(emergencyContact?.address) &&
    getConcernedInput("address")?.optional === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER} is missing address`,
    });
  }
  //relationship
  if (
    isValueEmpty(emergencyContact?.relationship) &&
    getConcernedInput("relationship")?.optional === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER} is missing relationship`,
    });
  }

  if (
    !isValueEmpty(emergencyContact?.relationship) &&
    ACCEPTED_RELATIONSHIP_VALUES.map((item) => item.toLowerCase()).includes(
      `${emergencyContact?.relationship.toLowerCase()}`
    ) === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER} relationship has to be one of the following ${ACCEPTED_RELATIONSHIP_VALUES.join(
        ","
      )}.`,
    });
  }
  // Phone Number
  if (
    isValueEmpty(emergencyContact?.phoneNumber) &&
    getConcernedInput("phoneNumber")?.optional === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER} is missing phone number`,
    });
  }
  if (
    !isValueEmpty(emergencyContact?.phoneNumber) &&
    isPhoneNumberValid(emergencyContact?.phoneNumber) === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER} has an invalid phone number`,
    });
  }
  if (
    !isValueEmpty(emergencyContact?.phoneNumber) &&
    isPhoneNumberValid(emergencyContact?.phoneNumber) === true &&
    !!countries?.find(
      (item) =>
        `${item.code.toLowerCase()}` ===
        `${emergencyContact?.phoneNumber.split("-")[0]}`
    ) === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER} phone number has an incorrect country code`,
    });
  }
  emergencyContact = {
    ...emergencyContact,
    // TODO: Remove all +, like +234 from numbers before going to prod
    phoneNumber: `${emergencyContact.phoneNumber}`,
  };

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
  const { employee, rowId, employees, branches, payGrades } = props;

  const category: EmployeeMappingSectionKeyType = "jobInformation";
  const errors: TBulkEmployeeImportError[] = [];
  const INDENTIFIER = employee?.empUid ?? `Row ${rowId}`;
  const ACCEPTED_EMPLOYMENT_TYPE_VALUES = EMPLOYMENT_TYPES.map(
    (item) => item.value
  );
  const ACCEPTED_WORK_MODEL_VALUES = WORK_MODELS.map((item) => item.value);
  const ACCEPTED_PAYROLL_FREQUENCY_VALUES = ["daily", "monthly"];
  const ACCEPTED_PAYROLL_TYPE_VALUES = PAYROLL_SCHEME_OPTIONS.filter(
    (item) => item.value !== "project"
  ).map((item) => item.value);

  let jobInformation = employee?.jobInformation;
  const section = BULK_EMPLOYEE_IMPORT_MAPPING_SECTIONS.find(
    (item) => item.key === "jobInformation"
  );
  const getConcernedInput = (inputName: string) =>
    section?.inputs.find((item) => item.name === inputName);

  if (jobInformation === undefined) {
    return {
      isDataValid: true,
      jobInformation,
      errors,
    };
  }
  // startDate
  if (
    isValueEmpty(jobInformation?.startDate) &&
    getConcernedInput("startDate")?.optional === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER} is missing start date`,
    });
  }
  if (
    !isValueEmpty(jobInformation?.startDate) &&
    moment(jobInformation?.startDate).isValid() === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER}  has an invalid start date`,
    });
  }
  if (
    !isValueEmpty(jobInformation?.startDate) &&
    moment(jobInformation?.startDate).isValid() === true &&
    isDateLesserThanOrEqualToCurrentDay(moment(jobInformation?.startDate)) ===
      false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER} start date has to be lesser than or equal to today!`,
    });
  }
  // employment type
  if (
    isValueEmpty(jobInformation?.employmentType) &&
    getConcernedInput("employmentType")?.optional === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER} is missing an employment type`,
    });
  }

  if (
    !isValueEmpty(jobInformation?.employmentType) &&
    ACCEPTED_EMPLOYMENT_TYPE_VALUES.map((item) => item.toLowerCase()).includes(
      `${jobInformation?.employmentType.toLowerCase()}`
    ) === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER} employment type has to be one of the following ${ACCEPTED_EMPLOYMENT_TYPE_VALUES.join(
        ","
      )}.`,
    });
  }
  // workModel
  if (
    isValueEmpty(jobInformation?.workModel) &&
    getConcernedInput("workModel")?.optional === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER} is missing a work model`,
    });
  }

  if (
    !isValueEmpty(jobInformation?.workModel) &&
    ACCEPTED_WORK_MODEL_VALUES.map((item) => item.toLowerCase()).includes(
      `${jobInformation?.workModel.toLowerCase()}`
    ) === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER} work model has to be one of the following ${ACCEPTED_WORK_MODEL_VALUES.join(
        ","
      )}.`,
    });
  }
  // numberOfDaysPerWeek
  if (
    isValueEmpty(jobInformation?.numberOfDaysPerWeek) &&
    getConcernedInput("numberOfDaysPerWeek")?.optional === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER} is missing a number of days per week`,
    });
  }
  if (
    (!isValueEmpty(jobInformation?.numberOfDaysPerWeek) &&
      +jobInformation?.numberOfDaysPerWeek <=
        MAX_NO_OF_WORKING_DAYS_PER_WEEK) === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER}  number of days per week has to be less than or equal to ${MAX_NO_OF_WORKING_DAYS_PER_WEEK}`,
    });
  }
  // hiredate
  if (
    isValueEmpty(jobInformation?.hireDate) &&
    getConcernedInput("hireDate")?.optional === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER} is missing hire date`,
    });
  }
  if (
    !isValueEmpty(jobInformation?.hireDate) &&
    moment(jobInformation?.hireDate).isValid() === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER}  has an invalid hire date`,
    });
  }
  if (
    !isValueEmpty(jobInformation?.hireDate) &&
    moment(jobInformation?.hireDate).isValid() === true &&
    isDateLesserThanOrEqualToCurrentDay(moment(jobInformation?.hireDate)) ===
      false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER} hire date has to be lesser than or equal to today!`,
    });
  }
  if (
    !isValueEmpty(jobInformation?.hireDate) &&
    moment(jobInformation?.hireDate).isValid() === true &&
    isDateLesserThanOrEqualToCurrentDay(moment(jobInformation?.hireDate)) ===
      true &&
    moment(jobInformation?.hireDate).isSameOrBefore(
      jobInformation?.startDate
    ) === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER} hire date has to be less than or equal to start date!`,
    });
  }
  //   probation end date
  if (
    isValueEmpty(jobInformation?.probationEndDate) &&
    getConcernedInput("probationEndDate")?.optional === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER} is missing probation end date`,
    });
  }
  if (
    (!isValueEmpty(jobInformation?.probationEndDate) &&
      moment(jobInformation?.probationEndDate).isValid() === true &&
      isDateLesserThanOrEqualToCurrentDay(
        moment(jobInformation?.probationEndDate)
      ) === true &&
      moment(jobInformation?.probationEndDate).isSameOrAfter(
        jobInformation?.startDate
      ) === true) === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER} probation end date has to be greater than or equal to start date!`,
    });
  }
  //   confirmation date
  if (
    isValueEmpty(jobInformation?.confirmationDate) &&
    getConcernedInput("confirmationDate")?.optional === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER} is missing confirmation date`,
    });
  }
  if (
    (!isValueEmpty(jobInformation?.confirmationDate) &&
      moment(jobInformation?.confirmationDate).isValid() === true &&
      isDateLesserThanOrEqualToCurrentDay(
        moment(jobInformation?.confirmationDate)
      ) === true &&
      moment(jobInformation?.confirmationDate).isSameOrAfter(
        jobInformation?.probationEndDate
      ) === true) === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER} confirmation date has to be greater than or equal to probation end date date!`,
    });
  }
  // line manager
  if (
    isValueEmpty(jobInformation?.lineManagerId) &&
    getConcernedInput("lineManagerId")?.optional === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER} is missing line manager and it's a required field`,
    });
  }
  if (
    (!isValueEmpty(jobInformation?.lineManagerId) &&
      !!employees?.find(
        (item) =>
          item.empUid === (jobInformation?.lineManagerId as unknown as string)
      ) === true) === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER} no employee exists with the employee id provided!`,
    });
  }
  //   branch
  if (
    isValueEmpty(jobInformation?.branchId) &&
    getConcernedInput("branchId")?.optional === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER} is missing branch and it's a required field`,
    });
  }
  if (
    (!isValueEmpty(jobInformation?.branchId) &&
      !!branches?.find(
        (item) => item.name === (jobInformation?.branchId as unknown as string)
      ) === true) === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER} no branch exists with the branch name provided!`,
    });
  }
  //   payroll type
  if (
    isValueEmpty(jobInformation?.payrollType) &&
    getConcernedInput("payrollType")?.optional === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER} is missing payroll type and it's a required field`,
    });
  }
  if (
    !isValueEmpty(jobInformation?.payrollType) &&
    ACCEPTED_PAYROLL_TYPE_VALUES.map((item) => item.toLowerCase()).includes(
      `${jobInformation?.payrollType?.toLowerCase()}`
    ) === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER} payroll type has to be one of the following ${ACCEPTED_PAYROLL_TYPE_VALUES.join(
        ","
      )}.`,
    });
  }

  // monthly gross
  if (
    jobInformation.payrollType === "direct-salary" &&
    isValueEmpty(jobInformation?.monthlyGross) &&
    getConcernedInput("monthlyGross")?.optional === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER} is missing monthly gross and it's a required field for direct-salary payroll`,
    });
  }
  if (
    jobInformation.payrollType === "direct-salary" &&
    (!isValueEmpty(jobInformation?.monthlyGross) &&
      +jobInformation?.monthlyGross > 0) === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER}  monthly gross has to be a number greater than 0 for direct-salary payroll`,
    });
  }
  // paygrade id
  if (
    jobInformation.payrollType === "office" &&
    isValueEmpty(jobInformation?.payGradeId) &&
    getConcernedInput("payGradeId")?.optional === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER} is missing pay grade and it's a required field for office payroll`,
    });
  }
  if (
    jobInformation.payrollType === "office" &&
    (!isValueEmpty(jobInformation?.payGradeId) &&
      !!payGrades?.find(
        (item) =>
          item.name === (jobInformation?.payGradeId as unknown as string)
      ) === true) === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER} no pay grade exists with the pay grade name provided, and is required for office payroll!`,
    });
  }
  // payroll frequency
  if (
    isValueEmpty(jobInformation?.frequency) &&
    getConcernedInput("frequency")?.optional === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER} is missing payroll frequency and it's a required field`,
    });
  }

  if (
    !isValueEmpty(jobInformation?.frequency) &&
    ACCEPTED_PAYROLL_FREQUENCY_VALUES.map((item) =>
      item.toLowerCase()
    ).includes(`${jobInformation?.frequency?.toLowerCase()}`) === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER} payroll frequency has to be one of the following ${ACCEPTED_PAYROLL_FREQUENCY_VALUES.join(
        ","
      )}.`,
    });
  }
  if (
    jobInformation.payrollType === "direct-salary" &&
    !isValueEmpty(jobInformation?.frequency) &&
    getConcernedInput("frequency")?.optional === false &&
    jobInformation.frequency !== "monthly"
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER} has a direct-salary payroll and therefore the frequency has to be monthly`,
    });
  }
  if (
    jobInformation.payrollType === "office" &&
    !isValueEmpty(jobInformation?.frequency) &&
    getConcernedInput("frequency")?.optional === false &&
    jobInformation.frequency !== "monthly"
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER} has an office payroll and therefore the frequency has to be monthly`,
    });
  }

  //payroll hourly rate
  if (
    jobInformation.payrollType === "wages" &&
    isValueEmpty(jobInformation?.hourlyRate) &&
    getConcernedInput("hourlyRate")?.optional === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER} is missing payroll hourly rate and it's a required field for wages payroll type`,
    });
  }
  if (
    jobInformation.payrollType === "wages" &&
    (!isValueEmpty(jobInformation?.hourlyRate) &&
      +jobInformation?.hourlyRate > 0) === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER}  hourly rate has to be a number greater than 0 for wages payroll type`,
    });
  }

  jobInformation = {
    ...jobInformation,
    numberOfDaysPerWeek: +jobInformation?.numberOfDaysPerWeek,
    employmentType: jobInformation?.employmentType, //TODO: Perform all data that has - or requires it
    workModel: jobInformation?.workModel,
    lineManagerId: employees?.find(
      (item) =>
        item.empUid === (jobInformation?.lineManagerId as unknown as string)
    )?.id,
    branchId: branches?.find(
      (item) => item.name === (jobInformation?.branchId as unknown as string)
    )?.id,
    payrollType: jobInformation?.payrollType as unknown as
      | "office"
      | "direct-salary"
      | "wages",
    payGradeId: payGrades?.find(
      (item) => item.name === (jobInformation?.payGradeId as unknown as string)
    )?.id,
    frequency: jobInformation?.frequency,
    hourlyRate: +jobInformation?.hourlyRate,
  };

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
  const { employee, rowId, exchangeRates, countries, states, lgas } = props;

  const category: EmployeeMappingSectionKeyType = "personalInformation";
  const errors: TBulkEmployeeImportError[] = [];
  const INDENTIFIER = employee?.empUid ?? `Row ${rowId}`;
  const ACCEPTED_GENDER_VALUES = GENDERS.map((item) => item.value);
  const ACCEPTED_MARITAL_STATUS_VALUES = MARITAL_STATUSES.map(
    (item) => item.value
  );
  const ACCEPTED_EMPLOYMENT_ELIGIBILITIES_VALUES = EMPLOYMENT_ELIGIBILITIES;

  let personalInformation = employee?.personalInformation;

  const section = BULK_EMPLOYEE_IMPORT_MAPPING_SECTIONS.find(
    (item) => item.key === "personalInformation"
  );
  const getConcernedInput = (inputName: string) =>
    section?.inputs.find((item) => item.name === inputName);

  if (personalInformation === undefined) {
    return {
      isDataValid: true,
      personalInformation,
      errors,
    };
  }
  // dob
  if (
    isValueEmpty(personalInformation?.dob) &&
    getConcernedInput("dob")?.optional === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER} is missing date of birth and it's a required field`,
    });
  }
  if (
    (!isValueEmpty(personalInformation?.dob) &&
      moment(personalInformation?.dob).isValid() === true &&
      isDateLesserThanOrEqualToCurrentDay(moment(personalInformation?.dob)) ===
        true) === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER} date of birth has to be lesser than or equal today!`,
    });
  }

  // gender
  if (
    isValueEmpty(personalInformation?.gender) &&
    getConcernedInput("gender")?.optional === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER} is missing gender and it's a required field`,
    });
  }
  if (
    !isValueEmpty(personalInformation?.gender) &&
    ACCEPTED_GENDER_VALUES.map((item) => item.toLowerCase()).includes(
      `${personalInformation?.gender.toLowerCase()}`
    ) === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER} work model has to be one of the following ${ACCEPTED_GENDER_VALUES.join(
        ","
      )}.`,
    });
  }

  //phone
  if (
    isValueEmpty(personalInformation?.phoneNumber) &&
    getConcernedInput("phoneNumber")?.optional === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER} is missing phone number and it's a required field`,
    });
  }
  if (
    (!isValueEmpty(personalInformation?.phoneNumber) &&
      isPhoneNumberValid(personalInformation?.phoneNumber) === true) === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER} phone number is invalid.`,
    });
  }

  // elgibility
  if (
    isValueEmpty(personalInformation?.eligibility) &&
    getConcernedInput("eligibility")?.optional === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER} is missing eligibility and it's a required field`,
    });
  }
  if (
    !isValueEmpty(personalInformation?.eligibility) &&
    ACCEPTED_EMPLOYMENT_ELIGIBILITIES_VALUES.map((item) =>
      item.toLowerCase()
    ).includes(`${personalInformation?.eligibility.toLowerCase()}`) === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER} eligibility has to be one of the following ${ACCEPTED_EMPLOYMENT_ELIGIBILITIES_VALUES.join(
        ","
      )}.`,
    });
  }

  // exchange rate
  if (
    isValueEmpty(personalInformation?.exchangeRateId) &&
    getConcernedInput("exchangeRateId")?.optional === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER} is missing exchange rate and it's a required field`,
    });
  }
  if (
    (!isValueEmpty(personalInformation?.exchangeRateId) &&
      !!exchangeRates?.find(
        (item) =>
          item.currency ===
          (personalInformation?.exchangeRateId as unknown as string)
      ) === true) === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER} no exchange rate exists with the currency provided!`,
    });
  }

  // marital status
  if (
    isValueEmpty(personalInformation?.maritalStatus) &&
    getConcernedInput("maritalStatus")?.optional === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER} is missing marital status and it's a required field`,
    });
  }
  if (
    !isValueEmpty(personalInformation?.maritalStatus) &&
    ACCEPTED_MARITAL_STATUS_VALUES.map((item) => item.toLowerCase()).includes(
      `${personalInformation?.maritalStatus}.`.toLowerCase()
    ) === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER} marital status has to be one of the following ${ACCEPTED_MARITAL_STATUS_VALUES.join(
        ","
      )}.`,
    });
  }

  // nationality
  if (
    isValueEmpty(personalInformation?.nationality) &&
    getConcernedInput("nationality")?.optional === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER} is missing nationality and it's a required field`,
    });
  }
  if (
    (!isValueEmpty(personalInformation?.nationality) &&
      !!countries?.find(
        (item) =>
          item.name === (personalInformation?.nationality as unknown as string)
      ) === true) === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER} no nationality exists with the country name provided!`,
    });
  }
  // Address: streetAddress
  if (
    isValueEmpty(personalInformation?.address.streetAddress) &&
    getConcernedInput("streetAddress")?.optional === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER} is missing street address and it's a required field`,
    });
  }
  if (!isValueEmpty(personalInformation?.address?.streetAddress) === false) {
    errors.push({
      category,
      content: `${INDENTIFIER} has an empty street address!`,
    });
  }
  // Address: country
  if (
    isValueEmpty(personalInformation?.address.countryId) &&
    getConcernedInput("countryId")?.optional === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER} is missing country of residence and it's a required field`,
    });
  }
  const country = countries?.find(
    (item) =>
      item.name ===
      (personalInformation?.address?.countryId as unknown as string)
  );
  if (
    (!isValueEmpty(personalInformation?.address?.countryId) &&
      !!country === true) === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER} no country exists with the country name provided!`,
    });
  }
  // Address: state
  if (
    isValueEmpty(personalInformation?.address.stateId) &&
    getConcernedInput("stateId")?.optional === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER} is missing state of residence and it's a required field`,
    });
  }
  const state = states?.find(
    (item) =>
      item.name ===
        (personalInformation?.address?.stateId as unknown as string) &&
      item.countryId === country?.id
  );
  if (
    (!isValueEmpty(personalInformation?.address?.stateId) &&
      !!state === true) === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER} no state exists with the state name provided in ${country?.name}!`,
    });
  }
  // Address: lga
  if (
    isValueEmpty(personalInformation?.address.lgaId) &&
    getConcernedInput("lgaId")?.optional === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER} is missing lga of residence and it's a required field`,
    });
  }
  const lga = lgas?.find(
    (item) =>
      item.name ===
        (personalInformation?.address?.lgaId as unknown as string) &&
      item.stateId === state?.id
  );
  if (
    (!isValueEmpty(personalInformation?.address?.lgaId) && !!lga === true) ===
    false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER} no lga exists with the lga name provided in ${state?.name}!`,
    });
  }
  // Address: timezone
  if (
    isValueEmpty(personalInformation?.address.timezone) &&
    getConcernedInput("timezone")?.optional === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER} is missing timezone of residence and it's a required field`,
    });
  }
  if (
    (!isValueEmpty(personalInformation?.address?.timezone) &&
      !!TIME_ZONES?.find(
        (item) =>
          item.value ===
          (personalInformation?.address?.timezone as unknown as string)
      ) === true) === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER} no timezone exists with the timezone name provided!`,
    });
  }

  // passportExpirationDate
  if (
    isValueEmpty(personalInformation?.passportExpirationDate) &&
    getConcernedInput("passportExpirationDate")?.optional === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER} is missing passport expiration date and it's a required field`,
    });
  }

  if (
    (!isValueEmpty(personalInformation?.passportExpirationDate) &&
      moment(personalInformation?.passportExpirationDate).isValid() === true &&
      isDateGreaterThanOrEqualToCurrentDay(
        moment(personalInformation?.passportExpirationDate)
      ) === true) === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER} passport expiration date has to be greater than or equal today!`,
    });
  }

  //alternativeEmail
  if (
    isValueEmpty(personalInformation?.alternativeEmail) &&
    getConcernedInput("alternativeEmail")?.optional === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER} is missing alternative email and it's a required field`,
    });
  }
  if (
    (!isValueEmpty(personalInformation?.alternativeEmail) &&
      isEmailValid(personalInformation?.alternativeEmail ?? "") === true) ===
    false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER}  alternative email is invalid`,
    });
  }
  //alternativePhoneNumber
  if (
    isValueEmpty(personalInformation?.alternativePhoneNumber) &&
    getConcernedInput("alternativePhoneNumber")?.optional === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER} is missing alternative phone and it's a required field`,
    });
  }
  if (
    (!isValueEmpty(personalInformation?.alternativePhoneNumber) &&
      isPhoneNumberValid(personalInformation?.alternativePhoneNumber ?? "") ===
        true) === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER}  alternative phone number has to be digits`,
    });
  }
  // nin
  if (
    isValueEmpty(personalInformation?.nin) &&
    getConcernedInput("nin")?.optional === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER} is missing National Identification number and it's a required field`,
    });
  }
  if (
    (!isValueEmpty(personalInformation?.nin) &&
      isPhoneNumberValid(personalInformation?.nin ?? "") === true) === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER}  National Identification number has to be digits`,
    });
  }

  personalInformation = {
    ...personalInformation,
    exchangeRateId: exchangeRates?.find(
      (item) =>
        item.currency ===
        (personalInformation?.exchangeRateId as unknown as string)
    )?.id,
    address: {
      countryId: countries?.find(
        (item) =>
          item.name ===
          (personalInformation?.address.countryId as unknown as string)
      )?.id as number,
      stateId: states?.find(
        (item) =>
          item.name ===
          (personalInformation?.address.stateId as unknown as string)
      )?.id as number,
      lgaId: lgas?.find(
        (item) =>
          item.name ===
          (personalInformation?.address.lgaId as unknown as string)
      )?.id as number,
      streetAddress: personalInformation.address.streetAddress,
      timezone: personalInformation.address.timezone,
    },
  };

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
