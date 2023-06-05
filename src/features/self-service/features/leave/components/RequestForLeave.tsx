import { DatePicker, Form, Input, Modal, Switch } from "antd";
import React, { useState } from "react";
import { useQueryClient } from "react-query";

import { FormEmployeeInput } from "features/core/employees/components/FormEmployeeInput";
import { useCurrentFileUploadUrl } from "hooks/useCurrentFileUploadUrl";
import { IModalProps } from "types";
import {
  generalValidationRules,
  textInputValidationRules,
} from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { FileUpload } from "components/FileUpload";
import { AppButton } from "components/button/AppButton";
import { FormLeaveTypeInput } from "./FormLeaveTypeInput";
import { useCreateLeave } from "../hooks/useCreateLeave";
import { useApiAuth } from "hooks/useApiAuth";
import { QUERY_KEY_FOR_LEAVES } from "../hooks/useFetchLeaves";
import { useFetchSingleEmployee } from "features/core/employees/hooks/useFetchSingleEmployee";

interface IProps extends IModalProps {}

const boxStyle = "px-4 py-3 shadow rounded-md bg-mainBg mb-4";
const boxTitle = "font-medium text-sm pb-1";

export const RequestForLeave: React.FC<IProps> = ({ handleClose, open }) => {
  // should be from global state - user leave days left
  const [leaveLength, setLeaveLength] = useState(0);
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const { mutate, isLoading } = useCreateLeave();
  const { currentUserEmployeeId } = useApiAuth();
  const { data: employee } = useFetchSingleEmployee({
    employeeId: currentUserEmployeeId,
  });

  const documentUrl = useCurrentFileUploadUrl("documentUrl");
  const handleSubmit = (data: any) => {
    const departmentId = employee?.designation?.department.id;
    if (departmentId) {
      mutate(
        {
          employeeId: currentUserEmployeeId,
          departmentId, //TODO: Tell toyin(backend) to populate this if it will be used
          startDate: data.duration[0].toString(),
          endDate: data.duration[1].toString(),
          length: leaveLength,
          leaveTypeId: 1,
          reason: data.reason,
          requestAllowance: data.requestAllowance,
          workAssigneeId: data.workAssigneeId,
          documentUrls: !!documentUrl ? [documentUrl] : [],
        },
        {
          onError: (err: any) => {
            openNotification({
              state: "error",
              title: "Error Occurred",
              description:
                err?.response.data.message ?? err?.response.data.error.message,
            });
          },
          onSuccess: (res: any) => {
            openNotification({
              state: "success",

              title: "Success",
              description: res.data.message,
              // duration: 0.4,
            });
            setLeaveLength(0);
            form.resetFields();
            handleClose();

            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY_FOR_LEAVES],
              // exact: true,
            });
          },
        }
      );
    } else {
      openNotification({
        state: "error",
        title: "Error Occurred",
        description: `You currently do not belong to a department, so you're not eligible to take leaves`,
        duration: 0,
      });
    }
  };
  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={"Apply for Leave"}
      style={{ top: 20 }}
    >
      <Form
        layout="vertical"
        requiredMark={false}
        form={form}
        onFinish={handleSubmit}
      >
        <Form.Item
          name="duration"
          rules={generalValidationRules}
          label="Duration"
        >
          <DatePicker.RangePicker
            placeholder={["Start Date", "End Date"]}
            className="w-full"
            onChange={(period) =>
              period &&
              period[0] &&
              period[1] &&
              setLeaveLength(period[1].diff(period[0], "days") + 1)
            }
          />
        </Form.Item>
        <Form.Item label="Number of days">
          <Input placeholder="Number of days" disabled value={leaveLength} />
        </Form.Item>
        <FormLeaveTypeInput
          Form={Form}
          control={{ name: "leaveTypeId", label: "Leave Type" }}
        />
        <FormEmployeeInput
          Form={Form}
          control={{
            name: "workAssigneeId",
            label: "Select Work Assignee/Relieve",
          }}
        />

        <Form.Item name="reason" rules={textInputValidationRules}>
          <Input.TextArea rows={4} placeholder="Reason" />
        </Form.Item>
        <Form.Item
          name="requestAllowance"
          rules={generalValidationRules}
          label="Request Allowance "
        >
          <Switch />
        </Form.Item>
        <div className={boxStyle}>
          <FileUpload
            allowedFileTypes={[
              "image/jpeg",
              "image/png",
              "image/jpg",
              "application/pdf",
            ]}
            fileKey="documentUrl"
            textToDisplay="Upload Supporting Document For Leave"
            displayType="form-space-between"
          />
        </div>
        <div className="flex justify-end">
          <AppButton isLoading={isLoading} type="submit" />
        </div>
      </Form>
    </Modal>
  );
};
