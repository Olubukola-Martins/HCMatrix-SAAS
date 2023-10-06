// VALIDATION FNS

import {
  EMPLOYMENT_ELIGIBILITIES,
  EMPLOYMENT_TYPES,
  GENDERS,
  MARITAL_STATUSES,
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
} from "utils/formHelpers/validation";
import { TPayrollSchemeType } from "features/payroll/types/payrollSchemes";
import { PAYROLL_SCHEME_OPTIONS } from "features/payroll/constants";

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
  if (isValueEmpty(employee?.empUid)) {
    errors.push({
      category,
      content: `${INDENTIFIER} is missing an employee ID`,
    });
  }

  if (isValueEmpty(employee?.firstName)) {
    errors.push({
      category,
      content: `${INDENTIFIER} is missing a first name`,
    });
  }
  if (isValueEmpty(employee?.lastName)) {
    errors.push({
      category,
      content: `${INDENTIFIER} is missing a last name`,
    });
  }
  if (isValueEmpty(employee?.hasSelfService)) {
    errors.push({
      category,
      content: `${INDENTIFIER} is missing a self service value`,
    });
  }
  if (
    !isValueEmpty(employee?.hasSelfService) &&
    ACCEPTED_SELF_SERVICE_VALUES.map((item) => item.toLowerCase()).includes(
      `${employee?.hasSelfService}.`.toLowerCase()
    ) === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER} self service has to be one of the following ${ACCEPTED_SELF_SERVICE_VALUES.join(
        ","
      )}.`,
    });
  }
  if (isValueEmpty(employee?.email)) {
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
  if (emergencyContact === undefined) {
    return {
      isDataValid: true,
      emergencyContact,
      errors,
    };
  }
  if (typeof countries === "undefined") {
    errors.push({
      category,
      content: "Unable to retrieve countries, contact HcMatrix System Support",
    });
    return {
      isDataValid: false,
      emergencyContact,
      errors,
    };
  }
  if (isValueEmpty(emergencyContact?.fullName)) {
    errors.push({
      category,
      content: `${INDENTIFIER} is missing full name`,
    });
  }
  if (isValueEmpty(emergencyContact?.address)) {
    errors.push({
      category,
      content: `${INDENTIFIER} is missing address`,
    });
  }

  if (isValueEmpty(emergencyContact?.relationship)) {
    errors.push({
      category,
      content: `${INDENTIFIER} is missing relationship`,
    });
  }

  if (
    !isValueEmpty(emergencyContact?.relationship) &&
    ACCEPTED_RELATIONSHIP_VALUES.map((item) => item.toLowerCase()).includes(
      `${emergencyContact?.relationship}.`.toLowerCase()
    ) === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER} relationship has to be one of the following ${ACCEPTED_RELATIONSHIP_VALUES.join(
        ","
      )}.`,
    });
  }
  if (isValueEmpty(emergencyContact?.phoneNumber)) {
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
    !!countries.find(
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
  const MAX_NO_OF_DAYS_PER_WEEK = 7;

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
  if (jobInformation === undefined) {
    return {
      isDataValid: true,
      jobInformation,
      errors,
    };
  }

  if (isValueEmpty(jobInformation?.startDate)) {
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

  if (isValueEmpty(jobInformation?.employmentType)) {
    errors.push({
      category,
      content: `${INDENTIFIER} is missing an employment type`,
    });
  }

  if (
    !isValueEmpty(jobInformation?.employmentType) &&
    ACCEPTED_EMPLOYMENT_TYPE_VALUES.map((item) =>
      item.toLowerCase().split("-").join(" ")
    ).includes(`${jobInformation?.employmentType}.`) === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER} employment type has to be one of the following ${ACCEPTED_EMPLOYMENT_TYPE_VALUES.join(
        ","
      )}.`,
    });
  }

  if (isValueEmpty(jobInformation?.workModel)) {
    errors.push({
      category,
      content: `${INDENTIFIER} is missing a work model`,
    });
  }

  if (
    !isValueEmpty(jobInformation?.workModel) &&
    ACCEPTED_EMPLOYMENT_TYPE_VALUES.map((item) =>
      item.toLowerCase().split(" ").join("-")
    ).includes(`${jobInformation?.workModel}.`.toLowerCase()) === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER} work model has to be one of the following ${ACCEPTED_WORK_MODEL_VALUES.join(
        ","
      )}.`,
    });
  }
  if (isValueEmpty(jobInformation?.numberOfDaysPerWeek)) {
    errors.push({
      category,
      content: `${INDENTIFIER} is missing a number of days per week`,
    });
  }
  if (
    !isValueEmpty(jobInformation?.numberOfDaysPerWeek) &&
    +jobInformation?.numberOfDaysPerWeek <= MAX_NO_OF_DAYS_PER_WEEK
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER}  number of days per week has to be less than or equal to ${MAX_NO_OF_DAYS_PER_WEEK}`,
    });
  }

  if (isValueEmpty(jobInformation?.hireDate)) {
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
    !isValueEmpty(jobInformation?.payrollType) &&
    ACCEPTED_PAYROLL_TYPE_VALUES.map((item) =>
      item.toLowerCase().split(" ").join("-")
    ).includes(`${jobInformation?.payrollType}.`.toLowerCase()) === false
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
    (!isValueEmpty(jobInformation?.monthlyGross) &&
      +jobInformation?.monthlyGross > 0) === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER}  monthly gross has to be a number greater than 0`,
    });
  }
  // paygrade id
  if (
    (!isValueEmpty(jobInformation?.payGradeId) &&
      !!payGrades?.find(
        (item) =>
          item.name === (jobInformation?.payGradeId as unknown as string)
      ) === true) === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER} no pay grade exists with the pay grade name provided!`,
    });
  }
  // frequency
  if (
    !isValueEmpty(jobInformation?.frequency) &&
    ACCEPTED_PAYROLL_FREQUENCY_VALUES.map((item) =>
      item.toLowerCase().split(" ").join("-")
    ).includes(`${jobInformation?.frequency}.`.toLowerCase()) === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER} payroll frequency has to be one of the following ${ACCEPTED_PAYROLL_FREQUENCY_VALUES.join(
        ","
      )}.`,
    });
  }

  // hourly rate
  if (
    (!isValueEmpty(jobInformation?.hourlyRate) &&
      +jobInformation?.hourlyRate > 0) === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER}  hourly rate has to be a number greater than 0`,
    });
  }

  jobInformation = {
    ...jobInformation,
    numberOfDaysPerWeek: +jobInformation?.numberOfDaysPerWeek,
    employmentType: jobInformation?.employmentType.split(" ").join("-"), //TODO: Perform all data that has - or requires it
    workModel: jobInformation?.workModel.split(" ").join("-"),
    lineManagerId: employees?.find(
      (item) =>
        item.empUid === (jobInformation?.lineManagerId as unknown as string)
    )?.id,
    branchId: branches?.find(
      (item) => item.name === (jobInformation?.branchId as unknown as string)
    )?.id,
    payrollType: jobInformation?.payrollType
      ?.split(" ")
      .join("-") as unknown as "office" | "direct-salary" | "wages",
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
  }
): {
  isDataValid: boolean;
  errors: TBulkEmployeeImportError[];
  personalInformation: TBulkImportEmployeeProp["personalInformation"];
} => {
  const { employee, rowId, exchangeRates, countries } = props;

  const category: EmployeeMappingSectionKeyType = "personalInformation";
  const errors: TBulkEmployeeImportError[] = [];
  const INDENTIFIER = employee?.empUid ?? `Row ${rowId}`;
  const ACCEPTED_GENDER_VALUES = GENDERS.map((item) => item.value);
  const ACCEPTED_MARITAL_STATUS_VALUES = MARITAL_STATUSES.map(
    (item) => item.value
  );
  const ACCEPTED_EMPLOYMENT_ELIGIBILITIES_VALUES = EMPLOYMENT_ELIGIBILITIES;

  let personalInformation = employee?.personalInformation;
  if (personalInformation === undefined) {
    return {
      isDataValid: true,
      personalInformation,
      errors,
    };
  }
  // dob

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
    !isValueEmpty(personalInformation?.gender) &&
    ACCEPTED_GENDER_VALUES.map((item) =>
      item.toLowerCase().split(" ").join("-")
    ).includes(`${personalInformation?.gender}.`.toLowerCase()) === false
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
    !isValueEmpty(personalInformation?.eligibility) &&
    ACCEPTED_EMPLOYMENT_ELIGIBILITIES_VALUES.map((item) =>
      item.toLowerCase().split(" ").join("-")
    ).includes(`${personalInformation?.eligibility}.`.toLowerCase()) === false
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
    !isValueEmpty(personalInformation?.maritalStatus) &&
    ACCEPTED_MARITAL_STATUS_VALUES.map((item) =>
      item.toLowerCase().split(" ").join("-")
    ).includes(`${personalInformation?.maritalStatus}.`.toLowerCase()) === false
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
    (!isValueEmpty(personalInformation?.nationality) &&
      !!countries?.find(
        (item) =>
          item.name === (personalInformation?.nationality as unknown as string)
      ) === true) === false
  ) {
    errors.push({
      category,
      content: `${INDENTIFIER} no employee exists with the employee id provided!`,
    });
  }

  // passportExpirationDate

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

const isEmailValid = (val: string): boolean => {
  // Regular expression pattern to match a valid email address
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  // Test the provided value against the pattern
  return emailPattern.test(val);
};
const isPhoneNumberValid = (val: string): boolean => {
  // Regular expression pattern to match a valid North American phone number with dashes
  const phonePattern = /^[0-9]*$/;

  // Test the provided value against the pattern
  return phonePattern.test(val);
};
