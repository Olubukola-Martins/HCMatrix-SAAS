import { DatePicker, Form, Input, Modal, Skeleton, Switch } from "antd";
import React, { useEffect } from "react";
import { IModalProps } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { AppButton } from "components/button/AppButton";
import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";
import moment from "moment";
import { useGetSingleTravelRequisition } from "../../requisitions/hooks/travel/useGetSingleTravelRequisition";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";

interface IProps extends IModalProps {
  id: number;
}

export const TravelRequestDetails: React.FC<IProps> = ({
  open,
  handleClose,
  id,
}) => {
  const { companyId, token } = useApiAuth();
  const [form] = Form.useForm();
  const { data, isFetching } = useGetSingleTravelRequisition({
    id,
    companyId,
    token,
  });
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        arrivalDate: data.arrivalDate ? moment(data.arrivalDate) : null,
        departureDate: data.departureDate ? moment(data.departureDate) : null,
        employee: getEmployeeFullName(data.employee),
        cost: data.cost,
        duration: data.duration,
        location: data.location,
        reason: data.reason,
        priority: data.priority,
        clientName: data.clientName,
        status: data.status,
        billableToClient: !!data.billableToClient,
      });
    }
  }, [id, form, data]);
  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={"Travel Request Details"}
      style={{ top: 20 }}
    >
      <Skeleton active loading={isFetching} paragraph={{ rows: 8 }}>
        <Form form={form} disabled layout="vertical">
          <Form.Item name={"departureDate"} label="Departure Date">
            <DatePicker className="w-full" />
          </Form.Item>
          <Form.Item name={"arrivalDate"} label="Arrival Date">
            <DatePicker className="w-full" />
          </Form.Item>
          <Form.Item name={"employee"} label="Employee">
            <Input />
          </Form.Item>
          <Form.Item name={"cost"} label="Cost">
            <Input />
          </Form.Item>
          <Form.Item name={"duration"} label="Duration(days)">
            <Input />
          </Form.Item>
          <Form.Item name={"location"} label="Location">
            <Input.TextArea />
          </Form.Item>
          <Form.Item name={"reason"} label="Reason">
            <Input.TextArea />
          </Form.Item>
          <Form.Item name={"clientName"} label="Client Name">
            <Input />
          </Form.Item>
          <Form.Item name="billableToClient" label="Billable To Client ">
            <Switch
              defaultChecked={!!data?.billableToClient}
              checkedChildren="Yes"
              unCheckedChildren="No"
            />
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
