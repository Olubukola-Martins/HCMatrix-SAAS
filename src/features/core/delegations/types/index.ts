import { TEmployee } from "features/core/employees/types";
import { TPermission } from "features/core/roles-and-permissions/types";

export type TDelegation = {
  id: number;
  delegator: TEmployee;
  delegatee: TEmployee;
  startDate: string;
  endDate: string;
  permissions: TPermission[];
  description: string;
};
