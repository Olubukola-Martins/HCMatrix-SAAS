export type TFolderListItem = {
  id: number;
  name: string;
  label: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  files: {
    id: number;
    folderId: number;
    name: string;
    description: string;
    url: string;
    access: {
      id: number;
      fileId: number;
      departmentId: number;
      employeeId: number;
      groupId: number;
      roleId: number;
    }[];
  }[];
};
