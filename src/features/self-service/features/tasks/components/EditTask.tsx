import { Form, Input, Modal, Select } from "antd";
import { AppButton } from "components/button/AppButton";
import React, { useEffect } from "react";
import { IModalProps } from "types";
import {
  generalValidationRules,
  textInputValidationRules,
} from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { QUERY_KEY_FOR_TASKS_ASSIGNED_BY_EMPLOYEE } from "../hooks/assignee/useGetAllTasksAssignedByEmployee";
import { QUERY_KEY_FOR_TASKS_ASSIGNED_TO_EMPLOYEE } from "../hooks/assignedFor/useGetAllTasksAssignedToEmployee";
import { PRIORITIES } from "constants/general";
import { TTask } from "../types";
import { useUpdateTask } from "../hooks/useUpdateTask";
import { TASK_STATUS_OPTIONS } from "../constants";
import moment from "moment";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";

interface IProps extends IModalProps {
  task: TTask;
}

export const EditTask: React.FC<IProps> = ({ open, handleClose, task }) => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm();
  const { mutate, isLoading } = useUpdateTask();

  const handleSubmit = (data: any) => {
    mutate(
      {
        id: task.id,
        body: {
          status: data.status,
        },
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
          form.resetFields();
          handleClose();

          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_TASKS_ASSIGNED_TO_EMPLOYEE],
            // exact: true,
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_TASKS_ASSIGNED_BY_EMPLOYEE],
            // exact: true,
          });
        },
      }
    );
  };
  useEffect(() => {
    const data = task;
    form.setFieldsValue({
      name: data.name,
      description: data.description,
      assignedToId: getEmployeeFullName(data.assignedTo),
      priority: data.priority, // enum: low, medium, high
      dateAssigned: moment(data.dateAssigned).format("YYYY-MM-DD"),
      dueDate: moment(data.dueDate).format("YYYY-MM-DD"),
    });
  }, [form, task]);
  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={"Add Task"}
      style={{ top: 20 }}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        requiredMark={false}
      >
        <Form.Item rules={textInputValidationRules} name="name" label="Name">
          <Input placeholder="Name" disabled />
        </Form.Item>
        <Form.Item
          rules={textInputValidationRules}
          name="description"
          label="Description"
        >
          <Input.TextArea placeholder="Description" disabled />
        </Form.Item>
        <Form.Item
          rules={textInputValidationRules}
          name="assignedToId"
          label="Assigned To"
        >
          <Input placeholder="Assigned To" disabled />
        </Form.Item>
        <Form.Item
          rules={generalValidationRules}
          name="priority"
          label="Priority"
        >
          <Select placeholder="Priority" options={PRIORITIES} disabled />
        </Form.Item>
        <Form.Item
          rules={generalValidationRules}
          name="dateAssigned"
          label="Date Assigned"
        >
          <Input placeholder="Date Assigned" disabled />
        </Form.Item>
        <Form.Item rules={generalValidationRules} name="status" label="Status">
          <Select options={TASK_STATUS_OPTIONS} placeholder="Status" />
        </Form.Item>
        <Form.Item
          rules={generalValidationRules}
          name="dueDate"
          label="Due Date"
        >
          <Input placeholder="Due Date" disabled />
        </Form.Item>

        <div className="flex justify-end">
          <AppButton type="submit" isLoading={isLoading} />
        </div>
      </Form>
    </Modal>
  );
};
