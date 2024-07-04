import { TAddress } from "types/address";

export type TBranch = {
  id: number;
  name: string;
  description: string;
  address: TAddress;
  addressId: number;
  companyId: number;
  employeeCount: number;
  parentBranchId?: number | null;
  parentBranch?: TBranch | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  childBranches?: Omit<TBranch, "address">[];
};

export interface TCreateBranchProps {
  name: string;
  description: string;
  address: TAddress;
}
