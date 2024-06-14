import { DatePicker, Form, Input, Modal, Skeleton } from "antd";
import React, { useEffect } from "react";
import { IModalProps } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { boxStyle } from "styles/reused";
import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";
import dayjs from "dayjs";
import {
  QUERY_KEY_FOR_SINGLE_MONEY_REQUISITION,
  useGetSingleMoneyRequisition,
} from "../../requisitions/hooks/money/useGetSingleMoneyRequisition";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";
import { TApprovalRequest } from "features/core/workflows/types/approval-requests";
import ApproveOrRejectButton from "features/core/workflows/components/approval-request/ApproveOrRejectButton";
import { useQueryClient } from "react-query";
import { QUERY_KEY_FOR_MONEY_REQUISITIONS } from "../../requisitions/hooks/money/useGetMoneyRequisitions";
import { QUERY_KEY_FOR_MONEY_REQUISITIONS_FOR_AUTH_EMPLOYEE } from "../../requisitions/hooks/money/useGetMoneyRequisitions4AuthEmployee";

interface IProps extends IModalProps {
  id: number;
  approvalRequest?: TApprovalRequest;
}

export const MonetaryRequestDetails: React.FC<IProps> = ({
  open,
  handleClose,
  id,
  approvalRequest,
}) => {
  const { companyId, token } = useApiAuth();
  const [form] = Form.useForm();
  const { data, isFetching } = useGetSingleMoneyRequisition({
    id,
    companyId,
    token,
  });
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        date: data.date ? dayjs(data.date) : null,
        employeeName: getEmployeeFullName(data.employee),
        employeeID: data.employee.empUid,
        purpose: data.purpose,
        status: data.status,
        amount: data.amount,
      });
    }
  }, [id, form, data]);
  const queryClient = useQueryClient();

  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={"Monetary Request Details"}
      style={{ top: 20 }}
    >
      <Skeleton active loading={isFetching} paragraph={{ rows: 8 }}>
        <ApproveOrRejectButton
          className="flex justify-end"
          request={approvalRequest}
          handleSuccess={() => {
            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY_FOR_MONEY_REQUISITIONS],
              // exact: true,
            });
            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY_FOR_MONEY_REQUISITIONS_FOR_AUTH_EMPLOYEE],
              // exact: true,
            });
            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY_FOR_SINGLE_MONEY_REQUISITION, id],
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
          <Form.Item name={"amount"} label="Amount">
            <Input />
          </Form.Item>

          <Form.Item name={"purpose"} label="Purpose">
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
