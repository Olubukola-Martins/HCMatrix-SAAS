// These object helps to ensure that the routes in the application are not manually hardcorded and littered everywhere
// rather they are managed by a single file
export const appRoutes = {
  // auth routes
  microsoftCallback: `auth/microsoft/callback`,
  login: `/login`,
  register: `/register`,
  verify: `/verify`,
  verifyEmployee: `/verify-employee`,
  forgotPassword: `/forgot-password`,
  resetPassword: `/reset-password`,
  invitedEmployee: `/invited-employee-form`,
  //home routes
  home: `/`,
  companyOrganogram: `/company-organogram`,
  // setting routes
  settings: "/settings",
  companyDetailsSettings: `/settings/company-details`,
  locationSettings: `/settings/locations`,
  singleLocation: (id?: number) => ({
    format: `/settings/locations/:id`,
    path: `/settings/locations/${id}`,
  }),
  holidaySettings: `/settings/holidays`,
  userProfileSettings: `/settings/profile`,
  addEmployee: `/settings/add-employee`,
  employeeSettings: `/settings/employees`,
  singleEmployee: (id?: number) => ({
    format: `/settings/employees/:id`,
    path: `/settings/employees/${id}`,
  }),
  designationSettings: `/settings/designations`,
  singleDesignation: (id?: number) => ({
    format: `/settings/designations/:id`,
    path: `/settings/designations/${id}`,
  }),
  groupSettings: `/settings/groups`,
  departmentSettings: `/settings/departments`,
  singleDepartment: (id?: number) => ({
    format: `/settings/departments/:id`,
    path: `/settings/departments/${id}`,
  }),
  // singleDelegation: (id?: number) => ({
  //   format: `/settings/delegations/:id`,
  //   path: `/settings/delegations/${id}`,
  // }),
  delegationSettings: `/settings/delegations`,

  roleSettings: `/settings/roles`,
  createRole: `/settings/roles/create`,
  editRole: (id?: number) => ({
    format: `/settings/roles/edit/:id`,
    path: `/settings/roles/edit/${id}`,
  }),
  workflowSettings: `/settings/automation/workflows`,
  createWorkflow: `/settings/automation/workflows/create`,
  editWorkflow: (id?: number) => ({
    format: `/settings/workflows/:id`,
    path: `/settings/workflows/${id}`,
  }),
  payrollSettings: `/settings/payroll`,
  payrollPolicySettings: `/settings/probation_policy_PENDING`,
  payGradeSettings: `/settings/grades`,
  gradeCategorySettings: `/settings/grade_categories`,
  probationPolicySettings: `/settings/probation_policy`,
  resignationPolicySettings: `/settings/resignation_policy`,

  // Billing routes
  billingStatement: `/statement`,
  billings: `/billings`,
  purchaseUserLicense: `/purchase-user-license`,

  // payroll routes
  payrollHome: `/payroll/home`,
  payrollHome4Approver: `/payroll/home-approver`,
  payrollReview: `/payroll/review`,
  payrollBreakdown: `/payroll/breakdown`,
  payrollCycle: `/payroll/cycle`,
  payrollScheme: `/payroll/scheme`,
  payrollComparison: `/payroll/comparison`,
  createPayroll: `/payroll/create`,
  payrollReport: `/payroll/report`,
  payslips: `/payroll/payslip`,
  employeePayslips: `/payroll/employee-payslip`,
  createPayslipTemplate: `/payroll/create-payslip-template`,

  // admin routes
  systemAdminLogin: `/system-administration-login`,
  systemAdmins: `/system-administrators`,

  // self service routes
  selfServiceHome: `/self-service/home`,
  selfServiceRequisition: `/self-service/requisition`,
  selfServiceReimbursement: `/self-service/reimbursements`,
  selfServiceReimbursementSetting: `/self-service/reimbursement-setting`,
  selfServiceTransfer: `/self-service/transfers`,
  selfServiceTransferSetting: `/self-service/transfer-setting`,
  selfServiceMonetary: `/self-service/monetary`,
  selfServiceMonetarySetting: `/self-service/monetary-setting`,
  selfServiceJob: `/self-service/job`,
  selfServiceJobSetting: `/self-service/job-setting`,
  selfServicePositionChange: `/self-service/position-change`,
  selfServicePositionChangeSetting: `/self-service/position-change-setting`,
  selfServicePromotion: `/self-service/promotion`,
  selfServicePromotionSetting: `/self-service/promotion-setting`,
  selfServiceAssets: `/self-service/assets`,
  selfServiceAssetSetting: `/self-service/asset-setting`,
  selfServiceTravels: `/self-service/travels`,
  selfServiceTravelSetting: `/self-service/travel-setting`,
  assetDetails: (id?: number) => ({
    format: `/self-service/assets/:id`,
    path: `/self-service/assets/${id}`,
  }),
  loans: `/self-service/loan`,
  loanRequests: `/self-service/loan-request`,
  loanPolicies: `/self-service/loan-policies`,
  vehicleBooking: `/self-service/vehicle-booking`,
  vehicleDetails: (id?: number) => ({
    format: `/self-service/vehicle-details/:id`,
    path: `/self-service/vehicle-details/${id}`,
  }),
  surveyHome: `/self-service/survey`,
  newSurvey: `/self-service/survey/new`,
  singleSurveyForm: (id?: number) => ({
    format: `/self-service/survey-form/:id`,
    path: `/self-service/survey-form/${id}`,
  }),
  conferenceRoomBooking: `/self-service/conference-room-booking`,
  conferenceRoomBookingSetting: `/self-service/conference-room-booking/setting`,
  leaveHome: `/self-service/leave`,
  leaveSettings: `/self-service/leave/settings`,
  healthAccessHome: `/self-service/health-access`,
  healthAccessSettings: `/self-service/health-access/settings`,
  onboarding: `/self-service/onboarding`,
  startOnBoarding: (id?: number) => ({
    format: `/self-service/onboarding/:id`,
    path: `/self-service/onboarding/${id}`,
  }),
  handOver: `/self-service/handover-form`,
  newHandOverForm: `/self-service/handover-new-form`,

  handOverDetails: (id?: number) => ({
    format: ` /self-service/handover-form/:id`,
    path: ` /self-service/handover-form/${id}`,
  }),
  hRLetters: `/self-service/hr-letters`,
  documents: `/self-service/documents`,
  notifications: `/notifications`,

  // Performance route
  balanceScorecard: `/performance/balance-scorecard`,
  degreeEvaluation: `/performance/360-degree-evaluation`,
  behavioralCoreValue: `/performance/behavioral-core-value`,
  goalsObjective: `/performance/goal-objective`,
  nineBox: `/performance/9box`,
  performanceReport: `/performance/report`,
  evaluationDetails: (id?: number) => ({
    format: `/performance/evaluation/:id`,
    path: `/performance/evaluation/${id}`,
  }),
  evaluationReport: (id?: number) => ({
    format: `/performance/evaluation-report/:id`,
    path: `/performance/evaluation-report/${id}`,
  }),
  notFound: "*",

  // Time and Attendance routes
  attendanceHome: `/attendance/home`,
  timeSheet: `/attendance/time-sheet`,
  timeSheetDetails: (id?: number) => ({
    format: `/attendance/time-sheet/:id`,
    path: `/attendance/time-sheet/${id}`,
  }),
  timeOff: `/attendance/time-off`,
  attendanceReport: `/attendance/reports`,
  attendanceReportDetails: (id?: number) => ({
    format: `/attendance/reports/:id`,
    path: `/attendance/reports/${id}`,
  }),
  shiftPerEmployee: `/attendance/shift-per-employee`,
  hoursPerEmployee: `/attendance/hours-per-employee`,
  employeesPerShift: `/attendance/employees-per-shift`,

  uploadAttendance: `/attendance/upload-attendance`,
  timeTrackingRules: `/attendance/time-tracking-rules`,
  workSchedule: `/attendance/work-schedule`,
  timeOffPolicy: `/attendance/time-off-policy`,
  clockInSettings: `/attendance/clock-in-settings`,
  addLocation: `/attendance/add-location`,
  otherSettings: `/attendance/other-settings`,

  // Leaning and development
  leaningHome: `/leaning/home`,
  trainingSettings: `/leaning/training-settings`,
  feedbackTemplate: `/leaning/feedback-template`,
  gamificationSettings: `/leaning/gamification-settings`,
  notification: `/leaning/notification`,
  trackProgress: `/leaning/track-progress`,
  trackProgressDetails: (id?: number) => ({
    format: `/leaning/track-progress/:id`,
    path: `/leaning/track-progress/${id}`,
  }),
  training: `/leaning/training`,
  trainingDetails: (id?: number) => ({
    format: `/leaning/training/:id`,
    path: `/leaning/training/${id}`,
  }),
  gamification: `/leaning/gamification`,

};
