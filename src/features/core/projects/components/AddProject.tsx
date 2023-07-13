import { DatePicker, Form, Input, Modal } from "antd";
import { AppButton } from "components/button/AppButton";
import React from "react";
import { IModalProps } from "types";
import {
  generalValidationRules,
  textInputValidationRules,
} from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { FormEmployeeInput } from "features/core/employees/components/FormEmployeeInput";
import { useAddProject } from "../hooks/useAddProject";
import { QUERY_KEY_FOR_PROJECTS } from "../hooks/useGetProjects";

const AddProject: React.FC<IModalProps> = ({ open, handleClose }) => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm();
  const { mutate, isLoading } = useAddProject();

  const handleSubmit = (data: any) => {
    mutate(
      {
        data: {
          name: data.name,
          startDate: data.duration[0].toString(),
          endDate: data.duration[1].toString(),
          description: data.description,
          employees: data.employees.map((item: number) => ({
            employeeId: item,
          })),
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
            queryKey: [QUERY_KEY_FOR_PROJECTS],
            // exact: true,
          });
        },
      }
    );
  };
  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={"New Project"}
      style={{ top: 20 }}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        requiredMark={false}
      >
        <Form.Item
          rules={textInputValidationRules}
          name="name"
          label="Project Name"
        >
          <Input placeholder="Project Name" />
        </Form.Item>
        <Form.Item
          rules={generalValidationRules}
          name="duration"
          label="Duration"
        >
          <DatePicker.RangePicker
            placeholder={["Start Date", "End Date"]}
            className="w-full"
          />
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
          mode="multiple"
          control={{ name: "employees", label: "Participants" }}
        />

        <div className="flex justify-end">
          <AppButton type="submit" isLoading={isLoading} />
        </div>
      </Form>
    </Modal>
  );
};

export default AddProject;
