import { TableWithFocusType } from "components/table";
import { ColumnsType } from "antd/lib/table";

import { usePagination } from "hooks/usePagination";

import { useFetchApprovalRequests } from "features/core/workflows/hooks/useFetchApprovalRequests";
import { TPayrollListData } from "features/payroll/types/payroll";
import { PAYROLL_REVIEW_TABLE_COLUMNS } from "./columns";
import { TPayrollReviewAction } from "./PayrollReviewContainer";

interface IProps {
  handleAction: (key: TPayrollReviewAction, item?: TPayrollListData) => void;
}
const PayrollReviewTable: React.FC<IProps> = ({ handleAction }) => {
  const { pagination, onChange } = usePagination();
  const { data, isFetching } = useFetchApprovalRequests({
    pagination,
    type: "payroll",
  });

  const extraColumnsToDisplay: ColumnsType<TPayrollListData> =
    data?.componentHeadersToDisplay
      ? data?.componentHeadersToDisplay?.map((name) => ({
          title: name,
          dataIndex: name,
          key: name,
          render: (_, item) => (
            <span className="capitalize">
              {item.componentsToDisplay?.[name]}
            </span>
          ),
        }))
      : [];
  return (
    <>
      <TableWithFocusType
        columns={PAYROLL_REVIEW_TABLE_COLUMNS(
          handleAction,
          extraColumnsToDisplay
        )}
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
        scroll={{ x: "max-content" }}
      />
    </>
  );
};

export default PayrollReviewTable;
