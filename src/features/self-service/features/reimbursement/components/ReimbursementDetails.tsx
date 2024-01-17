import { DatePicker, Form, Input, Modal, Skeleton } from "antd";
import React, { useEffect } from "react";
import { IModalProps } from "types";
import { useGetSingleReimbursementRequisition } from "../../requisitions/hooks/reimbursement/useGetSingleReimbursementRequisition";
import { useApiAuth } from "hooks/useApiAuth";
import { AppButton } from "components/button/AppButton";
import { boxStyle } from "styles/reused";
import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";
import moment from "moment";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";

interface IProps extends IModalProps {
  id: number;
}

export const ReimbursementDetails: React.FC<IProps> = ({
  open,
  handleClose,
  id,
}) => {
  const { companyId, token } = useApiAuth();
  const [form] = Form.useForm();
  const { data, isFetching } = useGetSingleReimbursementRequisition({
    id,
    companyId,
    token,
  });
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        date: data.date ? moment(data.date) : null,
        employeeName: `${getEmployeeFullName(data.employee)}`,
        employeeID: data.employee.empUid,
        description: data.description,
        status: data.status,
        amount: data.amount,
      });
    }
  }, [id, form, data]);
  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={"Reimbursement Details"}
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
          <Form.Item name={"amount"} label="Amount">
            <Input />
          </Form.Item>

          <Form.Item name={"description"} label="Description">
            <Input.TextArea />
          </Form.Item>
          {data && data?.attachmentUrls?.length > 0 && (
            <Form.Item name={"attachment"} label="Attachment">
              <div className={boxStyle}>
                {data?.attachmentUrls.map((item, i) => (
                  <a
                    href={item}
                    className="mb-2 text-sm underline text-caramel hover:no-underline"
                  >
                    Document {i + 1}
                  </a>
                ))}
              </div>
            </Form.Item>
          )}
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
