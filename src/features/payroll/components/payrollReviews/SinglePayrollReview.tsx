import { TSinglePayroll } from "features/payroll/types/payroll";
import React, { useState } from "react";
import { EmployeePayrollUpdatesContainer } from "../employeePayrollUpdates/EmployeePayrollUpdatesContainer";
import PageSubHeader from "components/layout/PageSubHeader";
import { MoreOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, Skeleton } from "antd";
import PayrollBreakdown from "./PayrollBreakdown";
import { useApproveORReject } from "hooks/useApproveORReject";
import { QUERY_KEY_FOR_PAYROLLS_BY_SCHEME } from "features/payroll/hooks/payroll/useGetAllPayrollsByScheme";
import { useQueryClient } from "react-query";
import { useFetchApprovalRequests } from "features/core/workflows/hooks/useFetchApprovalRequests";

interface IProps {
  payroll: TSinglePayroll;
}
const SinglePayrollReview: React.FC<IProps> = ({ payroll }) => {
  type TAction = "view-summary" | "compare";
  const queryClient = useQueryClient();

  const [action, setAction] = useState<TAction>();
  const handleAction = (props: { action: TAction }) => {
    const { action } = props;
    setAction(action);
  };
  const clearAction = () => {
    setAction(undefined);
  };

  const { data: payrollApprRequests, isFetching: isFetchingApprRequests } =
    useFetchApprovalRequests({
      pagination: {
        limit: 200,
        offset: 0,
      },
      type: "payroll",
    });
  const payrollRequestItem = payrollApprRequests?.data.find(
    (item) => item.payroll?.id === payroll.id
  );

  const { confirmApprovalAction } = useApproveORReject({
    handleSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_FOR_PAYROLLS_BY_SCHEME],
        // exact: true,
      });
    },
  });
  return (
    <>
      <PayrollBreakdown
        open={action === "view-summary"}
        handleClose={clearAction}
        payroll={payroll}
      />
      <Skeleton
        active
        paragraph={{ rows: 20 }}
        loading={isFetchingApprRequests}
      >
        <div className="flex flex-col gap-6">
          <PageSubHeader
            description={`Review ${payroll.name} payroll being processed`}
            hideBackground
            actions={
              payrollRequestItem
                ? [
                    {
                      name: "Approve",
                      handleClick: () =>
                        confirmApprovalAction({
                          approvalStageId: payrollRequestItem?.id,
                          status: "approved",
                          workflowType: !!payrollRequestItem?.basicStageId
                            ? "basic"
                            : "advanced",
                          requires2FA:
                            payrollRequestItem?.advancedStage
                              ?.enableTwoFactorAuth,
                        }),
                    },
                    {
                      name: "Reject",
                      handleClick: () =>
                        confirmApprovalAction({
                          approvalStageId: payrollRequestItem?.id,
                          status: "rejected",
                          workflowType: !!payrollRequestItem?.basicStageId
                            ? "basic"
                            : "advanced",
                          requires2FA:
                            payrollRequestItem?.advancedStage
                              ?.enableTwoFactorAuth,
                        }),
                      btnVariant: "style-with-class",
                      additionalClassNames: ["neutralButton"],
                    },
                  ]
                : undefined
            }
            comps={[
              <Dropdown
                overlay={
                  <Menu
                    items={[
                      {
                        key: "view",
                        label: "View Total Summary",
                        onClick: () => handleAction({ action: "view-summary" }),
                      },
                      {
                        // TO DO: Add the compare functionality, you probably need to use context
                        key: "compare",
                        label: "Compare",
                        onClick: () => handleAction({ action: "compare" }),
                      },
                    ]}
                  />
                }
              >
                <Button type="text" icon={<MoreOutlined />} />
              </Dropdown>,
            ]}
          />
          <EmployeePayrollUpdatesContainer
            expatriate={false}
            payrollId={payroll?.id}
            allowMultipleSelect={false}
            allowedEmployeeActions={["view-details"]}
          />
        </div>
      </Skeleton>
    </>
  );
};

export default SinglePayrollReview;
