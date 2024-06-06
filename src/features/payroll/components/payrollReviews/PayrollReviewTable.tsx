import { TableWithFocusType } from "components/table";
import { ColumnsType } from "antd/lib/table";

import { usePagination } from "hooks/usePagination";

import { useFetchApprovalRequests } from "features/core/workflows/hooks/useFetchApprovalRequests";
import { TPayrollListData } from "features/payroll/types/payroll";
import { PAYROLL_REVIEW_TABLE_COLUMNS } from "./columns";
import { TPayrollReviewAction } from "./PayrollReviewContainer";
import { formatNumberWithCommas } from "utils/dataHelpers/formatNumberWithCommas";

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
          title: <span className="capitalize">{name}</span>,
          dataIndex: name,
          key: name,
          render: (_, item) =>
            formatNumberWithCommas(item.componentsToDisplay?.[name]),
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
              ({
                ...item.payroll,
                key: item.payroll?.id,
                approvalStatus: item.status,
              } as TPayrollListData)
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
