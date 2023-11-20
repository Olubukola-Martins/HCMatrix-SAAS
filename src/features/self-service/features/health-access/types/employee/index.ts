import { TEmployeeHealthAccess } from "./list";
import { TSingleEmployeeHealthAccess } from "./single";

type TEmployeeMedicalHistory =
  | "current-condition"
  | "past-condition"
  | "sugeries"
  | "family-history"
  | "medication"
  | "allergy";
export {
  type TSingleEmployeeHealthAccess,
  type TEmployeeHealthAccess,
  type TEmployeeMedicalHistory,
};
