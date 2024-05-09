import { TLicenseType } from "features/authentication/types/auth-user";
import { TEmployeeStatus } from "../types";
import {
  EmployeeMappingSectionEnum,
  TBulkEmployeeImportMappingSection,
} from "../types/bulk-import";

export const LICENSE_TYPES: TLicenseType[] = [
  "licensed",
  "unlicensed",
  "deactivated",
];
export const LICENSE_TYPES_OPTIONS = LICENSE_TYPES.map((item) => ({
  label: item,
  value: item,
}));
export const EMPLOYEE_STATUSES: TEmployeeStatus[] = [
  "confirmed",
  "terminated",
  "suspended",
  "probation",
];
export const EMPLOYEE_STATUSES_OPTIONS = EMPLOYEE_STATUSES.map((item) => ({
  label: item,
  value: item,
}));
export const EMPLOYEE_BULK_IMPORT_STEPS = [
  "Upload File",
  "Mapping details",
  "Data Verification",
  "Confirmation",
];

const COMPULSORY_BULK_MAPPING_SECTION_FOR_EMPLOYEE_INFO: TBulkEmployeeImportMappingSection =
  {
    title: EmployeeMappingSectionEnum.COMPULSORY_SECTION,
    key: "employeeInformation",
    inputs: [
      { name: "firstName", label: "First Name", optional: false },
      { name: "lastName", label: "Last Name", optional: false },
      { name: "email", label: "Email", optional: false },
      { name: "licenseType", label: "License Type", optional: true },
      { name: "empUid", label: "Employee ID", optional: false }, //Cos this is the unique key for import
    ],
  };
export const BULK_EMPLOYEE_IMPORT_MAPPING_SECTIONS: TBulkEmployeeImportMappingSection[] =
  [
    COMPULSORY_BULK_MAPPING_SECTION_FOR_EMPLOYEE_INFO,
    {
      title: EmployeeMappingSectionEnum.PERSONAL_INFORMATION,
      key: "personalInformation",
      inputs: [
        { name: "dob", label: "Date of Birth", optional: false },
        { name: "gender", label: "Gender", optional: false },

        { name: "phoneNumber", label: "Phone Number", optional: false },
        { name: "eligibility", label: "Eligibility", optional: false },
        { name: "exchangeRateId", label: "Exchange Rate", optional: true },
        { name: "maritalStatus", label: "Marital Status", optional: false },
        { name: "nationality", label: "Nationality", optional: false },
        // ADDRESS
        {
          name: "streetAddress",
          label: "Street Address",
          optional: false,
        },
        {
          name: "countryId",
          label: "Country of Residence",
          optional: false,
        },
        {
          name: "stateId",
          label: "State of Residence",
          optional: false,
        },
        {
          name: "lgaId",
          label: "LGA of Residence",
          optional: false,
        },
        {
          name: "timeZone",
          label: "Time Zone of Residence",
          optional: true,
        },
        // ADDRESS

        {
          name: "passportExpirationDate",
          label: "Passport Expiration Date",
          optional: false,
        },
        // { User can't bulk upload this
        //   name: "validDocumentUrl",
        //   label: "Valid Document Url",
        //   optional: true,
        // },
        {
          name: "alternativeEmail",
          label: "Alternative Email",
          optional: true,
        },
        {
          name: "alternativePhoneNumber",
          label: "Alternative Phone Number",
          optional: true,
        },
        { name: "nin", label: "National Identity Number", optional: false },
      ],
    },
    {
      title: EmployeeMappingSectionEnum.EMERGENCY_CONTACT,
      key: "emergencyContact",
      inputs: [
        { name: "fullName", label: "Full Name", optional: false },
        { name: "address", label: "Address", optional: false },
        { name: "relationship", label: "Relationship", optional: false },
        { name: "phoneNumber", label: "Phone Number", optional: false },
      ],
    },
    {
      title: EmployeeMappingSectionEnum.JOB_INFORMATION,
      key: "jobInformation",
      inputs: [
        { name: "startDate", label: "Start Date", optional: false },
        { name: "employmentType", label: "employment Type", optional: false },
        { name: "workModel", label: "work Model", optional: false },
        {
          name: "numberOfDaysPerWeek",
          label: "number Of Days Per Week",
          optional: false,
        },
        { name: "hireDate", label: "hire Date", optional: false },
        {
          name: "probationEndDate",
          label: "probation End Date",
          optional: false,
        },
        {
          name: "confirmationDate",
          label: "confirmation Date",
          optional: false,
        },
        { name: "lineManagerId", label: "line Manager", optional: true },
        { name: "branchId", label: "branch", optional: false },
        { name: "payrollType", label: "payroll Type", optional: false },
        { name: "monthlyGross", label: "monthly Gross", optional: false },
        { name: "payGradeId", label: "payGrade", optional: true },
        { name: "frequency", label: "frequency", optional: false },
        { name: "hourlyRate", label: "Hourly Rate", optional: true },
      ],
    },
  ];
