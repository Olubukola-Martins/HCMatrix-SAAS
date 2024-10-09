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
import { QUERY_KEY_FOR_SINGLE_EMPLOYEE } from "features/core/employees/hooks/useFetchSingleEmployee";
import { COMPETENCIES } from "constants/general";
import { TSingleEmployee } from "features/core/employees/types";
import { useUpdateEmployeeSkill } from "features/core/employees/hooks/skills/useUpdateEmployeeSkill";

interface IProps extends IModalProps {
  employeeId: number;
  skill: TSingleEmployee["skills"][0];
}

export const EditSkill: React.FC<IProps> = ({
  open,
  handleClose,
  employeeId,
  skill,
}) => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm();
  const { mutate, isLoading } = useUpdateEmployeeSkill();
  useEffect(() => {
    form.setFieldsValue({
      skill: skill.skill,
      competency: skill.competency,
    });
  }, [form, skill]);

  const handleSubmit = (data: any) => {
    mutate(
      {
        employeeId,
        skillId: skill.id,
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
      title={"Edit Skill"}
      style={{ top: 20 }}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        requiredMark={false}
      >
        <Form.Item name="skill" label="Skill" rules={textInputValidationRules}>
          <Input className="w-full" placeholder="Enter Skill" />
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
