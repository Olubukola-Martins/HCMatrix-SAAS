export interface PersonalInfoData {
  category: "personal-information";
  content: Content;
}

interface Content {
  dob: string;
  gender: string;
  phoneNumber: string;
  eligibility: string;
  exchangeRateId: number;
  exchangeRateName: string | undefined;
  maritalStatus: string;
  nationality: string;
  address: Address;
  alternativeEmail: string;
  alternativePhoneNumber: string;
  nin: string;

  //
  validDocumentUrl?: string;
  passportExpirationDate?: string;
}

interface Address {
  streetAddress: string;
  countryId: number;
  countryName: string;
  stateId: number;
  stateName: string;
  lgaId: number;
  lgaName: string;
  timezone: string;
}
