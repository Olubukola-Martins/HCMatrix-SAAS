export type TFileAccessListItem = {
  id: number;
  fileId: number;
  type: string;
  entityId: number;
  createdAt: string;
  updatedAt: string;
  role: Role;
};

interface Role {
  id: number;
  name: string;
  label: string;
  companyId: number;
}
