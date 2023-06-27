import { Dropdown, Menu, Pagination, Select, Skeleton, Table } from "antd";
import { usePagination } from "hooks/usePagination";
import React, { useState } from "react";
import { useGetFolders } from "../hooks/useGetFolders";
import { TListDataTypeView } from "types";
import { TFileListItem } from "../types";
import { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { useGetFilesInFolder } from "../hooks/file/useGetFilesInFolder";
import { MoreOutlined } from "@ant-design/icons";
import moment from "moment";

export const FilesContainer = () => {
  const [folderId, setFolderId] = useState<number>();
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
              value={folderId}
              options={folders?.data?.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
              onSelect={(val: number) => setFolderId(val)}
              allowClear
              onClear={() => setFolderId(undefined)}
              className="w-full"
            />
          </div>
          <div>
            {view === "list" && folderId && (
              <i
                className="ri-list-unordered text-2xl cursor-pointer"
                onClick={() => setView("grid")}
              ></i>
            )}
            {view === "grid" && folderId && (
              <i
                className="ri-layout-grid-line text-2xl cursor-pointer"
                onClick={() => setView("list")}
              ></i>
            )}
          </div>
        </div>
        {/* content */}
        {folderId && <FilesViewWrapper folderId={folderId} view={view} />}
      </div>
    </Skeleton>
  );
};

const FilesViewWrapper: React.FC<{
  view?: TListDataTypeView;
  folderId: number;
}> = ({ view = "grid", folderId }) => {
  const { pagination, onChange } = usePagination();

  const { data: files, isFetching: isFetchingFiles } = useGetFilesInFolder({
    data: { pagination },
    folderId,
  });
  if (files?.total === 0) {
    // TO DO: Add no files svg here
    return <>No files in selected folder</>;
  }
  return (
    <>
      {view === "list" && (
        <FileListTable
          data={files?.data}
          pagination={pagination}
          onChange={onChange}
          loading={isFetchingFiles}
        />
      )}
      {view === "grid" && (
        <FileListGrids
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
  //   onChange?: TableProps<TFolderListItem>["onChange"];
  onChange?: any;
}
const FileListTable: React.FC<IProps> = ({
  data = [],
  loading,
  pagination,
  onChange,
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
                { label: "View", key: "View", onClick: () => {} },
                { label: "Edit", key: "Edit", onClick: () => {} },
                { label: "Delete", key: "Delete", onClick: () => {} },
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
}) => {
  return (
    <Skeleton active loading={loading} paragraph={{ rows: 4 }}>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6">
        {data.map((item) => (
          <FileGridCard key={item.id} file={item} />
        ))}
      </div>
      <div className="mt-4 flex justify-end">
        <Pagination {...pagination} onChange={onChange} size="small" />
      </div>
    </Skeleton>
  );
};

const FileGridCard = ({ file }: { file: TFileListItem }) => {
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
                  { label: "View", key: "View", onClick: () => {} },
                  { label: "Edit", key: "Edit", onClick: () => {} },
                  { label: "Delete", key: "Delete", onClick: () => {} },
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
