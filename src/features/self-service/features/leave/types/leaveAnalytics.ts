export type TLeaveAnalytics = {
  approved: number;
  pending: number;
  rejected: number;
  holiday: number;

  spillover: number;
  annualLeaveBank: number;
  usedAnnualLeave: number;
  annualLeaveBalance: number;
  leaveBankBreakdown: LeaveBankBreakdown[];
};

interface LeaveBankBreakdown {
  id: number;
  name: string;
  length: number;
  used: number;
  balance: number;
  label?: string;
}
