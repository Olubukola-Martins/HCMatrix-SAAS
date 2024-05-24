import PageSubHeader from "components/layout/PageSubHeader";
import { useState } from "react";
import PayrollReviewTable from "./PayrollReviewTable";
import { TPayrollListData } from "features/payroll/types/payroll";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "config/router/paths";
import {
  canUserAccessComponent,
  useGetUserPermissions,
} from "components/permission-restriction/PermissionRestrictor";
import ViewApprovalStages from "features/core/workflows/components/approval-request/ViewApprovalStages";
import { ComparePayroll } from "../payrollComparism/ComparePayroll";

export type TPayrollReviewAction =
  | "view-approval-stages"
  | "comapare-payroll-basic"
  | "compare-payroll-advanced";

export const PayrollReviewContainer = () => {
  const navigate = useNavigate();
  const { userPermissions } = useGetUserPermissions();
  const [request, setRequest] = useState<TPayrollListData>();
  const [action, setAction] = useState<TPayrollReviewAction>();
  const handleAction = (key: TPayrollReviewAction, item?: TPayrollListData) => {
    setAction(key);
    setRequest(item);
  };
  const onClose = () => {
    setAction(undefined);
    setRequest(undefined);
  };
  return (
    <>
      {request && (
        <ViewApprovalStages
          handleClose={onClose}
          open={action === "view-approval-stages"}
          id={request?.id}
          type="payroll"
        />
      )}
      {request && (
        <ComparePayroll
          handleClose={onClose}
          open={
            action !== undefined &&
            ["comapare-payroll-basic", "compare-payroll-advanced"].includes(
              action
            )
          }
          payrollId={request?.id}
          type={action === "comapare-payroll-basic" ? "basic" : "advanced"}
        />
      )}
      <div className="flex flex-col gap-6">
        <PageSubHeader
          hideBackground
          description={`You can now review and approve/reject payrolls`}
          actions={[
            {
              name: "Compare",
              handleClick: () => navigate(appRoutes.payrollComparison),
              btnVariant: "transparent",
              hidden: !canUserAccessComponent({
                userPermissions,
                requiredPermissions: ["compare-payrolls"],
              }),
            },
          ]}
        />

        <PayrollReviewTable handleAction={handleAction} />
      </div>
    </>
  );
};
