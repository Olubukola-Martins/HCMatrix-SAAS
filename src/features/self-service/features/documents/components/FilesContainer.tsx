import {
  Dropdown,
  Empty,
  Menu,
  Pagination,
  PaginationProps,
  Skeleton,
  Table,
  TableProps,
} from "antd";
import { usePagination } from "hooks/usePagination";
import React, { useEffect, useState } from "react";
import { TListDataTypeView } from "types";
import { TFileListItem, TFolderListItem } from "../types";
import { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { useGetFilesInFolder } from "../hooks/file/useGetFilesInFolder";
import { MoreOutlined } from "@ant-design/icons";
import moment from "moment";
import { noFiles } from "../assets";
import { FileDetails } from "./FileDetails";
import { EditFile } from "./EditFile";
import { SelectFolder } from "./folders/SelectFolder";
import { DeleteFile } from "./files/DeleteFile";
import ErrorBoundary from "components/errorHandlers/ErrorBoundary";
import { TableFocusTypeBtn } from "components/table";
import { FILE_TABLE_COLUMNS } from "./columns/files";

export const FilesContainer = () => {
  const [folder, setFolder] = useState<TFolderListItem>();

  const [view, setView] = useState<TListDataTypeView>("grid");

  return (
    <ErrorBoundary>
      <div className="flex flex-col gap-4">
        {/* controls */}
        <div className="flex justify-between items-end">
          <div className="w-36 flex flex-col gap-2">
            <span className="text-sm">Select Folder</span>

            <SelectFolder
              value={folder?.id}
              handleSelect={(_, folder) => setFolder(folder)}
              handleClear={() => setFolder(undefined)}
            />
          </div>
          <div>
            {view === "list" && folder && (
              <i
                className="ri-list-unordered text-2xl cursor-pointer"
                onClick={() => setView("grid")}
              />
            )}
            {view === "grid" && folder && (
              <i
                className="ri-layout-grid-line text-2xl cursor-pointer"
                onClick={() => setView("list")}
              />
            )}
          </div>
        </div>
        {/* content */}
        {folder && <FilesViewWrapper folder={folder} view={view} />}
        {!folder && <Empty description={`Select a Folder`} />}
      </div>
    </ErrorBoundary>
  );
};

const FilesViewWrapper: React.FC<{
  view?: TListDataTypeView;
  folder: TFolderListItem;
}> = ({ view = "grid", folder }) => {
  const { pagination, onChange, resetPagination } = usePagination();

  const { data: files, isFetching: isFetchingFiles } = useGetFilesInFolder({
    data: { pagination },
    folderId: folder.id,
  });
  type TAction = "view" | "edit" | "delete";
  const [action, setAction] = useState<TAction>();
  const [file, setFile] = useState<TFileListItem>();
  const handleClose = () => {
    setFile(undefined);
    setAction(undefined);
  };
  const handleAction = (props: { file: TFileListItem; action: TAction }) => {
    setFile(props.file);
    setAction(props.action);
  };

  //Reset Pagination any time the view changes
  useEffect(() => {
    resetPagination();
  }, [view, resetPagination]);

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
      {file && (
        <FileDetails
          folder={folder}
          open={action === "view"}
          fileId={file.id}
          handleClose={handleClose}
        />
      )}
      {file && (
        <EditFile
          folder={folder}
          open={action === "edit"}
          fileId={file.id}
          handleClose={handleClose}
        />
      )}
      <DeleteFile
        file={file}
        open={action === "delete"}
        handleClose={handleClose}
      />
      {view === "list" && (
        <FileListTable
          handleView={({ file }) => handleAction({ file, action: "view" })}
          handleEdit={({ file }) => handleAction({ file, action: "edit" })}
          handleDelete={({ file }) => handleAction({ file, action: "delete" })}
          data={files?.data}
          total={files?.total}
          pagination={pagination}
          onChange={onChange}
          loading={isFetchingFiles}
        />
      )}
      {view === "grid" && (
        <FileListGrids
          handleView={({ file }) => handleAction({ file, action: "view" })}
          handleEdit={({ file }) => handleAction({ file, action: "edit" })}
          handleDelete={({ file }) => handleAction({ file, action: "delete" })}
          data={files?.data}
          total={files?.total}
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
  total?: number;
  loading: boolean;
  pagination?: TablePaginationConfig;
  handleView: (props: { file: TFileListItem }) => void;
  handleEdit: (props: { file: TFileListItem }) => void;
  handleDelete: (props: { file: TFileListItem }) => void;
}
const FileListTable: React.FC<
  IProps & { onChange: TableProps<TFileListItem>["onChange"] }
> = ({
  data = [],
  total,
  loading,
  pagination,
  onChange,
  handleView,
  handleEdit,
  handleDelete,
}) => {
  const columns: ColumnsType<TFileListItem> = FILE_TABLE_COLUMNS(
    handleView,
    handleEdit,
    handleDelete
  );
  const [selectedColumns, setSelectedColumns] =
    useState<ColumnsType<TFileListItem>>(columns);

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        {TableFocusTypeBtn<TFileListItem>({
          selectedColumns,
          setSelectedColumns,
          data: {
            columns,
          },
        })}
      </div>
      <Table
        columns={selectedColumns}
        size="small"
        dataSource={data}
        loading={loading}
        pagination={{ ...pagination, total }}
        onChange={onChange}
      />
    </div>
  );
};
const FileListGrids: React.FC<
  IProps & { onChange: PaginationProps["onChange"] }
> = ({
  data = [],
  total,
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
        <Pagination
          {...{ ...pagination, total }}
          onChange={onChange}
          size="small"
        />
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
  handleView: IProps["handleView"];
  handleEdit: IProps["handleEdit"];
  handleDelete: IProps["handleDelete"];
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
                    onClick: () => handleView({ file }),
                  },
                  {
                    label: "Edit",
                    key: "Edit",
                    onClick: () => handleEdit({ file }),
                  },
                  {
                    label: "Delete",
                    key: "Delete",
                    onClick: () => handleDelete({ file }),
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
