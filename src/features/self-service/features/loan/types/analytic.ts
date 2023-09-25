export type TLoanAnalytics = {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  graphData: GraphData;
};

interface GraphData {
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
