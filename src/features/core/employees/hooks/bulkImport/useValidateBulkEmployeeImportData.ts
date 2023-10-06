import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";
import {
  EmployeeMappingSectionKeyType,
  TBulkImportEmployeeProp,
} from "../../types/bulk-import";
import { pluralOrSingular } from "utils/dataHelpers/pluralOrSingular";
import { useFetchCountries } from "hooks/useFetchCountries";
import { TCountry } from "types/country";
import { RELATIONSHIPS } from "constants/general";
import {
  validateBulkEmergencyContact,
  validateBulkEmployeeInfo,
  validateBulkJobInformation,
} from "../../utils/bulk-import";
import { TEmployee } from "../../types";
import { TBranch } from "features/core/branches/types";
import { TPayGrade } from "features/payroll/types";
import { useFetchEmployees } from "../useFetchEmployees";
import { useFetchBranches } from "features/core/branches/hooks/useFetchBranches";
import { useGetPayGrades } from "features/payroll/hooks/payGrades/useGetPayGrades";

type TData = {
  dataToBeSubmitted: TBulkImportEmployeeProp[];
};
export type TBulkEmployeeImportError = {
  content: string;
  category: EmployeeMappingSectionKeyType;
};

type TDependencies = {
  countries?: TCountry[];
  employees?: TEmployee[];
  branches?: TBranch[];
  payGrades?: TPayGrade[];
};
const validateData = async (props: {
  data: TData;
  auth: ICurrentCompany;
  dependencies: TDependencies;
}): Promise<{
  isDataValid: boolean;
  errors: TBulkEmployeeImportError[];
  message: string;
  employees: TBulkImportEmployeeProp[];
}> => {
  const { data, dependencies } = props;
  const { dataToBeSubmitted } = data;

  //   dependcies
  const {
    countries,
    branches,
    employees: employeeFetchedData,
    payGrades,
  } = dependencies;

  const employees: TBulkImportEmployeeProp[] = [];
  let errors: TBulkEmployeeImportError[] = [];

  //   This Data will just be to create AND NOT update for the time being
  try {
    dataToBeSubmitted.forEach((employee, i) => {
      let transformedEmployee: TBulkImportEmployeeProp = employee;
      let rowId = i + 2; //becos first row is the header

      // validate employee info
      let validateEmpInfo = validateBulkEmployeeInfo({ employee, rowId });
      if (validateEmpInfo.isDataValid === false) {
        errors = [...errors, ...validateEmpInfo.errors];
      }
      transformedEmployee = {
        ...transformedEmployee,
        ...validateEmpInfo.transformedEmployee,
      };
      // validate employee emergency contact
      let validateEmergencyContact = validateBulkEmergencyContact({
        employee,
        rowId,
        countries,
      });
      if (validateEmergencyContact.isDataValid === false) {
        errors = [...errors, ...validateEmergencyContact.errors];
      }
      transformedEmployee = {
        ...transformedEmployee,
        emergencyContact: validateEmergencyContact.emergencyContact,
      };
      // validate employee job info
      let validateJobInformation = validateBulkJobInformation({
        employee,
        rowId,
        branches,
        employees: employeeFetchedData,
        payGrades,
      });
      if (validateJobInformation.isDataValid === false) {
        errors = [...errors, ...validateJobInformation.errors];
      }
      transformedEmployee = {
        ...transformedEmployee,
        jobInformation: validateJobInformation.jobInformation,
      };
      // validate employee personal info

      //   push to employees
      employees.push(transformedEmployee);
    });

    return {
      isDataValid: errors.length === 0,
      errors,
      message: `The Data import has ${pluralOrSingular({
        amount: errors.length,
        plural: "errors",
        singular: "error",
      })}`,
      employees,
    };
  } catch (error) {
    console.log(error, "WHY");
    // TODO: Need to flesh out adequately
    return {
      isDataValid: false,
      errors,
      message: "An error occured",
      employees,
    };
  }
};

export const useValidateBulkEmployeeImportData = () => {
  const { token, companyId } = useApiAuth();
  const { data: countries } = useFetchCountries();
  const { data: employees } = useFetchEmployees({
    pagination: { limit: 500, offset: 0 },
  });
  const { data: branches } = useFetchBranches({
    pagination: { limit: 500, offset: 0 },
  });
  const { data: payGrades } = useGetPayGrades({
    pagination: { limit: 500, offset: 0 },
  });
  //   TODO: Refactor to be the actual mutate returned, so you can block until the other hooks get data
  return useMutation(
    (props: TData) =>
      validateData({
        data: props,
        dependencies: {
          countries,
          employees: employees?.data,
          branches: branches?.data,
          payGrades: payGrades?.data,
        },

        auth: { token, companyId },
      }),
    {}
  );
};
