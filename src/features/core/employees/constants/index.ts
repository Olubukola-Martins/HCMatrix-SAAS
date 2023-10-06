import {
  EmployeeMappingSectionEnum,
  TBulkEmployeeImportMappingSection,
} from "../types/bulk-import";

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
      { name: "firstName", label: "First Name", optional: true },
      { name: "lastName", label: "Last Name", optional: true },
      { name: "email", label: "Email", optional: true },
      { name: "hasSelfService", label: "Self Service", optional: true },
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
        { name: "dob", label: "Date of Birth" },
        { name: "gender", label: "Gender" },

        { name: "phoneNumber", label: "Phone Number" },
        { name: "eligibility", label: "Eligibility" },
        { name: "exchangeRateId", label: "Exchange Rate" },
        { name: "maritalStatus", label: "Marital Status" },
        { name: "nationality", label: "Nationality" },
        // ADDRESS
        {
          name: "streetAddress",
          label: "Street Address",
        },
        {
          name: "countryId",
          label: "Country of Residence",
        },
        {
          name: "stateId",
          label: "State of Residence",
        },
        {
          name: "lgaId",
          label: "LGA of Residence",
          optional: true,
        },
        {
          name: "timeZone",
          label: "Time Zone of Residence",
        },
        // ADDRESS

        {
          name: "passportExpirationDate",
          label: "Passport Expiration Date",
          optional: true,
        },
        // { User can't bulk upload this
        //   name: "validDocumentUrl",
        //   label: "Valid Document Url",
        //   optional: true,
        // },
        { name: "alternativeEmail", label: "Alternative Email" },
        {
          name: "alternativePhoneNumber",
          label: "Alternative Phone Number",
        },
        { name: "nin", label: "National Identity Number" },
      ],
    },
    {
      title: EmployeeMappingSectionEnum.EMERGENCY_CONTACT,
      key: "emergencyContact",
      inputs: [
        { name: "fullName", label: "Full Name" },
        { name: "address", label: "Address" },
        { name: "relationship", label: "Relationship" },
        { name: "phoneNumber", label: "Phone Number" },
      ],
    },
    {
      title: EmployeeMappingSectionEnum.JOB_INFORMATION,
      key: "jobInformation",
      inputs: [
        { name: "startDate", label: "Start Date" },
        { name: "employmentType", label: "employment Type" },
        { name: "workModel", label: "work Model" },
        { name: "numberOfDaysPerWeek", label: "number Of Days Per Week" },
        { name: "hireDate", label: "hire Date" },
        { name: "probationEndDate", label: "probation End Date" },
        { name: "confirmationDate", label: "confirmation Date" },
        { name: "lineManagerId", label: "line Manager" },
        { name: "branchId", label: "branch" },
        { name: "payrollType", label: "payroll Type" },
        { name: "monthlyGross", label: "monthly Gross" },
        { name: "payGradeId", label: "payGrade" },
        { name: "frequency", label: "frequency" },
        { name: "hourlyRate", label: "Hourly Rate" },
      ],
    },
  ];
