export type TAssetAnalytics = {
  totalAssetsCost: TotalAssetsCost;
  assetTypes: AssetType[];
  assetByStatus: AssetByStatus;
};

interface AssetByStatus {
  unassigned: number;
  assigned: number;
  "under-repair": number;
  condemned: number;
}

interface AssetType {
  id: number;
  name: string;
  label: string;
  assetCount: number;
  companyId: number;
  createdAt: string;
  updatedAt: string;
}

interface TotalAssetsCost {
  totalYearCost: number;
  costsByMonth: CostsByMonth;
}

interface CostsByMonth {
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
