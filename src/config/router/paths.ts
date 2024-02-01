// These object helps to ensure that the routes in the application are not manually hardcorded and littered everywhere

import { TPayrollSchemeType } from "features/payroll/types/payrollSchemes";

// rather they are managed by a single file
export const appRoutes = {
  // auth routes
  microsoftCallback: `/auth/microsoft/callback`,
  login: `/login`,
  register: `/register`,
  verify: `/verify`,
  verifyEmployee: `/verify-employee`,
  forgotPassword: `/forgot-password`,
  resetPassword: `/reset-password`,
  invitedEmployee: `/invited-employee-form`,
  //home routes
  home: `/`,
  // setting routes
  settings: "/settings",
  companyOrganogram: `/settings/company-organogram`,
  projectSettings: "/settings/projects",
  singleProject: (id?: number) => ({
    format: `/settings/projects/:id`,
    path: `/settings/projects/${id}`,
  }),
  companyDetailsSettings: `/settings/company-details`,
  locationSettings: `/settings/branches`,
  singleLocation: (id?: number) => ({
    format: `/settings/branches/:id`,
    path: `/settings/branches/${id}`,
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

  delegationSettings: `/settings/delegations`,

  roleSettings: `/settings/roles`,
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
  payrollCostCentres: `/settings/payroll/cost-centres`,
  singleCostCentre: (id?: number) => ({
    format: `/settings/payroll/cost-centres/:id`,
    path: `/settings/payroll/cost-centres/${id}`,
  }),
  payrollTaxPolicies: `/settings/payroll/tax-policies`,
  createTaxPolicy: `/settings/payroll/create-tax-policy`,
  payrollExchangeRates: `/settings/payroll/exhange-rates`,
  payrollSchemes: `/settings/payroll/schemes`,
  setupGradePayrollScheme: `/settings/payroll/schemes/grade/set-up/`,
  setupDirectSalaryPayrollScheme: `/settings/payroll/schemes/direct-salary/set-up/`,
  setupProjectPayrollScheme: `/settings/payroll/schemes/project/set-up/`,
  setupSingleProjectPayrollSchemeWithoutExistingScheme: (props?: {
    projectId?: number;
  }) => {
    return {
      format: `/settings/payroll/schemes/project/set-up/:projectId/scheme`,
      path: `/settings/payroll/schemes/project/set-up/${props?.projectId}/scheme`,
    };
  },
  setupSingleProjectPayrollScheme: (props?: {
    projectId?: number;
    schemeId?: number;
  }) => {
    return {
      format: `/settings/payroll/schemes/project/set-up/:projectId/scheme/:schemeId`,
      path: `/settings/payroll/schemes/project/set-up/${
        props?.projectId
      }/scheme/${props?.schemeId ?? ""}`,
    };
  },
  setupWagesPayrollScheme: `/settings/payroll/schemes/wages/set-up/`,
  setupDailyWagesPayrollScheme: `/settings/payroll/schemes/wages/set-up/daily`,

  setupMonthlyWagesPayrollScheme: `/settings/payroll/schemes/wages/set-up/monthly`,
  setupWagesPayrollSchemeById: ({
    frequency,
    id,
  }: {
    frequency: "monthly" | "daily";
    id?: number;
  }) => ({
    format: `/settings/payroll/schemes/wages/set-up/${frequency}/:id`,
    path: `/settings/payroll/schemes/wages/set-up/${frequency}/${id}`,
  }),
  listOfPayrolls: `/settings/payroll/list`,
  singlePayroll: ({
    scheme,
    id,
  }: {
    scheme?: TPayrollSchemeType;
    id?: number;
  } = {}) => ({
    format: `/settings/scheme/:scheme/payroll/:id`,
    path: `/settings/scheme/${scheme}/payroll/${id}`,
  }),
  payGradeSettings: `/settings/grades`,
  payGradeAndCategorySettings: `/settings/grades-and-settings`,
  taxAuthorities: `/settings/payroll/tax-authorities`,
  itfAuthorities: `/settings/payroll/itf-authorities`,
  nsitfAuthorities: `/settings/payroll/nsitf-authorities`,
  pensionAdministrators: `/settings/payroll/pension-adminsistrators`,
  gradeCategorySettings: `/settings/grade_categories`,
  probationPolicySettings: `/settings/probation-policy`,
  resignationPolicySettings: `/settings/resignation-policy`,

  // Billing routes
  billingStatement: `/statement`,
  billings: `/billings`,

  billingHistory: `billing/history`, //to be removed
  // start here
  purchaseUserLicense: `/purchase-user-license`,
  billingSubscription: `/billings/subscription`,
  billingInactiveSubscriptionInformEmployee: `/billings/subscription/inactive/inform-employee`,
  billingSummary: `/billings/summary`,
  singleBillingSummary: (id?: number) => ({
    format: `/billings/summary/:id`,
    path: `/billings/summary/${id}`,
  }),

  billingStorageManagement: `/billings/storage-management`,
  billingTrainingSession: `/billings/training-session`,

  // payroll routes
  payrollHome: `/payroll/home`,
  payrollHome4Approver: `/payroll/home-approver`,
  payrollReview: `/payroll/review`,
  payrollBreakdown: `/payroll/breakdown`,
  payrollCycle: `/payroll/cycle`,
  payrollScheme: `/payroll/scheme`,
  payrollComparison: `/payroll/comparison`,
  createOfficePayroll: `/payroll/create/office`,
  createDirectSalaryPayroll: `/payroll/create/direct-salary`,
  createWagesPayroll: `/payroll/create/wage`,
  createProjectPayroll: `/payroll/create/project`,
  payrollReport: `/payroll/report`,
  createPayrollReportTemplate: `/payroll/report/create/template`,
  editPayrollReportTemplate: (id?: number) => ({
    format: `/payroll/report/edit/template/:id`,
    path: `/payroll/report/edit/template/${id}`,
  }),
  viewPayrollReportTemplate: (id?: number) => ({
    format: `/payroll/report/view/template/:id`,
    path: `/payroll/report/view/template/${id}`,
  }),
  addPayrollReport: `/payroll/report/create`,
  payslips: `/payroll/payslip`,
  employeePayslips: `/payroll/employee-payslip`,
  payslipTransactions: `/self-service/payslip-transactions`,
  createPayslipTemplate: `/payroll/create-payslip-template`,
  editPayslipTemplate: (id?: number) => ({
    format: `/payroll/edit-payslip-template/:id`,
    path: `/payroll/edit-payslip-template/${id}`,
  }),
  viewPayslipTemplate: (id?: number) => ({
    format: `/payroll/view-payslip-template/:id`,
    path: `/payroll/view-payslip-template/${id}`,
  }),

  // admin routes
  systemAdminLogin: `/system-administration-login`,
  systemAdmins: `/system-administrators`,

  // self service routes
  selfServiceHome: `/self-service/home`,
  selfServiceTasks: `/self-service/tasks`,
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
  vehicleBookingSetting: `/self-service/vehicle-booking/setting`,
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
  healthAccessDetails: (id?: number) => ({
    format: `/self-service/health-access/:id`,
    path: `/self-service/health-access/${id}`,
  }),
  healthAccessSettings: `/self-service/health-access/settings`,
  onboarding: `/self-service/onboarding`,
  startOnBoarding: (id?: number) => ({
    format: `/self-service/onboarding/:id`,
    path: `/self-service/onboarding/${id}`,
  }),
  handOver: `/self-service/handover-form`,
  newHandOverForm: `/self-service/handover-new-form`,

  handOverDetails: (id?: number) => ({
    format: `/self-service/handover-form/:id`,
    path: `/self-service/handover-form/${id}`,
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
  biometrics: `/attendance/biometrics`,
  location: `/attendance/location`,
  otherSettings: `/attendance/other-settings`,

  // Leaning and development
  learningHome: `/learning/home`,
  trainingSettings: `/learning/training-settings`,
  feedbackTemplate: `/learning/feedback-template`,
  gamificationSettings: `/learning/gamification-settings`,
  notification: `/learning/notification`,
  trackProgress: `/learning/track-progress`,
  trackProgressDetails: (id?: number) => ({
    format: `/learning/track-progress/:id`,
    path: `/learning/track-progress/${id}`,
  }),
  training: `/learning/training`,
  trainingDetails: (id?: number) => ({
    format: `/learning/training/:id`,
    path: `/learning/training/${id}`,
  }),

  gamification: `/learning/gamification`,
  paidTraining: `/learning/paid-training`,
  budgets: `/learning/budgets`,
  addTraining: `/learning/add-training`,
  lAndDReport: `/learning/report`,
  udemy: `/learning/udemy`,
  leaningHome: `/leaning/home`,
};
