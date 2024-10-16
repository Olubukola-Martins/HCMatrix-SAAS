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
