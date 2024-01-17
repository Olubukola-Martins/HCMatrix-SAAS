export type TCompanySubscriptionBillingDetail = {
  id: number;
  companySubscriptionId: number;
  billingName: string;
  phoneNumber: string;
  addressId: number;
  createdAt: string;
  updatedAt: string;
  address: Address;
};

interface Address {
  id: number;
  streetAddress: string;
  countryId: number;
  stateId: number;
  lgaId: number;
  timezone: string;
  longitude: string;
  latitude: string;
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
