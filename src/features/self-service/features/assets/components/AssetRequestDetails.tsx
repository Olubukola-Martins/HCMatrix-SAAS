import { DatePicker, Form, Input, Modal, Skeleton } from "antd";
import React, { useEffect } from "react";
import { IModalProps } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import moment from "moment";
import {
  QUERY_KEY_FOR_SINGLE_ASSET_REQUISITION,
  useGetSingleAssetRequisition,
} from "../../requisitions/hooks/asset/useGetSingleAssetRequisition";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";
import { boxStyle } from "styles/reused";
import ApproveOrRejectButton from "features/core/workflows/components/approval-request/ApproveOrRejectButton";
import { QUERY_KEY_FOR_ASSET_REQUISITIONS } from "../../requisitions/hooks/asset/useGetAssetRequisitions";
import { QUERY_KEY_FOR_ASSET_REQUISITIONS_FOR_AUTH_EMPLOYEE } from "../hooks/requisitions/useGetAssetRequisitions4AuthEmployee";
import { QUERY_KEY_FOR_ASSET_ANALYTICS } from "../hooks/useGetAssetAnalytics";
import { TApprovalRequest } from "features/core/workflows/types/approval-requests";
import { useQueryClient } from "react-query";

interface IProps extends IModalProps {
  id: number;
  approvalRequest?: TApprovalRequest;
}

export const AssetRequestDetails: React.FC<IProps> = ({
  open,
  handleClose,
  id,
  approvalRequest,
}) => {
  const { companyId, token } = useApiAuth();
  const [form] = Form.useForm();
  const { data, isFetching } = useGetSingleAssetRequisition({
    id,
    companyId,
    token,
  });
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        date: data.date ? moment(data.date) : null,
        employee: getEmployeeFullName(data.employee),
        asset: data.asset.name,
        description: data.description,
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
      title={"Asset Request Details"}
      style={{ top: 20 }}
    >
      <Skeleton active loading={isFetching} paragraph={{ rows: 8 }}>
        <ApproveOrRejectButton
          className="flex justify-end"
          request={approvalRequest}
          handleSuccess={() => {
            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY_FOR_ASSET_REQUISITIONS],
              // exact: true,
            });
            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY_FOR_ASSET_REQUISITIONS_FOR_AUTH_EMPLOYEE],
              // exact: true,
            });
            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY_FOR_SINGLE_ASSET_REQUISITION, id],
              // exact: true,
            });

            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY_FOR_ASSET_ANALYTICS],
              // exact: true,
            });
            handleClose();
          }}
        />
        <Form form={form} disabled layout="vertical">
          <Form.Item name={"date"} label="Date">
            <DatePicker className="w-full" />
          </Form.Item>

          <Form.Item name={"status"} label="Status">
            <Input className="capitalize" />
          </Form.Item>
          <Form.Item name={"employee"} label="Employee">
            <Input />
          </Form.Item>
          <Form.Item name={"asset"} label="Asset">
            <Input />
          </Form.Item>
          <Form.Item name={"description"} label="Description">
            <Input.TextArea />
          </Form.Item>
          {data?.attachmentUrls && data?.attachmentUrls.length > 0 && (
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
          )}
        </Form>
      </Skeleton>
    </Modal>
  );
};
