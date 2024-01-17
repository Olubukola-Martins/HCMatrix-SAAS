import { DatePicker, Form, Input, Modal, Skeleton } from "antd";
import React, { useEffect } from "react";
import { IModalProps } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";
import moment from "moment";
import { useGetSingleTranferRequisition } from "../../requisitions/hooks/transfer/useGetSingleTransferRequisition";

interface IProps extends IModalProps {
  id: number;
}

export const TransferDetails: React.FC<IProps> = ({
  open,
  handleClose,
  id,
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
        date: data.date ? moment(data.date) : null,
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
  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={"Transfer Details"}
      style={{ top: 20 }}
    >
      <Skeleton active loading={isFetching} paragraph={{ rows: 8 }}>
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
