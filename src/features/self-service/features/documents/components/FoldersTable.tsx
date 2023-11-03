import { Dropdown, Menu, Table } from "antd";
import { MoreOutlined } from "@ant-design/icons";

import React, { useState } from "react";
import { ColumnsType } from "antd/lib/table";

import { usePagination } from "hooks/usePagination";

import { useGetFolders } from "../hooks/useGetFolders";
import { TFolderListItem } from "../types";
import moment from "moment";
import { EditFolder } from "./EditFolder";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import { DeleteFolder } from "./folders/DeleteFolder";

export const FoldersTable: React.FC = () => {
  const [action, setAction] = useState<"edit" | "delete">();
  const [folder, setFolder] = useState<TFolderListItem>();

  const { pagination, onChange } = usePagination();

  const { data, isFetching } = useGetFolders({
    pagination,
  });

  const columns: ColumnsType<TFolderListItem> = [
    {
      title: "Folder Name",
      dataIndex: "name",
      key: "name",
      render: (val, item) => <span className="capitalize">{item.name}</span>,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (val, item) => (
        <span className="capitalize text-caramel hover:underline">
          {moment(item.createdAt).format(DEFAULT_DATE_FORMAT)}
        </span>
      ),
    },
    {
      title: "Last Modified",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (val, item) => (
        <span className="capitalize text-caramel hover:underline">
          {moment(item.updatedAt).format(DEFAULT_DATE_FORMAT)}
        </span>
      ),
    },

    {
      title: "Actions",
      dataIndex: "act",
      key: "act",
      render: (_, item) => (
        <Dropdown
          overlay={
            <Menu
              items={[
                {
                  label: "Edit",
                  key: "Edit",
                  onClick: () => {
                    setFolder(item);
                    setAction("edit");
                  },
                },
                {
                  label: "Delete",
                  key: "Delete",
                  onClick: () => {
                    setFolder(item);
                    setAction("delete");
                  },
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
  const onClose = () => {
    setAction(undefined);
    setFolder(undefined);
  };
  return (
    <div>
      {folder && (
        <EditFolder
          open={action === "edit"}
          folder={folder}
          handleClose={onClose}
        />
      )}

      <DeleteFolder
        open={action === "delete"}
        folder={folder}
        handleClose={onClose}
      />

      <Table
        columns={columns}
        size="small"
        dataSource={data?.data}
        loading={isFetching}
        pagination={{ ...pagination, total: data?.total }}
        onChange={onChange}
      />
    </div>
  );
};
