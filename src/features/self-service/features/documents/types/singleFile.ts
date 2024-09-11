import { Access } from "../hooks/file/useCreateFile";

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
