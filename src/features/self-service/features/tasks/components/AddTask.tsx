import { DatePicker, Form, Input, Modal, Select } from "antd";
import { AppButton } from "components/button/AppButton";
import React, { useState } from "react";
import { IModalProps } from "types";
import {
  dateHasToBeGreaterThanOrEqualToCurrentDayRule,
  generalValidationRules,
  textInputValidationRules,
} from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { useAddTask } from "../hooks/useAddTask";
import { QUERY_KEY_FOR_TASKS_ASSIGNED_BY_EMPLOYEE } from "../hooks/assignee/useGetAllTasksAssignedByEmployee";
import { QUERY_KEY_FOR_TASKS_ASSIGNED_TO_EMPLOYEE } from "../hooks/assignedFor/useGetAllTasksAssignedToEmployee";
import { FormEmployeeInput } from "features/core/employees/components/FormEmployeeInput";
import { PRIORITIES } from "constants/general";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import { Moment } from "moment";

export const AddTask: React.FC<IModalProps> = ({ open, handleClose }) => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm();
  const { mutate, isLoading } = useAddTask();

  const handleSubmit = (data: any) => {
    mutate(
      {
        name: data.name,
        description: data.description,
        assignedToId: data.assignedToId,
        priority: data.priority, // enum: low, medium, high
        dateAssigned: data.dateAssigned.format(DEFAULT_DATE_FORMAT),
        dueDate: data.dueDate.format(DEFAULT_DATE_FORMAT),
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
  const [dateAssigned, setDateAssigned] = useState<Moment | null>(null);
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
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item
          rules={textInputValidationRules}
          name="description"
          label="Description"
        >
          <Input.TextArea placeholder="Description" />
        </Form.Item>
        <FormEmployeeInput
          Form={Form}
          control={{ name: "assignedToId", label: "Assigned To" }}
        />
        <Form.Item
          rules={generalValidationRules}
          name="priority"
          label="Priority"
        >
          <Select placeholder="Priority" options={PRIORITIES} />
        </Form.Item>
        <Form.Item
          rules={[dateHasToBeGreaterThanOrEqualToCurrentDayRule]}
          name="dateAssigned"
          label="Date Assigned"
        >
          <DatePicker
            placeholder="Date Assigned"
            className="w-full"
            onChange={(val) => setDateAssigned(val)}
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
          <DatePicker placeholder="Due Date" className="w-full" />
        </Form.Item>

        <div className="flex justify-end">
          <AppButton type="submit" isLoading={isLoading} />
        </div>
      </Form>
    </Modal>
  );
};
