import { Drawer, Form, Input, Select } from "antd";
import { useSaveEmployeeSkill } from "APIRQHooks/Utility/employeeHooks";
import { IAuthDets } from "AppTypes/Auth";
import { TSkill } from "AppTypes/DataEntitities";
import { competencies } from "Constants";
import { GlobalContext } from "Contexts/GlobalContextProvider";
import { openNotification } from "NotificationHelpers";
import { useContext, useEffect } from "react";
import { useAuthUser } from "react-auth-kit";
import { useQueryClient } from "react-query";
import { BeatLoader } from "react-spinners";
import { IDrawerProps } from "../../../../../../AppTypes/Component";
import {
  generalValidationRules,
  textInputValidationRules,
} from "../../../../../../FormHelpers/validation";

interface IProps extends IDrawerProps {
  employeeId?: number;
  skill?: TSkill;
}

export const SaveSkill = ({ open, handleClose, employeeId, skill }: IProps) => {
  const { mutate, isLoading } = useSaveEmployeeSkill();
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const auth = useAuthUser();
  const authDetails = auth() as unknown as IAuthDets;
  const token = authDetails.userToken;
  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const companyId = globalState.currentCompany?.id as unknown as string;
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
            options={competencies}
          />
        </Form.Item>

        <button className="button" type="submit">
          {isLoading ? <BeatLoader color="#fff" /> : "Submit"}
        </button>
      </Form>
    </Drawer>
  );
};
