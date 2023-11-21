export type THospital = {
  id: number;
  name: string;
  label: string;
  addressId: number;
  categoryId: number;
  isRecommended: boolean;
  phoneNumber: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  category: Category;
  address: Address;
  hmoPlanManagement: HmoPlanManagement[];
};

interface HmoPlanManagement {
  id: number;
  hospitalId: number;
  hmoPlanId: number;
  createdAt: string;
  updatedAt: string;
  hmoPlan: HmoPlan;
}

interface HmoPlan {
  id: number;
  name: string;
  label: string;
  maxDependents: number;
  description: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
}

interface Address {
  id: number;
  streetAddress: string;
  countryId: number;
  stateId: number;
  lgaId: number;
  timezone?: string;
  createdAt: string;
  updatedAt: string;
  country: Country;
  state: State;
  lga: Lga;
}

interface Lga {
  id: number;
  name: string;
  stateId: number;
  createdAt: string;
  updatedAt: string;
}

interface State {
  id: number;
  name: string;
  countryId: number;
  createdAt: string;
  updatedAt: string;
}

interface Country {
  id: number;
  name: string;
  sortName: string;
  code: string;
  createdAt: string;
  updatedAt: string;
}

interface Category {
  id: number;
  name: string;
  label: string;
  description: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
}
