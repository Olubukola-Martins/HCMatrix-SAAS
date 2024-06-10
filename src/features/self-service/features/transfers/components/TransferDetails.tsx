import { DatePicker, Form, Input, Modal, Skeleton } from "antd";
import React, { useEffect } from "react";
import { IModalProps } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";
import dayjs from "dayjs";
import {
  QUERY_KEY_FOR_SINGLE_TRANSFER_REQUISITION,
  useGetSingleTranferRequisition,
} from "../../requisitions/hooks/transfer/useGetSingleTransferRequisition";
import { TApprovalRequest } from "features/core/workflows/types/approval-requests";
import ApproveOrRejectButton from "features/core/workflows/components/approval-request/ApproveOrRejectButton";
import { useQueryClient } from "react-query";
import { QUERY_KEY_FOR_TRANSFER_REQUISITIONS } from "../../requisitions/hooks/transfer/useGetTransferRequisitions";
import { QUERY_KEY_FOR_TRANSFER_REQUISITIONS_FOR_AUTH_EMPLOYEE } from "../../requisitions/hooks/transfer/useGetTransferRequisitions4AuthEmployee";

interface IProps extends IModalProps {
  id: number;
  approvalRequest?: TApprovalRequest;
}

export const TransferDetails: React.FC<IProps> = ({
  open,
  handleClose,
  id,
  approvalRequest,
}) => {
  const { companyId, token } = useApiAuth();
  const [form] = Form.useForm();
  const { data, isFetching } = useGetSingleTranferRequisition({
    id,
    companyId,
    token,
  });
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        date: data.date ? dayjs(data.date) : null,
        employeeName: `${data.employee.firstName} ${data.employee.lastName}`,
        employeeID: data.employee.empUid,
        reason: data.reason,
        status: data.status,
        skillsAndQualifications: data.skillsAndQualifications,
        proposedBranch: data.proposedBranch.name,
        proposedDesignation: data.proposedDesignation.name,
      });
    }
  }, [id, form, data]);
  const queryClient = useQueryClient();

  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={"Transfer Details"}
      style={{ top: 20 }}
    >
      <Skeleton active loading={isFetching} paragraph={{ rows: 8 }}>
        <ApproveOrRejectButton
          className="flex justify-end"
          request={approvalRequest}
          handleSuccess={() => {
            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY_FOR_TRANSFER_REQUISITIONS],
              // exact: true,
            });
            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY_FOR_TRANSFER_REQUISITIONS_FOR_AUTH_EMPLOYEE],
              // exact: true,
            });
            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY_FOR_SINGLE_TRANSFER_REQUISITION, id],
              // exact: true,
            });

            handleClose();
          }}
        />
        <Form form={form} disabled layout="vertical">
          <Form.Item name={"date"} label="Date">
            <DatePicker className="w-full" />
          </Form.Item>
          <Form.Item name={"employeeName"} label="Employee Name">
            <Input />
          </Form.Item>
          <Form.Item name={"employeeID"} label="Employee ID">
            <Input />
          </Form.Item>

          <Form.Item name={"proposedBranch"} label="Proposed Branch">
            <Input />
          </Form.Item>
          <Form.Item name={"proposedDesignation"} label="Proposed Designation">
            <Input />
          </Form.Item>
          <Form.Item name={"reason"} label="Reason">
            <Input.TextArea />
          </Form.Item>

          <Form.Item name={"status"} label="Status">
            <Input
              className="capitalize"
              style={{
                color: getAppropriateColorForStatus(data?.status ?? ""),
              }}
            />
          </Form.Item>
        </Form>
      </Skeleton>
    </Modal>
  );
};
