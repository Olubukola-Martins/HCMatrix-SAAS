// TO DO : Refactor file to be a folder with an index, and other brakdown files if needed

export type TPermission = {
  id: number;
  name: string;
  label: string;
  categoryId: number;
  description?: string;
  permissionId: number;
};
export type TPermissionCategory = {
  id: number;
  name: string;

  description?: string;
};

export type TRole = {
  id: number;
  name: string;
  userCount: number;
  createdAt: string;
  updatedAt: string;
  label?: string;
  permissions?: TPermission[];
};
