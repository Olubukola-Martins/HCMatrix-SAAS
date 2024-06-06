import { Space } from "antd";
import { AppButton } from "components/button/AppButton";
import { useFetchEmployees } from "features/core/employees/hooks/useFetchEmployees";
import { TEmployeeStatus } from "features/core/employees/types";
import React from "react";

export const EmployeeCountInfoBtn: React.FC<{ status: TEmployeeStatus }> = ({
  status,
}) => {
  const { data: employeeData, isFetching } = useFetchEmployees({
    status: [status],
  });
  return (
    <AppButton
      label={`${status} (${employeeData?.total})`}
      isLoading={isFetching}
      //   TODO: Currect the color of this to be generated based on the status
      variant="transparent"
      additionalClassNames={["border-green-200"]}
    />
  );
};
export const EmployeeCountInfoBtnList: React.FC<{
  statuses: TEmployeeStatus[];
}> = ({ statuses }) => {
  return (
    <Space direction="horizontal">
      {statuses.map((status) => (
        <EmployeeCountInfoBtn key={status} status={status} />
      ))}
    </Space>
  );
};

export default EmployeeCountInfoBtn;
