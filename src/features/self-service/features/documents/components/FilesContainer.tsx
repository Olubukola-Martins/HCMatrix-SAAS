import {
  Dropdown,
  Empty,
  Menu,
  Modal,
  Pagination,
  Select,
  Skeleton,
  Table,
} from "antd";
import { usePagination } from "hooks/usePagination";
import React, { useState } from "react";
import { useGetFolders } from "../hooks/useGetFolders";
import { TListDataTypeView } from "types";
import { TFileListItem } from "../types";
import { ColumnsType, TablePaginationConfig } from "antd/es/table";
import {
  QUERY_KEY_FOR_FILES_IN_A_FOLDER,
  useGetFilesInFolder,
} from "../hooks/file/useGetFilesInFolder";
import { MoreOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import moment from "moment";
import { noFiles } from "../assets";
import { FileDetails } from "./FileDetails";
import { EditFile } from "./EditFile";
import { useDeleteFile } from "../hooks/file/useDeleteFile";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";

interface IFolderState {
  id: number;
  name: string;
}
export const FilesContainer = () => {
  const [folder, setFolder] = useState<IFolderState>();
  const { data: folders, isFetching: isFetchingFolders } = useGetFolders({
    pagination: {
      limit: 200,
      offset: 0,
    },
  });
  const [view, setView] = useState<TListDataTypeView>("grid");
  return (
    <Skeleton loading={isFetchingFolders} active paragraph={{ rows: 12 }}>
      <div className="flex flex-col gap-4">
        {/* controls */}
        <div className="flex justify-between items-end">
          <div className="w-36 flex flex-col gap-2">
            <span className="text-sm">Select Folder</span>

            {/* TO DO : Refactor to debounce component */}
            <Select
              placeholder={`Select Folder`}
              value={folder?.id}
              getPopupContainer={(triggerNode) => triggerNode.parentElement} //Fix for select following on scroll
              options={folders?.data?.map((item) => ({
                label: <span>{item.name}</span>,

                value: item.id,
              }))}
              onSelect={(val: number) =>
                setFolder({
                  id: val,
                  name: folders?.data.find((a) => a.id === val)?.name ?? "",
                })
              }
              allowClear
              onClear={() => setFolder(undefined)}
              className="w-full"
            />
          </div>
          <div>
            {view === "list" && folder && (
              <i
                className="ri-list-unordered text-2xl cursor-pointer"
                onClick={() => setView("grid")}
              ></i>
            )}
            {view === "grid" && folder && (
              <i
                className="ri-layout-grid-line text-2xl cursor-pointer"
                onClick={() => setView("list")}
              ></i>
            )}
          </div>
        </div>
        {/* content */}
        {folder && <FilesViewWrapper folder={folder} view={view} />}
        {!folder && <Empty description={`Select a Folder`} />}
      </div>
    </Skeleton>
  );
};

const FilesViewWrapper: React.FC<{
  view?: TListDataTypeView;
  folder: IFolderState;
}> = ({ view = "grid", folder }) => {
  const queryClient = useQueryClient();

  const { pagination, onChange } = usePagination();

  const { data: files, isFetching: isFetchingFiles } = useGetFilesInFolder({
    data: { pagination },
    folderId: folder.id,
  });
  type TAction = "view" | "edit";
  const [action, setAction] = useState<TAction>();
  const [fileId, setFileId] = useState<number>();
  const handleClose = () => {
    setFileId(undefined);
    setAction(undefined);
  };
  const handleAction = (props: { id: number; action: TAction }) => {
    setFileId(props.id);
    setAction(props.action);
  };
  const { mutate, isLoading } = useDeleteFile();
  const onDelete = ({ fileId }: { fileId: number }) => {
    mutate(
      {
        fileId,
        folderId: folder.id,
      },
      {
        onError: (err: any) => {
          openNotification({
            state: "error",
            title: "Error Occurred",
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
        },
      }
    );
  };
  const handleDelete = (props: { id: number }) => {
    Modal.confirm({
      title: `Are you sure you want to delete file ?`,
      icon: <ExclamationCircleFilled />,
      content: `This will delete this file!`,
      width: 600,
      okButtonProps: { loading: isLoading },
      onOk() {
        onDelete({ fileId: props.id });
      },
    });
  };
  if (files?.total === 0) {
    return (
      <div className="flex flex-col items-center">
        <div className="w-72">
          <img src={noFiles} alt="No File" className="object-contain" />
        </div>
        <span className="relative mt-4">No files in selected folder</span>
      </div>
    );
  }
  return (
    <>
      {fileId && (
        <FileDetails
          folder={folder}
          open={action === "view"}
          fileId={fileId}
          handleClose={handleClose}
        />
      )}
      {fileId && (
        <EditFile
          folder={folder}
          open={action === "edit"}
          fileId={fileId}
          handleClose={handleClose}
        />
      )}
      {view === "list" && (
        <FileListTable
          handleView={({ id }) => handleAction({ id, action: "view" })}
          handleEdit={({ id }) => handleAction({ id, action: "edit" })}
          handleDelete={({ id }) => handleDelete({ id })}
          data={files?.data}
          pagination={pagination}
          onChange={onChange}
          loading={isFetchingFiles}
        />
      )}
      {view === "grid" && (
        <FileListGrids
          handleView={({ id }) => handleAction({ id, action: "view" })}
          handleEdit={({ id }) => handleAction({ id, action: "edit" })}
          handleDelete={({ id }) => handleDelete({ id })}
          data={files?.data}
          pagination={pagination}
          onChange={onChange}
          loading={isFetchingFiles}
        />
      )}
    </>
  );
};
interface IProps {
  data?: TFileListItem[];
  loading: boolean;
  pagination?: TablePaginationConfig;
  handleView: (props: { id: number }) => void;
  handleEdit: (props: { id: number }) => void;
  handleDelete: (props: { id: number }) => void;

  //   onChange?: TableProps<TFolderListItem>["onChange"];
  onChange?: any;
}
const FileListTable: React.FC<IProps> = ({
  data = [],
  loading,
  pagination,
  onChange,
  handleView,
  handleEdit,
  handleDelete,
}) => {
  const columns: ColumnsType<TFileListItem> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 200,
      ellipsis: true,

      render: (_, item) => <span className="capitalize">{item.name}</span>,
    },
    {
      title: "Description",
      dataIndex: "Description",
      key: "Description",
      render: (_, item) => (
        <span className="capitalize">{item.description}</span>
      ),
      ellipsis: true,
    },

    {
      title: "Actions",
      dataIndex: "act",
      key: "act",
      width: 100,

      render: (_, file) => (
        <Dropdown
          overlay={
            <Menu
              items={[
                {
                  label: (
                    <a href={file.url} rel="noreferrer">
                      <span className="text-caramel cursor-pointer">
                        Download
                      </span>
                    </a>
                  ),
                  key: "Download",
                },
                {
                  label: "View",
                  key: "View",
                  onClick: () => handleView({ id: file.id }),
                },
                {
                  label: "Edit",
                  key: "Edit",
                  onClick: () => handleEdit({ id: file.id }),
                },
                {
                  label: "Delete",
                  key: "Delete",
                  onClick: () => handleDelete({ id: file.id }),
                },
              ]}
            />
          }
          children={<MoreOutlined />}
          trigger={["click"]}
        />
      ),
    },
  ];
  return (
    <div>
      <Table
        columns={columns}
        size="small"
        dataSource={data}
        loading={loading}
        pagination={pagination}
        onChange={onChange}
      />
    </div>
  );
};
const FileListGrids: React.FC<IProps> = ({
  data = [],
  loading,
  pagination,
  onChange,
  handleView,
  handleEdit,
  handleDelete,
}) => {
  return (
    <Skeleton active loading={loading} paragraph={{ rows: 4 }}>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6">
        {data.map((item) => (
          <FileGridCard
            key={item.id}
            file={item}
            handleView={handleView}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ))}
      </div>
      <div className="mt-4 flex justify-end">
        <Pagination {...pagination} onChange={onChange} size="small" />
      </div>
    </Skeleton>
  );
};

const FileGridCard = ({
  file,
  handleView,
  handleEdit,
  handleDelete,
}: {
  file: TFileListItem;
  handleView: (props: { id: number }) => void;
  handleEdit: (props: { id: number }) => void;
  handleDelete: (props: { id: number }) => void;
}) => {
  return (
    <>
      {/* view */}
      {/* To do: shorten description with ellpsis util func */}
      <div className="bg-card shadow-md rounded  text-center flex flex-col gap-16">
        <div className="py-5 px-3">
          <h4>Document</h4>

          <h2 className="font-medium text-lg my-6">{file.name}</h2>
        </div>
        <div className="flex items-center justify-between border-t px-2 py-3">
          <span className="text-xs">
            Uploaded: {moment(file.createdAt).format("YYYY-MM-DD")}
          </span>
          <Dropdown
            overlay={
              <Menu
                items={[
                  {
                    label: (
                      <a href={file.url} rel="noreferrer">
                        <span className="text-caramel cursor-pointer">
                          Download
                        </span>
                      </a>
                    ),
                    key: "Download",
                  },
                  {
                    label: "View",
                    key: "View",
                    onClick: () => handleView({ id: file.id }),
                  },
                  {
                    label: "Edit",
                    key: "Edit",
                    onClick: () => handleEdit({ id: file.id }),
                  },
                  {
                    label: "Delete",
                    key: "Delete",
                    onClick: () => handleDelete({ id: file.id }),
                  },
                ]}
              />
            }
            children={<MoreOutlined />}
            trigger={["click"]}
          />
        </div>
      </div>
    </>
  );
};
