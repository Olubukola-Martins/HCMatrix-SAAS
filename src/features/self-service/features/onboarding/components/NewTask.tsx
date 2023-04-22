import { DatePicker, Drawer, Form, Input, Select } from "antd";
import Themes from "components/Themes";
import { FormEmployeeInput } from "features/core/employees/components/FormEmployeeInput";
import { useApiAuth } from "hooks/useApiAuth";
import { useQueryClient } from "react-query";
import { IDrawerProps } from "types";
import {
  textInputValidationRules,
  generalValidationRules,
} from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import useSaveOnboardingTask from "../hooks/useSaveOnboardingTask";
import { TOnboarding } from "../types";
import { PRIORITIES } from "constants/general";
import { AppButton } from "components/button/AppButton";

const { RangePicker } = DatePicker;

interface IProps extends IDrawerProps {
  onboarding: TOnboarding;
}

export const NewTask: React.FC<IProps> = ({
  open,
  handleClose,
  onboarding,
}) => {
  const queryClient = useQueryClient();

  const { companyId, token } = useApiAuth();
  const { mutate, isLoading } = useSaveOnboardingTask();
  const [form] = Form.useForm();
  const handleFinish = (data: any) => {
    if (companyId) {
      mutate(
        {
          token,
          companyId,
          name: data.name,
          description: data.description,
          priority: data.priority,
          supervisorId: data.supervisorId,
          startDate: data.period[0].toISOString(),
          endDate: data.period[1].toISOString(),

          id: onboarding.id,
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
              description: res.data.message,
              // duration: 0.4,
            });

            form.resetFields();

            queryClient.invalidateQueries({
              queryKey: ["single-onboarding"], // pass in id later
            });
            handleClose();
          },
        }
      );
    }
  };
  return (
    <Drawer title={"New Task"} onClose={() => handleClose()} open={open}>
      <Themes>
        <Form
          onFinish={handleFinish}
          labelCol={{ span: 24 }}
          requiredMark={false}
          form={form}
        >
          <Form.Item
            name="name"
            rules={textInputValidationRules}
            label="Task Name"
          >
            <Input placeholder="Task Name" />
          </Form.Item>
          <Form.Item
            name="description"
            rules={textInputValidationRules}
            label="Description"
          >
            <Input.TextArea placeholder="Description" />
          </Form.Item>
          <Form.Item
            name="priority"
            rules={generalValidationRules}
            label="Priority"
          >
            <Select placeholder="Priority" options={PRIORITIES} />
          </Form.Item>

          <FormEmployeeInput
            Form={Form}
            control={{ label: "Task Supervisor", name: "supervisorId" }}
          />
          {/* TO DO : Add validation of before to this input and also make it global */}
          <Form.Item
            name="period"
            rules={generalValidationRules}
            label={"Period"}
          >
            <RangePicker
              showTime={{
                format: "HH:mm",
              }}
              use12Hours
              format="YYYY-MM-DD HH:mm"
              placeholder={["Start date", "End date"]}
            />
          </Form.Item>

          <div className="flex justify-end">
            <AppButton label="Add Task" type="submit" isLoading={isLoading} />
          </div>
        </Form>
      </Themes>
    </Drawer>
  );
};
