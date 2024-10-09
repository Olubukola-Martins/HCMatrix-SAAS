import { GENDERS, MARITAL_STATUSES } from "constants/general";
import { TEmployeeStatus } from "features/core/employees/types";

export const LEAVE_TYPE_CATEGORIES = ["annual", "casual", "normal"] as const;
export interface TLeaveType {
  id: number;
  name: string;
  label: string;
  category: (typeof LEAVE_TYPE_CATEGORIES)[number];
  length: number | "spillover" | "grade";
  typeOfLength: "fixed" | "dynamic";
  employeesGetAllowance: boolean;
  calculation: string;
  percentageAmount: number;

  requireReliever: boolean;
  applicableToCertainGroup: boolean;
  groupId?: number | null;

  gender?: (typeof GENDERS)[number]["value"] | null;
  maritalStatus?: (typeof MARITAL_STATUSES)[number]["value"] | null;
  employeeStatus?: TEmployeeStatus;
  isActive: boolean;
  companyId: number;
  createdAt: string;
  updatedAt: string;
}
