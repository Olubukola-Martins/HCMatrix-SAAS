import { Form, Input, Modal, Skeleton } from "antd";
import React, { useEffect } from "react";
import { IModalProps } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { boxStyle } from "styles/reused";
import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";
import {
  QUERY_KEY_FOR_SINGLE_PROMOTION_REQUISITION,
  useGetSinglePromotionRequisition,
} from "../../requisitions/hooks/promotion/useGetSinglePromotionRequisition";
import dayjs from "dayjs";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import ApproveOrRejectButton from "features/core/workflows/components/approval-request/ApproveOrRejectButton";
import { TApprovalRequest } from "features/core/workflows/types/approval-requests";
import { useQueryClient } from "react-query";
import { QUERY_KEY_FOR_PROMOTION_REQUISITIONS } from "../../requisitions/hooks/promotion/useGetPromotionRequisitions";
import { QUERY_KEY_FOR_PROMOTION_REQUISITIONS_FOR_AUTH_EMPLOYEE } from "../../requisitions/hooks/promotion/useGetPromotionRequisitions4AuthEmployee";
import { QUERY_KEY_FOR_SELF_SERVICE_DB_ANALYTICS } from "features/self-service/hooks/useGetSelfServiceDashboardAnalytics";

interface IProps extends IModalProps {
  id: number;
  approvalRequest?: TApprovalRequest;
}

export const ProfileEditRequestDetails: React.FC<IProps> = ({
  open,
  handleClose,
  id,
  approvalRequest,
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
        date: dayjs(data.date).format(DEFAULT_DATE_FORMAT),
        employeeName: `${data.employee.firstName} ${data.employee.lastName}`,
        preferredStartDate: dayjs(data.preferredStartDate).format(
          DEFAULT_DATE_FORMAT
        ),
        employeeID: data.employee.empUid,
        proposedDesignation: data.proposedDesignation.name,
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
      title={"Profile Edit Request Details"}
      style={{ top: 20 }}
    >
      <Skeleton active loading={isFetching} paragraph={{ rows: 8 }}>
        <ApproveOrRejectButton
          className="flex justify-end"
          request={approvalRequest}
          handleSuccess={() => {
            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY_FOR_PROMOTION_REQUISITIONS],
              // exact: true,
            });
            queryClient.invalidateQueries({
              queryKey: [
                QUERY_KEY_FOR_PROMOTION_REQUISITIONS_FOR_AUTH_EMPLOYEE,
              ],
              // exact: true,
            });
            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY_FOR_SINGLE_PROMOTION_REQUISITION, id],
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
          <Form.Item name={"justification"} label="Justification">
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
