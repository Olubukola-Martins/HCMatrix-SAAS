export type TSingleFolder = {
  id: number;
  name: string;
  label: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  files: File[];
};

interface File {
  id: number;
  folderId: number;
  url: string;
  name: string;
  description: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
}
