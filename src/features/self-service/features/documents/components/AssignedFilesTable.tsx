import { TableWithFocusType } from "components/table";
import { FILE_TABLE_COLUMNS } from "./columns/files";
import { useGetAllAssignedFiles } from "../hooks/file/useGetAllAssignedFiles";
import { usePagination } from "hooks/usePagination";

export const AssignedFilesTable = () => {
  const { pagination, onChange } = usePagination({ pageSize: 10 });
  const { data, isLoading } = useGetAllAssignedFiles({ pagination });

  const columns = FILE_TABLE_COLUMNS();

  return (
    <div>
      <TableWithFocusType
        className="mt-3"
        columns={columns}
        dataSource={data?.data}
        loading={isLoading}
        pagination={{ ...pagination, total: data?.total }}
        onChange={onChange}
      />
    </div>
  );
};
