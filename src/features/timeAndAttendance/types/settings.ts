export interface IClockInPolicy {
  companyId: number;
  adminId: number;
  isSoftClockIn: boolean;
  isBiometricClockIn: boolean;
  biometricDevices: BiometricDevice[];
  token: string;
}

interface BiometricDevice {
  name: string;
  companyId: number;
  serialNumber: number;
}
