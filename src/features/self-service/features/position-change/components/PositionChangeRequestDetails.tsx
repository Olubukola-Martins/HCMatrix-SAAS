import { DatePicker, Form, Input, Modal, Skeleton } from "antd";
import React, { useEffect } from "react";
import { IModalProps } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { AppButton } from "components/button/AppButton";
import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";
import moment from "moment";
import { useGetSinglePositionChangeRequisition } from "../../requisitions/hooks/position-change/useGetSinglePositionChangeRequisition";

interface IProps extends IModalProps {
  id: number;
}

export const PositionChangeRequestDetails: React.FC<IProps> = ({
  open,
  handleClose,
  id,
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
        date: data.date ? moment(data.date) : null,
        employeeName: `${data.employee.firstName} ${data.employee.lastName}`,
        proposedDesignation: data.proposedDesignation.name,
        skillsAndQualifications: data.skillsAndQualifications,
        reason: data.reason,
        justification: data.justification,
      });
    }
  }, [id, form, data]);
  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={"Monetary Request Details"}
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
          <Form.Item name={"proposedDesignation"} label="Proposed Designation">
            <Input />
          </Form.Item>
          <Form.Item
            name={"skillsAndQualifications"}
            label="Skills And Qualifications"
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item name={"reason"} label="reason">
            <Input.TextArea />
          </Form.Item>
          <Form.Item name={"justification"} label="justification">
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
        <div className="flex justify-end">
          <AppButton label="Download" type="button" />
        </div>
      </Skeleton>
    </Modal>
  );
};
