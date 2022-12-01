import { useMutation } from "react-query";
import { createEmployee } from "../../ApiRequesHelpers/Utility/employee";

export const useCreateEmployee = () => {
  return useMutation(createEmployee);
};
