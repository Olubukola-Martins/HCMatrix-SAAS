import { ColumnsType } from "antd/lib/table";
import { usePagination } from "hooks/usePagination";
import moment from "moment";
import { TableWithFocusType } from "components/table";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";
import { TAssetAssigneeHistory } from "../../types/assetAssigneeHistory";
import { useGetEmployeeAssetAssigneeHistory } from "../../hooks/assignee-history/useGetEmployeeAssetAssigneeHistory";

export const AllEmployeeAssetAssigneeHistory = () => {
  const { pagination, onChange } = usePagination();

  const { data, isFetching } = useGetEmployeeAssetAssigneeHistory({
    pagination,
  });

  const columns: ColumnsType<TAssetAssigneeHistory> = [
    {
      title: "Assignee",
      dataIndex: "Assignee",
      key: "Assignee",
      render: (_, item) => (
        <span className={`capitalize`}>
          {getEmployeeFullName(item.assignee)}
        </span>
      ),
    },
    {
      title: "Date Returned",
      dataIndex: "Date Returned",
      key: "Date Returned",
      render: (_, item) =>
        item.dateReturned
          ? moment(item.dateReturned).format(DEFAULT_DATE_FORMAT)
          : null,
    },
    {
      title: "Asset Brand",
      dataIndex: "brand",
      key: "brand",
      render: (_, item) => item.asset.brand,
    },
    {
      title: "Name",
      dataIndex: "Name",
      key: "Name",
      render: (_, item) => item.asset.name,
    },
    {
      title: "Asset Type",
      dataIndex: "Asset Type",
      key: "Asset Type",
      render: (_, item) => (
        <span className="capitalize">{item.asset.type.name}</span>
      ),
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-2">
        <TableWithFocusType
          columns={columns}
          size="small"
          dataSource={data?.data}
          loading={isFetching}
          pagination={{ ...pagination, total: data?.total }}
          onChange={onChange}
        />
      </div>
    </>
  );
};
