import { DatePicker, Form, Input, Modal, Skeleton, Switch } from "antd";
import React, { useEffect } from "react";
import { IModalProps } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";
import dayjs from "dayjs";
import {
  QUERY_KEY_FOR_SINGLE_TRAVEL_REQUEST,
  useGetSingleTravelRequisition,
} from "../../requisitions/hooks/travel/useGetSingleTravelRequisition";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";
import { TApprovalRequest } from "features/core/workflows/types/approval-requests";
import { useQueryClient } from "react-query";
import ApproveOrRejectButton from "features/core/workflows/components/approval-request/ApproveOrRejectButton";
import { QUERY_KEY_FOR_TRAVEL_REQUESTS } from "../../requisitions/hooks/travel/useGetTravelRequisitions";
import { QUERY_KEY_FOR_TRAVEL_REQUISITIONS_FOR_AUTH_EMPLOYEE } from "../../requisitions/hooks/travel/useGetTravelRequisitions4AuthEmployee";
import { QUERY_KEY_FOR_SELF_SERVICE_DB_ANALYTICS } from "features/self-service/hooks/useGetSelfServiceDashboardAnalytics";

interface IProps extends IModalProps {
  id: number;
  approvalRequest?: TApprovalRequest;
}

export const TravelRequestDetails: React.FC<IProps> = ({
  open,
  handleClose,
  id,
  approvalRequest,
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
        arrivalDate: data.arrivalDate ? dayjs(data.arrivalDate) : null,
        departureDate: data.departureDate ? dayjs(data.departureDate) : null,
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
  const queryClient = useQueryClient();

  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={"Travel Request Details"}
      style={{ top: 20 }}
    >
      <Skeleton active loading={isFetching} paragraph={{ rows: 8 }}>
        <ApproveOrRejectButton
          className="flex justify-end"
          request={approvalRequest}
          handleSuccess={() => {
            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY_FOR_TRAVEL_REQUESTS],
              // exact: true,
            });
            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY_FOR_TRAVEL_REQUISITIONS_FOR_AUTH_EMPLOYEE],
              // exact: true,
            });
            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY_FOR_SINGLE_TRAVEL_REQUEST, id],
              // exact: true,
            });

            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY_FOR_SELF_SERVICE_DB_ANALYTICS],
              // exact: true,
            });
            handleClose();
          }}
        />
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
      </Skeleton>
    </Modal>
  );
};
