

import React, { useState } from "react";
import { ColumnsType } from "antd/lib/table";
import {Table} from "antd"
import { usePagination } from "hooks/usePagination";

import { useGetFolders } from "../hooks/useGetFolders";
import { TFolderListItem } from "../types";
import { EditFolder } from "./EditFolder";
import { DeleteFolder } from "./folders/DeleteFolder";
import { TableFocusTypeBtn } from "components/table";
import { FOLDER_TABLE_COLUMNS } from "./columns/folders";

export type TFolderAction = "edit" | "delete";
export const FoldersTable: React.FC = () => {
  const [action, setAction] = useState<TFolderAction>();
  const [folder, setFolder] = useState<TFolderListItem>();

  const { pagination, onChange } = usePagination();

  const { data, isFetching } = useGetFolders({
    pagination,
  });

  const columns: ColumnsType<TFolderListItem> = FOLDER_TABLE_COLUMNS(
    setFolder,
    setAction
  );
  const [selectedColumns, setSelectedColumns] =
    useState<ColumnsType<TFolderListItem>>(columns);
  const onClose = () => {
    setAction(undefined);
    setFolder(undefined);
  };
  return (
    <div className="space-y-6">
      {folder && (
        <EditFolder
          open={action === "edit"}
          id={0}
          handleClose={onClose}
        />
      )}

      <DeleteFolder
        open={action === "delete"}
        folder={folder}
        handleClose={onClose}
      />
 <div className="flex justify-end">
        {TableFocusTypeBtn<TFolderListItem>({
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
        dataSource={data?.data}
        loading={isFetching}
        pagination={{ ...pagination, total: data?.total }}
        onChange={onChange}
      />
    </div>
  );
};
