import { Form, Input, Select } from "antd";
import { AppButton } from "components/button/AppButton";
import { useContext, useEffect } from "react";
import { useQueryClient } from "react-query";
import { GlobalContext, EGlobalOps } from "stateManagers/GlobalContextProvider";
import { openNotification } from "utils/notifications";
import {
  QUERY_KEY_FOR_WORK_SCHEDULE_FLEXIBLE,
  useGetFlexibleSchedule,
} from "../hooks/useGetFlexibleSchedule";
import { useCreateFlexibleSchedule } from "../hooks/useCreateFlexibleSchedule";

export const WorkFlexible = () => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const globalCtx = useContext(GlobalContext);
  const { dispatch } = globalCtx;
  const { mutate, isLoading } = useCreateFlexibleSchedule();
  const { data, isSuccess, isLoading: isFetchLoading } = useGetFlexibleSchedule();

  useEffect(() => {
    let initialFormValues;
    if (isSuccess && data && data.length !== 0) {
      initialFormValues = data?.map((item: any) => ({
        day: item.day,
        hours: item.duration,
      }));
    } else {
      initialFormValues = [
        { day: "Monday" },
        { day: "Tuesday" },
        { day: "Wednesday" },
        { day: "Thursday" },
        { day: "Friday" },
        { day: "Saturday" },
        { day: "Sunday" },
      ];
    }

    form.setFieldsValue({
      workDaysAndTime: initialFormValues,
    });
  }, [data, form]);

  const onFinish = (values: any) => {
    const data = values.workDaysAndTime.map((item: any) => ({
      day: item.day.toLowerCase(),
      duration: item.hours.toString(),
    }));

    mutate(
      {
        data,
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
            description: "Schedule Created Successfully",
          });
          dispatch({ type: EGlobalOps.setShowInitialSetup, payload: true });
          queryClient.invalidateQueries([QUERY_KEY_FOR_WORK_SCHEDULE_FLEXIBLE]);
        },
      }
    );
  };
  return (
    <div>
      {/* form */}
      <div className="mt-6">
        <Form form={form} onFinish={onFinish} disabled={isFetchLoading}>
          <Form.List name="workDaysAndTime">
            {(fields) => (
              <>
                {fields.map((field, index) => (
                  <div key={field.key} className="flex gap-5">
                    <Form.Item {...field} name={[field.name, "day"]}>
                      <Input placeholder="day" disabled className="w-32" />
                    </Form.Item>
                    <div className="flex-1 w-full">
                      <Form.Item
                        {...field}
                        name={[field.name, "hours"]}
                        noStyle
                      >
                        <Select
                          className="flex-1 w-full"
                          placeholder="Select hours"
                          allowClear
                          options={[
                            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
                            16, 17, 18, 19, 20, 21, 22, 23, 24,
                          ].map((item: number) => ({
                            value: item,
                            label: `${item} ${item === 1 ? "hour" : "hours"}`,
                          }))}
                        />
                      </Form.Item>
                    </div>
                  </div>
                ))}
              </>
            )}
          </Form.List>

          <div>
            <AppButton
              label="Save changes"
              type="submit"
              isLoading={isLoading}
            />
          </div>
        </Form>
      </div>
    </div>
  );
};
