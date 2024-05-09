export type TSaveCompanyParams = {
  administrator: Administrator;
  emailSettings: EmailSettings;
  locationSettings: LocationSettings;
  dateAndTimeSettings: DateAndTimeSettings;
  profilePhotoSettings: ProfilePhotoSettings;
  notificationSettings: NotificationSettings;
  employeeSettings: EmployeeSettings;
  currencySettings?: CurrencySettings; //This is potentially undefined cos it was set at a later date, and as a result not all app company accounts might have it
};

export type TCompany = {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  isParent: boolean;
  isActive: boolean;
  color: string;
  industryId: number;
  userId: number;
  address?: Address;
  logoUrl: string;
  website: string;
  parentId?: any;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
};
interface Address {
  streetAddress: string;
  countryId?: number;
  stateId?: number;
  lgaId?: number;
  timezone?: string;
}
interface CurrencySettings {
  showCurrencySymbol: boolean;
  baseCurrency: string;
}
interface EmployeeSettings {
  hideBirthday: boolean;
  hidePhoneNumber: boolean;
  hideWorkAnniversary: boolean;
}

interface NotificationSettings {
  email: boolean;
  inApp: boolean;
}

interface ProfilePhotoSettings {
  modifyUsersProfile: ModifyUsersProfile;
}

interface ModifyUsersProfile {
  administrator: boolean;
  employee: boolean;
}

interface DateAndTimeSettings {
  dateFormat: string;
  timeFormat: string;
}

interface LocationSettings {
  country: string;
  timezone: string;
}

interface EmailSettings {
  defaultFromAddress: string;
}

interface Administrator {
  adminEmail: string;
}
