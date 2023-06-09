export type TCompanyParams = {
  id: number;
  key: string;
  value: Value;
  companyId: number;
  createdAt: string;
  updatedAt: string;
};

interface Value {
  administrator: Administrator;
  emailSettings: EmailSettings;
  employeeSettings: EmployeeSettings;
  locationSettings: LocationSettings;
  dateAndTimeSettings: DateAndTimeSettings;
  notificationSettings: NotificationSettings;
  profilePhotoSettings: ProfilePhotoSettings;
}

interface ProfilePhotoSettings {
  modifyUsersProfile: ModifyUsersProfile;
}

interface ModifyUsersProfile {
  employee: boolean;
  administrator: boolean;
}

interface NotificationSettings {
  sms: boolean;
  email: boolean;
  inApp: boolean;
}

interface DateAndTimeSettings {
  dateFormat: string;
  timeFormat: string;
}

interface LocationSettings {
  country: string;
  timezone: string;
}

interface EmployeeSettings {
  hideBirthday: boolean;
  hidePhoneNumber: boolean;
  hideWorkAnniversary: boolean;
}

interface EmailSettings {
  defaultFromAddress: string;
}

interface Administrator {
  adminEmail: string;
}
