import React, { useState } from "react";
import { folderCard } from "../assets";
import { useGetFolders } from "../hooks/useGetFolders";
import { usePagination } from "hooks/usePagination";
import dayjs from "dayjs";
import { Dropdown, Menu } from "antd";
import { DeleteFolder } from "./folders/DeleteFolder";
import { TFolderListItem } from "../types";

export const DocumentFolders = () => {
  const { pagination, onChange } = usePagination({ pageSize: 10 });
  const { data, isLoading } = useGetFolders({ pagination });
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [request, setRequest] = useState<TFolderListItem>();

  const onCancel = () => {
    setRequest(undefined);
    setOpenDeleteModal(false);
  };

  const handleDelete = (item: TFolderListItem) => {
    setRequest(item);
    setOpenDeleteModal(true);
  };

  return (
    <div className="mt-7">
      <DeleteFolder
        open={openDeleteModal}
        handleClose={onCancel}
        folder={request}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data?.data.map((item) => (
          <div className="relative">
            <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-between px-6 py-8 bg-white bg-opacity-75">
              <div className="flex items-center justify-between">
                <h5 className="text-base">{item.name}</h5>
                <Dropdown
                  trigger={["click"]}
                  overlay={
                    <Menu>
                      <Menu.Item key="1">Add File</Menu.Item>
                      <Menu.Item key="2">View Files</Menu.Item>
                      <Menu.Item key="3" onClick={() => handleDelete(item)}>
                        Delete Folder
                      </Menu.Item>
                    </Menu>
                  }
                >
                  <i className="ri-more-2-fill text-lg cursor-pointer"></i>
                </Dropdown>
              </div>
              <div className="flex items-center justify-between">
                <h5 className="text-sm">
                  <span className="text-2xl font-bold pr-1">
                    {item.files.length}
                  </span>
                  {`${item.files.length > 1 ? "Files" : "File"}`}
                </h5>
                <span className="text-sm">
                  {dayjs(item.createdAt).format("Do MMMM YYYY")}
                </span>
              </div>
            </div>
            <img
              src={folderCard}
              alt="folder-background"
              className="w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
