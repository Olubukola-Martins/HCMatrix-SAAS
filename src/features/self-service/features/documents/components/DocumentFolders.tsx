import { useState } from "react";
import { folderCard } from "../assets";
import { useGetFolders } from "../hooks/useGetFolders";
import { usePagination } from "hooks/usePagination";
import dayjs from "dayjs";
import { Dropdown, Empty, Menu, Skeleton } from "antd";
import { DeleteFolder } from "./folders/DeleteFolder";
import { TFolderListItem } from "../types";
import { AddFile } from "./files/AddFile";
import { EditFolder } from "./folders/EditFolder";
import { Link } from "react-router-dom";
import { appRoutes } from "config/router/paths";

export type TFolderAction = "edit" | "delete" | "view_file" | "add_file" | "assign_file";
export const DocumentFolders = () => {
  const { pagination, onChange } = usePagination({ pageSize: 8 });
  const { data, isLoading } = useGetFolders({ pagination });
  const [request, setRequest] = useState<TFolderListItem>();
  const [action, setAction] = useState<TFolderAction>();

  const onCancel = () => {
    setRequest(undefined);
    setAction(undefined);
  };

  const handleDelete = (item: TFolderListItem) => {
    setRequest(item);
    setAction("delete");
  };

  const handleAddFileToFolder = (item: TFolderListItem) => {
    setRequest(item);
    setAction("add_file");
  };

  const handleEditFolder = (item: TFolderListItem) => {
    setRequest(item);
    setAction("edit");
  };

  return (
    <div className="mt-10">
      <DeleteFolder
        open={action === "delete"}
        handleClose={onCancel}
        folder={request}
      />
      <EditFolder
        open={action === "edit"}
        id={request?.id ?? 0}
        handleClose={onCancel}
      />
      <AddFile
        id={request?.id}
        open={action === "add_file"}
        handleClose={onCancel}
      />

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((item) => (
            <Skeleton active loading={isLoading} key={item} />
          ))}
        </div>
      ) : data?.data && data?.data.length > 0 ? (
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
                        <Menu.Item
                          key="1"
                          onClick={() => handleAddFileToFolder(item)}
                        >
                          Add File
                        </Menu.Item>
                        <Menu.Item key="2">
                          <Link to={appRoutes.filesInFolder(item?.id).path}>
                            View Files
                          </Link>
                        </Menu.Item>
                        <Menu.Item
                          key="3"
                          onClick={() => handleEditFolder(item)}
                        >
                          Rename Folder
                        </Menu.Item>
                        <Menu.Item key="4" onClick={() => handleDelete(item)}>
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
                    {dayjs(item.createdAt).format("Do MMM YYYY")}
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
      ) : (
        <Empty className="mt-15" />
      )}
    </div>
  );
};
