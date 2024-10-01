import { Access } from "../hooks/file/useCreateFile";


export type TFileListItem = {
  id: number;
  folderId: number;
  url: string;
  name: string;
  description: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  access: Access[]
};

export interface IViewFilesActions {
  fromFolderView: boolean;
  handleDelete?: (file: TFileListItem) => void;
  handleAssignFile?: (file: TFileListItem) => void
  handleEditFile?: (file: TFileListItem) => void
}
