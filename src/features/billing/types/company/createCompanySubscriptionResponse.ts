export type TCreateCompSubscriptionResponse = {
  message: string;
  data: Data;
};

interface Data {
  companySubscription: CompanySubscription;
  paymentUrl: string;
}

interface CompanySubscription {
  id: number;
  companyId: number;
  isActive: boolean;
  isFreeTrial: boolean;
  autoRenew: boolean;
  billingCycle: string;
  priceType: string;
  startDate: string;
  endDate: string;
  licensedEmployeeCount: number;
  unlicensedEmployeeCount: number;
  deactivatedEmployeeCount: number;
  createdAt: string;
  updatedAt: string;
  purchased: Purchased[];
  addOns: AddOns;
  billingDetail: BillingDetail;
  transaction: Transaction;
}

interface Transaction {
  id: number;
  companySubscriptionId: number;
  vat: string;
  discount: string;
  totalAmount: string;
  totalAmountPaid: string;
  status: string;
  reference: string;
  createdAt: string;
  updatedAt: string;
}

interface BillingDetail {
  id: number;
  companySubscriptionId: number;
  billingName: string;
  phoneNumber: string;
  addressId: number;
  createdAt: string;
  updatedAt: string;
  address: Address;
}

interface Address {
  id: number;
  streetAddress: string;
  countryId: number;
  stateId: number;
  lgaId?: any;
  timezone: string;
  longitude: string;
  latitude: string;
  createdAt: string;
  updatedAt: string;
}

interface AddOns {
  id: number;
  companySubscriptionId: number;
  supportCaseId: number;
  extraStorageId: number;
  trainingSessionId: number;
  createdAt: string;
  updatedAt: string;
  supportCase: SupportCase;
  extraStorage: ExtraStorage;
  trainingSession: TrainingSession;
}

interface TrainingSession {
  id: number;
  name: string;
  label: string;
  description: string;
  numberOfHours: number;
  priceInNgn: string;
  priceInUsd: string;
  createdAt: string;
  updatedAt: string;
}

interface ExtraStorage {
  id: number;
  name: string;
  label: string;
  description: string;
  size: number;
  priceInNgn: string;
  priceInUsd: string;
  createdAt: string;
  updatedAt: string;
}

interface SupportCase {
  id: number;
  name: string;
  label: string;
  description: string;
  priceInNgn: string;
  priceInUsd: string;
  createdAt: string;
  updatedAt: string;
}

interface Purchased {
  id: number;
  companySubscriptionId: number;
  subscriptionId: number;
  createdAt: string;
  updatedAt: string;
  subscription: Subscription;
}

interface Subscription {
  id: number;
  type: string;
  name: string;
  label: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  prices: Price[];
}

interface Price {
  id: number;
  subscriptionId: number;
  type: string;
  monthlyPricePerLicensedEmployee: string;
  monthlyPricePerUnlicensedEmployee: string;
  yearlyPricePerLicensedEmployee: string;
  yearlyPricePerUnlicensedEmployee: string;
  createdAt: string;
  updatedAt: string;
}
