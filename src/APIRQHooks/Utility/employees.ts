import { useMutation } from "react-query";
import { createEmployee, employeeInvite } from "../../ApiRequesHelpers/Utility/employee";

export const useCreateEmployee = () => {
  return useMutation(createEmployee);
};

export const useInviteEmployees = () => {
  return useMutation(employeeInvite);
};

