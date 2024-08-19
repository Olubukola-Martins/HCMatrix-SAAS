interface TLoanAnalytics {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  balance: number;
}

export interface TAllLoanAnalytics {
  mine: TLoanAnalytics;
  company: TLoanAnalytics;
}

export interface GraphData {
  totalYearCount: number;
  countsByMonth: CountsByMonth;
}

interface CountsByMonth {
  January: number;
  February: number;
  March: number;
  April: number;
  May: number;
  June: number;
  July: number;
  August: number;
  September: number;
  October: number;
  November: number;
  December: number;
}
