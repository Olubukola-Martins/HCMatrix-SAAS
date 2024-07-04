import { DatePicker, Form, Input, Modal, Skeleton } from "antd";
import React, { useEffect } from "react";
import { IModalProps } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";
import dayjs from "dayjs";
import {
  QUERY_KEY_FOR_SINGLE_POSITION_CHANGE_REQUISITION,
  useGetSinglePositionChangeRequisition,
} from "../../requisitions/hooks/position-change/useGetSinglePositionChangeRequisition";
import { TApprovalRequest } from "features/core/workflows/types/approval-requests";
import { useQueryClient } from "react-query";
import ApproveOrRejectButton from "features/core/workflows/components/approval-request/ApproveOrRejectButton";
import { QUERY_KEY_FOR_POSITION_CHANGE_REQUISITIONS } from "../../requisitions/hooks/position-change/useGetPositionChangeRequisitions";
import { QUERY_KEY_FOR_POSITION_CHANGE_REQUISITIONS_FOR_AUTH_EMPLOYEE } from "../../requisitions/hooks/position-change/useGetPositionChangeRequisitions4AuthEmployee";

interface IProps extends IModalProps {
  id: number;
  approvalRequest?: TApprovalRequest;
}

export const PositionChangeRequestDetails: React.FC<IProps> = ({
  open,
  handleClose,
  id,
  approvalRequest,
}) => {
  const { companyId, token } = useApiAuth();
  const [form] = Form.useForm();
  const { data, isFetching } = useGetSinglePositionChangeRequisition({
    id,
    companyId,
    token,
  });
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        date: data.date ? dayjs(data.date) : null,
        employeeName: `${data.employee.firstName} ${data.employee.lastName}`,
        proposedDesignation: data.proposedDesignation.name,
        skillsAndQualifications: data.skillsAndQualifications,
        reason: data.reason,
        justification: data.justification,
        status: data.status,
      });
    }
  }, [id, form, data]);
  const queryClient = useQueryClient();

  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={"Position Change Details"}
      style={{ top: 20 }}
    >
      <Skeleton active loading={isFetching} paragraph={{ rows: 8 }}>
        <ApproveOrRejectButton
          className="flex justify-end"
          request={approvalRequest}
          handleSuccess={() => {
            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY_FOR_POSITION_CHANGE_REQUISITIONS],
              // exact: true,
            });
            queryClient.invalidateQueries({
              queryKey: [
                QUERY_KEY_FOR_POSITION_CHANGE_REQUISITIONS_FOR_AUTH_EMPLOYEE,
              ],
              // exact: true,
            });
            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY_FOR_SINGLE_POSITION_CHANGE_REQUISITION, id],
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
          <Form.Item name={"proposedDesignation"} label="Proposed Designation">
            <Input />
          </Form.Item>
          <Form.Item
            name={"skillsAndQualifications"}
            label="Skills And Qualifications"
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item name={"reason"} label="Reason">
            <Input.TextArea />
          </Form.Item>
          <Form.Item name={"justification"} label="Justification">
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
