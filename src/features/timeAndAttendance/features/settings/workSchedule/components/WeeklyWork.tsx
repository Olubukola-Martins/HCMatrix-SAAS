import { Form, InputNumber } from "antd";
import { AppButton } from "components/button/AppButton";
import { useContext, useEffect } from "react";
import { useQueryClient } from "react-query";
import { EGlobalOps, GlobalContext } from "stateManagers/GlobalContextProvider";
import { generalValidationRules } from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { useCreateWeeklySchedule } from "../hooks/useCreateWeeklySchedule";
import {
  QUERY_KEY_FOR_WORK_SCHEDULE_WEEKLY,
  useGetWeeklySchedule,
} from "../hooks/useGetWeeklySchedule";

export const WeeklyWork = () => {
  const [form] = Form.useForm();
  const globalCtx = useContext(GlobalContext);
  const { dispatch } = globalCtx;
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useCreateWeeklySchedule();
  const { data, isSuccess, isLoading: isFetchLoading } = useGetWeeklySchedule();

  useEffect(() => {
    form.setFieldsValue({
      duration: data?.duration,
    });
  }, [form, data, isSuccess]);

  const handleSubmit = (values: any) => {
    mutate(
      {
        duration: values.duration.toString(),
      },
      {
        onError: (err: any) => {
          openNotification({
            state: "error",
            title: "Error Occurred",
            description:
              err?.response.data.message ?? err?.response.data.error.message,
            duration: 7.0,
          });
        },
        onSuccess: (res: any) => {
          openNotification({
            state: "success",
            title: "Success",
            description: res.data.message,
          });
          dispatch({ type: EGlobalOps.setShowInitialSetup, payload: true });
          queryClient.invalidateQueries([QUERY_KEY_FOR_WORK_SCHEDULE_WEEKLY]);
        },
      }
    );
  };
  return (
    <div>
      {/* form */}
      <Form
        form={form}
        className="mt-6"
        onFinish={handleSubmit}
        disabled={isFetchLoading}
      >
        <Form.Item
          name="duration"
          label="Enter number of hours"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" min={1} />
        </Form.Item>
        <div className="flex justify-end">
          <AppButton label="Save Changes" type="submit" isLoading={isLoading} />
        </div>
      </Form>
    </div>
  );
};
