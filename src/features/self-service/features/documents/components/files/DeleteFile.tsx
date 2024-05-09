import React from "react";
import { IModalProps } from "types";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import DeleteEntityModal from "components/entity/DeleteEntityModal";
import { TFileListItem } from "../../types";
import { useDeleteFile } from "../../hooks/file/useDeleteFile";
import { QUERY_KEY_FOR_FILES_IN_A_FOLDER } from "../../hooks/file/useGetFilesInFolder";

interface IProps extends IModalProps {
  file?: Pick<TFileListItem, "id" | "folderId" | "name">;
}
export const DeleteFile: React.FC<IProps> = ({ open, handleClose, file }) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useDeleteFile();

  const handleDelete = () => {
    if (!file) return;
    mutate(
      {
        fileId: file.id,
        folderId: file.folderId,
      },
      {
        onError: (err: any) => {
          openNotification({
            state: "error",
            title: "Error Occurred",
            duration: 2,
            description:
              err?.response.data.message ?? err?.response.data.error.message,
          });
        },
        onSuccess: (res: any) => {
          openNotification({
            state: "success",

            title: "Success",
            description: res.data.message,
            // duration: 0.4,
          });

          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_FILES_IN_A_FOLDER],
            // exact: true,
          });

          handleClose();
        },
      }
    );
  };

  return (
    <DeleteEntityModal
      title="Delete File"
      entity={{ type: "file", name: file?.name ?? "" }}
      handleClose={handleClose}
      open={open}
      handleDelete={{ fn: handleDelete, isLoading: isLoading }}
    />
  );
};
