import { DatePicker, Form, Input, Modal, Skeleton } from "antd";
import React, { useEffect } from "react";
import { IModalProps } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";
import dayjs from "dayjs";
import {
  QUERY_KEY_FOR_SINGLE_JOB_REQUISITION,
  useGetSingleJobRequisition,
} from "../../requisitions/hooks/job/useGetSingleJobRequisition";
import { TApprovalRequest } from "features/core/workflows/types/approval-requests";
import { useQueryClient } from "react-query";
import ApproveOrRejectButton from "features/core/workflows/components/approval-request/ApproveOrRejectButton";
import { QUERY_KEY_FOR_JOB_REQUISITIONS } from "../../requisitions/hooks/job/useGetJobRequisitions";
import { QUERY_KEY_FOR_JOB_REQUISITIONS_FOR_AUTH_EMPLOYEE } from "../../requisitions/hooks/job/useGetJobRequisitions4AuthEmployee";

interface IProps extends IModalProps {
  id: number;
  approvalRequest?: TApprovalRequest;
}

export const JobRequestDetails: React.FC<IProps> = ({
  open,
  handleClose,
  id,
  approvalRequest,
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
        date: data.date ? dayjs(data.date) : null,
        designation: data.designation.name,
        employmentType: data.employmentType,
        salaryRange: data.salaryRange,
        status: data.status,
        educationRequirements: data.educationRequirements,
        skillsAndQualifications: data.skillsAndQualifications,
        preferredStartDate: data.preferredStartDate
          ? dayjs(data.preferredStartDate)
          : null,
      });
    }
  }, [id, form, data]);
  const queryClient = useQueryClient();

  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={"Job Request Details"}
      style={{ top: 20 }}
    >
      <Skeleton active loading={isFetching} paragraph={{ rows: 8 }}>
        <ApproveOrRejectButton
          className="flex justify-end"
          request={approvalRequest}
          handleSuccess={() => {
            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY_FOR_JOB_REQUISITIONS],
              // exact: true,
            });
            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY_FOR_JOB_REQUISITIONS_FOR_AUTH_EMPLOYEE],
              // exact: true,
            });
            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY_FOR_SINGLE_JOB_REQUISITION, id],
              // exact: true,
            });

            handleClose();
          }}
        />
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
