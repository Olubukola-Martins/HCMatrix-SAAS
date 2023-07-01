import { IModalProps } from "types";
import { EntityDetailModal } from "components/entity/EntityDetailModal";
import { useGetSingleFileInFolder } from "../hooks/file/useGetSingleFileInFolder";

interface IProps extends IModalProps {
  fileId: number;
  folder: {
    name?: string;
    id: number;
  };
}

export const FileDetails: React.FC<IProps> = ({
  open,
  handleClose,
  fileId,
  folder,
}) => {
  const { data: file, isFetching } = useGetSingleFileInFolder({
    fileId,
    folderId: folder.id,
  });

  return (
    <EntityDetailModal
      open={open}
      handleClose={handleClose}
      loading={isFetching}
      title={`${file?.name} File`}
      formFields={[
        {
          label: "Name",
          name: "name",
          render: { value: file?.name ?? "", component: "text" },
        },
        {
          label: "Folder",
          name: "folderName",
          render: { value: folder?.name ?? "", component: "text" },
        },
        {
          label: "Access Count",
          name: "accessCount",
          render: { value: `${file?.access?.length}` ?? "", component: "text" },
        },
        {
          label: "Description",
          name: "description",
          render: { value: file?.description ?? "", component: "text-area" },
        },

        {
          label: "Document",
          name: "Document",
          render: {
            value: [{ name: "Download File", url: file?.url ?? "" }],
            component: "url",
          },
        },
      ]}
    />
  );
};
