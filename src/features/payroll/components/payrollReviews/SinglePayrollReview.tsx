import { TSinglePayroll } from "features/payroll/types/payroll";
import React, { useState } from "react";
import { EmployeePayrollUpdatesContainer } from "../employeePayrollUpdates/EmployeePayrollUpdatesContainer";
import PageSubHeader from "components/layout/PageSubHeader";
import { Skeleton, Tag } from "antd";
import PayrollBreakdown from "./PayrollBreakdown";
import { useApproveORReject } from "hooks/useApproveORReject";
import { QUERY_KEY_FOR_PAYROLLS_BY_SCHEME } from "features/payroll/hooks/payroll/useGetAllPayrollsByScheme";
import { useQueryClient } from "react-query";
import { useFetchApprovalRequests } from "features/core/workflows/hooks/useFetchApprovalRequests";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "config/router/paths";
import { SupplementaryActionsProps } from "SupplementaryActions";
import { ComparePayroll } from "../payrollComparism/ComparePayroll";

interface IProps {
  payroll: TSinglePayroll;
}
const SinglePayrollReview: React.FC<IProps> = ({ payroll }) => {
  type TAction =
    | "view-summary"
    | "comapare-payroll-basic"
    | "compare-payroll-advanced";
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
  const navigate = useNavigate();
  const { confirmApprovalAction } = useApproveORReject({
    handleSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_FOR_PAYROLLS_BY_SCHEME],
        // exact: true,
      });
      navigate(appRoutes.payrollReview);
    },
  });
  const DEFAULT_PAYROLL_REVIEW_ACTIONS: SupplementaryActionsProps["actions"] = [
    {
      name: "Summary",
      handleClick: () => handleAction({ action: "view-summary" }),
      btnVariant: "default",
    },
    {
      name: "Compare",
      handleClick: () => handleAction({ action: "comapare-payroll-basic" }),
      btnVariant: "transparent",
    },
  ];
  return (
    <>
      <PayrollBreakdown
        open={action === "view-summary"}
        handleClose={clearAction}
        payroll={payroll}
      />
      <ComparePayroll
        handleClose={clearAction}
        open={
          action !== undefined &&
          ["comapare-payroll-basic", "compare-payroll-advanced"].includes(
            action
          )
        }
        payrollId={payroll?.id}
        payrollDate={payroll.date}
        type={action === "comapare-payroll-basic" ? "basic" : "advanced"}
      />
      <Skeleton
        active
        paragraph={{ rows: 20 }}
        loading={isFetchingApprRequests}
      >
        <div className="flex flex-col gap-6">
          <PageSubHeader
            description={{
              content: `${payroll.name} payroll`,
              className: "text-lg",
            }}
            hideBackground
            actions={
              payrollRequestItem && payroll.status === "in-review"
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
                    ...DEFAULT_PAYROLL_REVIEW_ACTIONS,
                  ]
                : DEFAULT_PAYROLL_REVIEW_ACTIONS
            }
          />
          <div className="flex justify-end">
            <Tag
              children={
                <span className="capitalize">
                  {payroll.status.split("-").join(" ")}
                </span>
              }
            />
          </div>
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
