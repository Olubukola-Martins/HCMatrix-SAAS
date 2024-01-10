export type TSubscription = {
  id: number;
  type: string;
  name: string;
  label: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  prices: Price[];
  resources: Resource2[];
};

interface Resource2 {
  id: number;
  subscriptionId: number;
  resourceId: number;
  createdAt: string;
  updatedAt: string;
  resource: Resource;
}

interface Resource {
  id: number;
  name: string;
  label: string;
  description: string;
  createdAt: string;
  updatedAt: string;
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
