import React from "react";
import { useGetApprovalStages } from "../../hooks/stage/useGetApprovalStages";
import { TWorkflowApprovalType } from "../../types";
import ErrorBoundary from "components/errorHandlers/ErrorBoundary";
import { Divider, Modal, Skeleton, Steps } from "antd";
import { ErrorWrapper } from "components/errorHandlers/ErrorWrapper";
import { IModalProps } from "types";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";
import { AppButton } from "components/button/AppButton";
import SendReminderToStageApprover from "./SendReminderToStageApprover";
import { truncateString } from "utils/dataHelpers/truncateString";

const ViewApprovalStages: React.FC<
  {
    id: number;
    type: TWorkflowApprovalType;
  } & IModalProps
> = ({ id, type, handleClose, open }) => {
  const { data, isLoading, isError, error } = useGetApprovalStages({
    props: {
      id,
      type,
    },
  });

  console.log(data);
  
  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={"Approval Stages"}
      style={{ top: 20 }}
    >
      <ErrorBoundary>
        <Skeleton loading={isLoading} active paragraph={{ rows: 12 }}>
          <ErrorWrapper
            isError={isError}
            message={
              error?.response?.data?.message ?? error?.response?.data?.error?.message
            }
          >
            <div className="space-y-6">
              <p>
                Easily track the approval stage your request is currently at and
                even send reminders to approvers if needed.
              </p>
              <Divider className="border-t-4 mb-4" />
              {/* stages */}
              <div className="w-full">
                <Steps className="w-full" size="small" direction="vertical">
                  {data?.data?.map((stage) => {
                    const constructApprovalFullName = (): string => {
                      let approvalFullName: string | undefined = undefined;
                      if (stage.leaveReliever) {
                        approvalFullName = getEmployeeFullName(
                          stage.leaveReliever
                        );
                        return approvalFullName;
                      }
                      if (stage.swapPartner) {
                        approvalFullName = getEmployeeFullName(
                          stage.swapPartner
                        );
                        return approvalFullName;
                      }
                      approvalFullName =
                        approvalFullName ??
                        stage.group?.name ??
                        stage.role?.name ??
                        stage.approvals
                          ?.map((approval) =>
                            getEmployeeFullName(approval.approver)
                          )
                          .join(",");
                      
                      return approvalFullName;
                    };
              
                    const approverName =  constructApprovalFullName();
                    return (
                      <Steps.Step
                        title={
                          <div className="grid grid-cols-3 gap-x-4 capitalize">
                            <h4 title={approverName}>{truncateString(approverName, 12)}</h4>
                            <h4>{stage.type.split("-").join(" ")}</h4>
                            {stage.status === "pending" ? (
                              <SendReminderToStageApprover
                                approvalStageId={stage.id}
                                entityId={id}
                                entityType={type}
                              />
                            ) : (
                              <AppButton label={stage.status} />
                            )}
                          </div>
                        }
                      />
                    );
                  })}
                </Steps>
              </div>
            </div>
          </ErrorWrapper>
        </Skeleton>
      </ErrorBoundary>
    </Modal>
  );
};

export default ViewApprovalStages;
