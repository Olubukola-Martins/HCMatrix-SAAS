import { IModalProps } from "types";

export type TAction =
  | "disable-2fa"
  | "g-backup-codes"
  | "use-backup-codes"
  | "setup-2fa"
  | "list-backup-codes";

export interface IGetTwoFAProps {
  employeeId: number;
  isVerified: boolean;
  isDisabled: boolean;
  companyId: number;
}

export interface DoublePropTwoFA extends IModalProps {
  setAction: (action: TAction) => void;
  image?: string;
  backupCodes?: string[];
}
