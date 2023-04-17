import { Drawer, Form, Input, Select } from "antd";
import { COMPETENCIES } from "constants/general";
import { useSaveEmployeeSkill } from "features/core/employees/hooks/useSaveEmployeeSkill";
import { TSkill } from "features/core/employees/types";
import { useApiAuth } from "hooks/useApiAuth";
import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { BeatLoader } from "react-spinners";
import { IDrawerProps } from "types";
import {
  textInputValidationRules,
  generalValidationRules,
} from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";

interface IProps extends IDrawerProps {
  employeeId?: number;
  skill?: TSkill;
}

export const SaveSkill = ({ open, handleClose, employeeId, skill }: IProps) => {
  const { token, companyId } = useApiAuth();

  const { mutate, isLoading } = useSaveEmployeeSkill();
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (skill) {
      form.setFieldsValue({
        ...skill,
      });
    } else {
      form.resetFields();
    }
  }, [skill, form]);
  const handleFinish = (data: any) => {
    if (companyId && employeeId) {
      mutate(
        {
          companyId,
          competency: data.competency,
          skill: data.skill,
          token,
          employeeId: employeeId,
          skillId: skill?.id,
        },
        {
          onError: (err: any) => {
            openNotification({
              state: "error",
              title: "Error Occured",
              description:
                err?.response.data.message ?? err?.response.data.error.message,
            });
          },
          onSuccess: (res: any) => {
            openNotification({
              state: "success",

              title: "Success",
              description: res?.data?.message,
            });
            queryClient.invalidateQueries({
              queryKey: ["single-employee", employeeId],
              // exact: true,
            });
            if (!skill) form.resetFields();
            handleClose();
          },
        }
      );
    }
  };
  return (
    <Drawer
      title={skill ? "Edit Skill" : "Add Skill"}
      placement="right"
      onClose={() => handleClose()}
      open={open}
      className="drawerBg"
    >
      <Form
        layout="vertical"
        className="mt-5"
        requiredMark={false}
        onFinish={handleFinish}
        form={form}
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

        <button className="button" type="submit">
          {isLoading ? <BeatLoader color="#fff" /> : "Submit"}
        </button>
      </Form>
    </Drawer>
  );
};
