import { DatePicker, Form, Input, Modal, Select } from "antd";
import { AppButton } from "components/button/AppButton";
import React, { useEffect, useState } from "react";
import { IModalProps } from "types";
import {
  dateHasToBeGreaterThanOrEqualToCurrentDayRule,
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
import {
  TASK_ASSIGNEE_TASK_STATUS_OPTIONS,
  TASK_ASSIGNER_TASK_STATUS_OPTIONS,
} from "../constants";
import moment, { Moment } from "moment";
import { FormEmployeeInput } from "features/core/employees/components/FormEmployeeInput";

interface IProps extends IModalProps {
  task: TTask;
  isTaskAssigner: boolean;
}

export const EditTask: React.FC<IProps> = ({
  open,
  handleClose,
  task,
  isTaskAssigner,
}) => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm();
  const { mutate, isLoading } = useUpdateTask();

  const handleSubmit = (data: any) => {
    mutate(
      {
        id: task.id,
        body: {
          status: data.status,
          priority: data.priority,
          dueDate: (data.dueDate as Moment).toISOString(),
          dateAssigned: (data.dateAssigned as Moment).toISOString(),
          assignedToId: data.assignedToId,
          description: data.description,
          name: data?.name,
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
      assignedToId: data.assignedTo.id,
      priority: data.priority, // enum: low, medium, high
      dateAssigned: moment(data.dateAssigned),
      dueDate: moment(data.dueDate),
      status: data.status,
    });
  }, [form, task]);
  const [dateAssigned, setDateAssigned] = useState<Moment | null>(null);

  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={task.status === "closed" ? "View Task" : "Update Task"}
      style={{ top: 20 }}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        requiredMark={false}
        disabled={task.status === "closed"}
      >
        <Form.Item rules={textInputValidationRules} name="name" label="Name">
          <Input placeholder="Name" disabled={!isTaskAssigner} />
        </Form.Item>
        <Form.Item
          rules={textInputValidationRules}
          name="description"
          label="Description"
        >
          <Input.TextArea
            placeholder="Description"
            disabled={!isTaskAssigner}
          />
        </Form.Item>
        <FormEmployeeInput
          Form={Form}
          control={{ name: "assignedToId", label: "Assigned To" }}
          disabled={!isTaskAssigner}
        />
        <Form.Item
          rules={generalValidationRules}
          name="priority"
          label="Priority"
        >
          <Select
            placeholder="Priority"
            options={PRIORITIES}
            disabled={!isTaskAssigner}
          />
        </Form.Item>
        <Form.Item
          rules={[dateHasToBeGreaterThanOrEqualToCurrentDayRule]}
          name="dateAssigned"
          label="Date Assigned"
        >
          <DatePicker
            placeholder="Date Assigned"
            disabled={!isTaskAssigner}
            onChange={(val) => setDateAssigned(val)}
            className="w-full"
          />
        </Form.Item>
        <Form.Item rules={generalValidationRules} name="status" label="Status">
          <Select
            options={
              isTaskAssigner
                ? TASK_ASSIGNER_TASK_STATUS_OPTIONS
                : TASK_ASSIGNEE_TASK_STATUS_OPTIONS
            }
            placeholder="Status"
            disabled={task.status === "closed"}
          />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              validator: async (_, value: Moment) => {
                if (value.isBefore(dateAssigned)) {
                  throw new Error("Due date cannot be before date assigned!");
                }

                return true;
              },
            },
          ]}
          name="dueDate"
          label="Due Date"
        >
          <DatePicker
            placeholder="Due Date"
            disabled={!isTaskAssigner}
            className="w-full"
          />
        </Form.Item>

        {task.status !== "closed" && (
          <div className="flex justify-end">
            <AppButton type="submit" isLoading={isLoading} />
          </div>
        )}
      </Form>
    </Modal>
  );
};
