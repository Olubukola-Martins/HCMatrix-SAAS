import { DatePicker, Drawer, Form, Input, Select } from "antd";
import Themes from "components/Themes";
import { FormEmployeeInput } from "features/core/employees/components/FormEmployeeInput";
import { useQueryClient } from "react-query";
import { IDrawerProps } from "types";
import {
  textInputValidationRules,
  generalValidationRules,
  dateHasToBeGreaterThanCurrentDayRuleForRange,
  dateHasToBeGreaterThanOrEqualToCurrentDayRuleForRange,
} from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import useSaveOnboardingTask from "../../hooks/useSaveOnboardingTask";
import { PRIORITIES } from "constants/general";
import { AppButton } from "components/button/AppButton";
import { QUERY_KEY_FOR_SINGLE_ONBOARDING } from "../../hooks/useFetchSingleOnboarding";
import { QUERY_KEY_FOR_AUTHENTICATED_EMPLOYEE_ONBOARDING } from "../../hooks/useGetAuthenticatedEmployeeOnboarding";

const { RangePicker } = DatePicker;

interface IProps extends IDrawerProps {
  onboardingId?: number;
}

export const NewOnboardingTask: React.FC<IProps> = ({
  open,
  handleClose,
  onboardingId,
}) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useSaveOnboardingTask();
  const [form] = Form.useForm();
  const handleFinish = (data: any) => {
    if (!onboardingId) return;
    mutate(
      {
        data: {
          name: data.name,
          description: data.description,
          priority: data.priority,
          supervisorId: data.supervisorId,
          startDate: data.period[0].toISOString(),
          endDate: data.period[1].toISOString(),
        },
        onboardingId,
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
            queryKey: [QUERY_KEY_FOR_SINGLE_ONBOARDING],
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_AUTHENTICATED_EMPLOYEE_ONBOARDING],
          });
          handleClose();
        },
      }
    );
  };
  return (
    <Drawer
      title={"New Onboarding Task"}
      onClose={() => handleClose()}
      open={open}
    >
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

          <Form.Item
            name="period"
            rules={[dateHasToBeGreaterThanOrEqualToCurrentDayRuleForRange]}
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
