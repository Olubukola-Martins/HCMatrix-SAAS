export type TAction =
  | "disable-2fa"
  | "g-backup-codes"
  | "use-backup-codes"
  | "setup-2fa";

export interface IGetTwoFAProps {
  employeeId: number;
  isVerified: boolean;
  isDisabled: boolean;
  companyId: number;
}
