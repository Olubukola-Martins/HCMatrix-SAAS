export type TSingleFile = {
  id: number;
  folderId: number;
  url: string;
  name: string;
  description: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  access: Access[];
};

interface Access {
  id: number;
  fileId: number;
  type: string;
  entityId: number;
  createdAt: string;
  updatedAt: string;
}
