export type TCompanySubscriptionDiscount = {
  id: number;
  companyId: number;
  type: "percentage" | "amount"; //TODO: Confirm this type defined is correct
  value: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
};
