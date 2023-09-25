import { Form, Input, Modal, Select } from "antd";
import { AppButton } from "components/button/AppButton";
import React from "react";
import { IModalProps } from "types";
import {
  generalValidationRules,
  textInputValidationRules,
} from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { QUERY_KEY_FOR_SINGLE_EMPLOYEE } from "features/core/employees/hooks/useFetchSingleEmployee";
import { COMPETENCIES } from "constants/general";
import { useAddEmployeeSkill } from "features/core/employees/hooks/skills/useAddEmployeeSkill";

interface IProps extends IModalProps {
  employeeId: number;
}

export const AddSkill: React.FC<IProps> = ({
  open,
  handleClose,
  employeeId,
}) => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm();
  const { mutate, isLoading } = useAddEmployeeSkill();

  const handleSubmit = (data: any) => {
    mutate(
      {
        employeeId,
        data: {
          skill: data.skill,
          competency: data.competency,
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
            queryKey: [QUERY_KEY_FOR_SINGLE_EMPLOYEE],
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
      title={"Add Skill"}
      style={{ top: 20 }}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        requiredMark={false}
      >
        <Form.Item name="skill" label="Skill" rules={textInputValidationRules}>
          <Input className="generalInputStyle" placeholder="Enter Skill" />
        </Form.Item>
        <Form.Item
          name="competency"
          label="Competency"
          rules={generalValidationRules}
        >
          <Select
            className="SelectTag w-full"
            size="large"
            placeholder="Select Competency"
            options={COMPETENCIES}
          />
        </Form.Item>

        <div className="flex justify-end">
          <AppButton type="submit" isLoading={isLoading} />
        </div>
      </Form>
    </Modal>
  );
};
