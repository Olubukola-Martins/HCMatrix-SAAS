export type TFileStorageSetting = {
  id: number;
  totalFileStorage: number;
  maxFileSizePerUpload: number;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  totalUsedInGB: number;
  formattedMaxFileSizePerUpload: string;
  formattedTotalFileStorage: string;
  formattedTotalUsedInGB: string;
};
