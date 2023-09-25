import { Table } from "antd";

import { ColumnsType } from "antd/lib/table";

import { usePagination } from "hooks/usePagination";

import { useFetchApprovalRequests } from "features/core/workflows/hooks/useFetchApprovalRequests";
import { TPayrollListData } from "features/payroll/types/payroll";

interface IProps {
  columns?: ColumnsType<TPayrollListData>;
}
const PayrollReviewTable: React.FC<IProps> = ({ columns }) => {
  const { pagination, onChange } = usePagination();
  const { data, isFetching } = useFetchApprovalRequests({
    pagination,
    type: "payroll",
  });

  return (
    <>
      <Table
        columns={columns}
        size="small"
        dataSource={data?.data
          .filter((item) => !!item.payroll)
          .map(
            (item) =>
              ({ ...item.payroll, key: item.payroll?.id } as TPayrollListData)
          )}
        loading={isFetching}
        pagination={{ ...pagination, total: data?.total }}
        onChange={onChange}
      />
    </>
  );
};

export default PayrollReviewTable;
