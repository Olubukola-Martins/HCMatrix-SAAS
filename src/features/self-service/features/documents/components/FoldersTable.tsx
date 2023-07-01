import { Dropdown, Menu, Modal, Table } from "antd";
import { MoreOutlined } from "@ant-design/icons";

import React, { useState } from "react";
import { ColumnsType } from "antd/lib/table";

import { usePagination } from "hooks/usePagination";

import { QUERY_KEY_FOR_FOLDERS, useGetFolders } from "../hooks/useGetFolders";
import { TFolderListItem } from "../types";
import moment from "moment";
import { EditFolder } from "./EditFolder";
import { useDeleteFolder } from "../hooks/useDeleteFolder";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { ExclamationCircleFilled } from "@ant-design/icons";

export const FoldersTable: React.FC = () => {
  const queryClient = useQueryClient();

  const [showM, setShowM] = useState(false);
  const [folder, setFolder] = useState<TFolderListItem>();
  const handleEdit = (data: TFolderListItem) => {
    setShowM(true);
    setFolder(data);
  };
  const { mutate, isLoading } = useDeleteFolder();
  const onDelete = (folderId: number) => {
    mutate(
      {
        id: folderId,
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
            queryKey: [QUERY_KEY_FOR_FOLDERS],
            // exact: true,
          });
        },
      }
    );
  };
  const handleDelete = (id: number) => {
    Modal.confirm({
      title: `Are you sure you want to delete folder ?`,
      icon: <ExclamationCircleFilled />,
      content: `This will delete this folder!`,
      width: 600,
      okButtonProps: { loading: isLoading },
      onOk() {
        onDelete(id);
      },
    });
  };
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
          {moment(item.createdAt).format("YYYY-MM-DD")}
        </span>
      ),
    },
    {
      title: "Last Modified",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (val, item) => (
        <span className="capitalize text-caramel hover:underline">
          {moment(item.updatedAt).format("YYYY-MM-DD")}
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
                { label: "Edit", key: "Edit", onClick: () => handleEdit(item) },
                {
                  label: "Delete",
                  key: "Delete",
                  onClick: () => handleDelete(item.id),
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
      {folder && (
        <EditFolder
          open={showM}
          folder={folder}
          handleClose={() => setShowM(false)}
        />
      )}
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
