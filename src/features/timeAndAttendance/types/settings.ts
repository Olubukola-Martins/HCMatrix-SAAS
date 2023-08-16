import { ICurrentCompany } from "types";

export interface IClockInPolicy extends ICurrentCompany {
  adminId: number;
  isSoftClockIn: boolean;
  isBiometricClockIn: boolean;
  biometricDevices: BiometricDevice[];
}

interface BiometricDevice {
  name: string;
  companyId: number;
  serialNumber: number;
}
