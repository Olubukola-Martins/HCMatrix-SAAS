import { Form, Input, Modal, Skeleton } from "antd";
import React, { useEffect } from "react";
import { IModalProps } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { AppButton } from "components/button/AppButton";
import { boxStyle } from "styles/reused";
import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";
import { useGetSinglePromotionRequisition } from "../../requisitions/hooks/promotion/useGetSinglePromotionRequisition";
import moment from "moment";

interface IProps extends IModalProps {
  id: number;
}

export const PromotionRequestDetails: React.FC<IProps> = ({
  open,
  handleClose,
  id,
}) => {
  const { companyId, token } = useApiAuth();
  const [form] = Form.useForm();
  const { data, isFetching } = useGetSinglePromotionRequisition({
    id,
    companyId,
    token,
  });
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        date: moment(data.date).format("YYYY-MM-DD"),
        employeeName: `${data.employee.firstName} ${data.employee.lastName}`,
        preferredStartDate: moment(data.preferredStartDate).format(
          "YYYY-MM-DD"
        ),
        employeeID: data.employee.empUid,
        proposedDesignation: data.proposedDesignation.name,
        justification: data.justification,
        status: data.status,
      });
    }
  }, [id, form, data]);
  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={"Promotion Request Details"}
      style={{ top: 20 }}
    >
      <Skeleton active loading={isFetching} paragraph={{ rows: 8 }}>
        <Form form={form} disabled layout="vertical">
          <Form.Item name={"date"} label="Date">
            <Input className="w-full" />
          </Form.Item>
          <Form.Item name={"preferredStartDate"} label="Preferred Start Date">
            <Input className="w-full" />
          </Form.Item>
          <Form.Item name={"employeeName"} label="Employee Name">
            <Input />
          </Form.Item>
          <Form.Item name={"employeeID"} label="Employee ID">
            <Input />
          </Form.Item>
          <Form.Item name={"proposedDesignation"} label="Proposed Designation">
            <Input />
          </Form.Item>
          <Form.Item name={"justification"} label="justification">
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
        <div className="flex justify-end">
          <AppButton label="Download" type="button" />
        </div>
      </Skeleton>
    </Modal>
  );
};
