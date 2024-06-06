import { TLicenseType } from "features/authentication/types/auth-user";
import { TEmergencyContact, TJobInfo, TPersonalInfo } from ".";

export type TBulkImportEmployeeProp = {
  firstName: string;
  lastName: string;
  email: string;
  licenseType: TLicenseType;
  empUid: string;
  personalInformation?: TPersonalInfo;
  jobInformation?: TJobInfo;
  emergencyContact?: TEmergencyContact;
};

export enum EmployeeMappingSectionEnum {
  COMPULSORY_SECTION = "Employee Information",
  PERSONAL_INFORMATION = "Personal Information",
  JOB_INFORMATION = "Job Information",

  EMERGENCY_CONTACT = "Emergency Contact",
}

export type TEmployeeMappingSectionInput = {
  name: string;
  label: string;
  optional: boolean;
  children?: TEmployeeMappingSectionInput[];
};
export type EmployeeMappingSectionKeyType =
  | "personalInformation"
  | "jobInformation"
  | "emergencyContact"
  | "employeeInformation";
export type TBulkEmployeeImportMappingSection = {
  title: EmployeeMappingSectionEnum;
  key: EmployeeMappingSectionKeyType;
  inputs: TEmployeeMappingSectionInput[];
};

export enum EmployeeBulkTemplateExportSheetName {
  MAIN_IMPORT_FILE = "MAIN IMPORT FILE",
  COUNTRIES = "Countries",
  STATES = "States",
  LOCAL_GOVERNMENTS = "Local Governments",
  TIMEZONES = "Timezones",
  BRANCHES = "Branches",
  EXCHANGE_RATES = "Exchange Rates",
  EMPLOYEES = "Employees",
  PAYGRADES = "Pay Grades",
}
export enum EmployeeBulkTemplateColumnName {
  FIRST_NAME = "First Name",
  LAST_NAME = "Last Name",
  EMPLOYEE_ID = "Employee ID",
  LICENSE_TYPE = "License Type",
  EMAIL = "Email",
  DATE_OF_BIRTH = "Date of Birth",
  GENDER = "Gender",
  PHONE_NUMBER = "Phone Number",
  ELIGIBILITY = "Eligibility",
  EXCHANGE_RATE = "Exchange Rate",
  MARITAL_STATUS = "Marital Status",
  NATIONALITY = "Nationality",
  STREET_ADDRESS = "Street Address",
  COUNTRY_OF_RESIDENCE = "Country of Residence",
  STATE_OF_RESIDENCE = "State of Residence",
  LGA_OF_RESIDENCE = "LGA of Residence",
  TIMEZONE_OF_RESIDENCE = "Timezone of Residence",
  PASSPORT_EXPIRATION_DATE = "Passport Expiration Date",
  ALTERNATIVE_EMAIL = "Alternative Email",
  ALTERNATIVE_PHONE_NUMBER = "Alternative Phone Number",
  NIN = "NIN",
  EMPLOYMENT_TYPE = "Employment Type",
  WORK_MODEL = "Work Model",
  NO_OF_DAYS_PER_WEEK = "No of Days Per Week",
  HIRE_DATE = "Hire Date",
  START_DATE = "Start Date",
  PROBATION_END_DATE = "Probation End Date",
  CONFIRMATION_DATE = "Confirmation Date",
  LINE_MANAGER = "Line Manager",
  BRANCH = "Branch",
  PAYROLL_TYPE = "Payroll Type",
  MONTHLY_GROSS = "Monthly Gross",
  PAY_GRADE = "Pay Grade",
  PAYROLL_FREQUENCY = "Payroll Frequency",
  HOURLY_RATE = "Hourly Rate",
  EMERGENCY_CONTACT_NAME = "Emergency Contact Name",
  EMERGENCY_CONTACT_RELATIONSHIP = "Emergency Contact Relationship",
  EMERGENCY_CONTACT_ADDRESS = "Emergency Contact Address",
  EMERGENCY_CONTACT_PHONE = "Emergency Contact Phone",
}
