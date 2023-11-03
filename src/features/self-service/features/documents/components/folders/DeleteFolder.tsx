import React from "react";
import { IModalProps } from "types";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import DeleteEntityModal from "components/entity/DeleteEntityModal";
import { TFolderListItem } from "../../types";
import { useDeleteFolder } from "../../hooks/useDeleteFolder";
import { QUERY_KEY_FOR_FOLDERS } from "../../hooks/useGetFolders";

interface IProps extends IModalProps {
  folder?: TFolderListItem;
}
export const DeleteFolder: React.FC<IProps> = ({
  open,
  handleClose,
  folder,
}) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useDeleteFolder();

  const handleDelete = () => {
    if (!folder) return;
    mutate(
      {
        id: folder.id,
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
            queryKey: [QUERY_KEY_FOR_FOLDERS],
            // exact: true,
          });

          handleClose();
        },
      }
    );
  };

  return (
    <DeleteEntityModal
      title="Delete Folder"
      entity={{ type: "folder", name: folder?.name ?? "" }}
      handleClose={handleClose}
      open={open}
      handleDelete={{ fn: handleDelete, isLoading: isLoading }}
    />
  );
};
