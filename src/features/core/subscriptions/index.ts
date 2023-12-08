export interface SubscriptionResourceAttributeI {
  id: number;

  name: string;

  label: string;

  description?: string;
}

export enum ISubscriptionType {
  MODULE = "module",

  PLAN = "plan",
}

export interface SubscriptionAttributeI {
  id: number;

  type: ISubscriptionType;

  name: string;

  label: string;

  description?: string;
}

export enum ISubscriptionPriceType {
  NGN = "ngn",

  USD = "usd",
}

export interface SubscriptionPriceAttributeI {
  id: number;

  subscriptionId: number;

  type: ISubscriptionPriceType;

  monthlyPricePerLicensedEmployee: number;

  monthlyPricePerUnlicensedEmployee: number;

  yearlyPricePerLicensedEmployee: number;

  yearlyPricePerUnlicensedEmployee: number;
}

export interface SubscriptionResourceManagementAttributeI {
  id: number;

  subscriptionId: number;

  resourceId: number;
}

export interface SubscriptionSupportCaseAttributeI {
  id: number;

  name: string;

  label: string;

  description?: string;

  priceInNgn: number;

  priceInUsd: number;
}

export interface ExtraStorageAttributeI {
  id: number;

  name: string;

  label: string;

  description?: string;

  size: number;

  priceInNgn: number;

  priceInUsd: number;
}

export interface SubscriptionTrainingSessionAttributeI {
  id: number;

  name: string;

  label: string;

  numberOfHours: number;

  priceInNgn: number;

  priceInUsd: number;
}

export enum IBillingCycle {
  YEARLY = "yearly",

  MONTHLY = "monthly",
}

export interface CompanySubscriptionAttributeI {
  id: number;

  companyId: number;

  isFreeTrial: boolean;

  autoRenew: boolean;

  billingCycle: string;

  startDate: Date;

  endDate: Date;

  licensedEmployeeCount: number;

  unlicensedEmployeeCount: number;

  deactivatedEmployeeCount: number;
}

export interface CompanySubscriptionAddOnAttributeI {
  id: number;

  companyId: number;

  supportCaseId?: number;

  extraStorageId?: number;

  trainingSessionId?: number;
}

export interface CompanyPurchasedSubscriptionAttributeI {
  id: number;

  companyId: number;

  subscriptionId: number;

  startDate: Date;

  endDate: Date;
}

export interface StorageTransactionAttributeI {
  id: number;

  size: number;

  amount: number;

  purchasedDate: Date;

  companyId: number;
}
