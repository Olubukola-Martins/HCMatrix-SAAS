export interface IOtherSettings {
  attendanceWorkFlowId: number;
  overtimeConfirmationWorkflowId: number;
  longitude: string;
  latitude: string;
  enforceGeoFencing: boolean;
  enforceStrictDistance: boolean;
  geoFencingRadius: number;
  allowSoftClocking: boolean;
  allowBiometricClocking: boolean;
}

export interface getOtherSettingsProps {
  active_time_tracking_policy: number;
  company_latitude: string;
  company_longitude: string;
  enforce_geo_fencing: string;
  enforce_strict_distance: string;
  geo_fencing_radius: string;
  manual_attendance_workflow: string;
  overtime_confirmation_workflow: string;
  allow_biometric_clocking: string;
  allow_soft_clocking: string;
}
