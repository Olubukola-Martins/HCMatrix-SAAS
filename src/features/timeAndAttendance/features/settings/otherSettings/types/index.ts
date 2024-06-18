export interface IOtherSettings {
  attendanceWorkFlowId: number;
  overtimeConfirmationWorkflowId: number;
  enforceGeoFencing: boolean;
  enforceStrictDistance: boolean;
  geoFencingRadius: number;
  allowSoftClocking: boolean;
  allowBiometricClocking: boolean;
  workArrangement: string;
}

export interface getOtherSettingsProps {
  active_time_tracking_policy: number;
  enforce_geo_fencing: string;
  enforce_strict_distance: string;
  geo_fencing_radius: string;
  manual_attendance_workflow: string;
  overtime_confirmation_workflow: string;
  allow_biometric_clocking: string;
  allow_soft_clocking: string;
  work_arrangement: string;
}
type TPolicyReportFrequency = "daily" | "weekly" | "monthly";
type TPolicyGracePeriod =
  | "0 minutes"
  | "10 minutes"
  | "20 minutes"
  | "30 minutes";

export type TLatenessPolicy = {
  id: number;
  gracePeriod: TPolicyGracePeriod;
  sendNotification: boolean;
  sendReport: boolean;
  reportFrequency: TPolicyReportFrequency;
  reportToRoleId: number;
  companyId: number;
  createdAt: string;
  updatedAt: string;
};

export type TAbsenteeismPolicy = {
  id: number;
  markAbsent: boolean;
  sendNotification: boolean;
  sendReport: boolean;
  reportFrequency: TPolicyReportFrequency;
  reportToRoleId: number;
  companyId: number;
  createdAt: string;
  updatedAt: string;
};
