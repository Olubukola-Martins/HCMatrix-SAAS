import { TEmployee } from "features/core/employees/types";
import { TPermissionInDelegation } from "features/core/roles-and-permissions/types";

export type TDelegation = {
  id: number;
  delegator: TEmployee;
  delegatee: TEmployee;
  startDate: string;
  endDate: string;
  permissions: TPermissionInDelegation[];
  description: string;
};
