export interface locationProps {
  id: number;
  branchId: number;
  biometricDeviceId: number;
  biometricDevice: {
    name: string;
  };
  branch: {
    name: string;
  };
}
