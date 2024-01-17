import { DatePicker, Form, Input, Modal, Skeleton } from "antd";
import React, { useEffect } from "react";
import { IModalProps } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";
import moment from "moment";
import { useGetSingleJobRequisition } from "../../requisitions/hooks/job/useGetSingleJobRequisition";

interface IProps extends IModalProps {
  id: number;
}

export const JobRequestDetails: React.FC<IProps> = ({
  open,
  handleClose,
  id,
}) => {
  const { companyId, token } = useApiAuth();
  const [form] = Form.useForm();
  const { data, isFetching } = useGetSingleJobRequisition({
    id,
    companyId,
    token,
  });
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        date: data.date ? moment(data.date) : null,
        designation: data.designation.name,
        employmentType: data.employmentType,
        salaryRange: data.salaryRange,
        status: data.status,
        educationRequirements: data.educationRequirements,
        skillsAndQualifications: data.skillsAndQualifications,
        preferredStartDate: data.preferredStartDate
          ? moment(data.preferredStartDate)
          : null,
      });
    }
  }, [id, form, data]);
  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={"Job Request Details"}
      style={{ top: 20 }}
    >
      <Skeleton active loading={isFetching} paragraph={{ rows: 8 }}>
        <Form form={form} disabled layout="vertical">
          <Form.Item name={"date"} label="Date">
            <DatePicker className="w-full" />
          </Form.Item>
          <Form.Item name={"preferredStartDate"} label="Preferred Start Date">
            <DatePicker className="w-full" />
          </Form.Item>
          <Form.Item name={"designation"} label="Designation">
            <Input />
          </Form.Item>
          <Form.Item name={"employmentType"} label="Employment Type">
            <Input />
          </Form.Item>
          <Form.Item name={"salaryRange"} label="Salary Range">
            <Input />
          </Form.Item>
          <Form.Item
            name={"educationRequirements"}
            label="Education Requirements"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={"skillsAndQualifications"}
            label="Skills And Qualifications"
          >
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
