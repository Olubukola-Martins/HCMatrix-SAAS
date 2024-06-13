type TPolicyReportFrequency = "daily" | "weekly" | "monthly";

export type TLatenessPolicy = {
  id: number;
  gracePeriod: string;
  sendNotification: boolean;
  sendReport: boolean;
  reportFrequency: TPolicyReportFrequency;
  reportToRoleId: number;
  companyId: number;
  createdAt: string;
  updatedAt: string;
};

export type TAbsenteeismPolicy = {
  id: number;
  markAbsent: boolean;
  sendNotification: boolean;
  sendReport: boolean;
  reportFrequency: TPolicyReportFrequency;
  reportToRoleId: number;
  companyId: number;
  createdAt: string;
  updatedAt: string;
};
