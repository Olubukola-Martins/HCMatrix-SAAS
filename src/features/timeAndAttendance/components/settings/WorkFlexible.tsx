import { Checkbox, Form, Input, InputNumber, Select, TimePicker } from "antd";
import { AppButton } from "components/button/AppButton";
import { useCreateWorkSchedule } from "features/timeAndAttendance/hooks/useCreateWorkSchedule";
import { useApiAuth } from "hooks/useApiAuth";
import { useContext, useEffect } from "react";
import { GlobalContext, EGlobalOps } from "stateManagers/GlobalContextProvider";
import { openNotification } from "utils/notifications";

export const WorkFlexible = () => {
  const boxStyle = "border py-3 px-7 text-accent font-medium text-base";
  const [form] = Form.useForm();
  const { companyId, token, currentUserId } = useApiAuth();
  const globalCtx = useContext(GlobalContext);
  const { dispatch } = globalCtx;
  const { mutate, isLoading } = useCreateWorkSchedule();
  useEffect(() => {
    form.setFieldsValue({
      workDaysAndTime: [
        { day: "Monday" },
        { day: "Tuesday" },
        { day: "Wednesday" },
        { day: "Thursday" },
        { day: "Friday" },
        { day: "Saturday" },
        { day: "Sunday" },
      ],
    });
  }, []);

  const onFinish = (values: any) => {
    if (companyId) {
      mutate(
        {
          companyId,
          token,
          adminId: currentUserId,
          workArrangement: "Flexible",
          workDaysAndTime: values.workDaysAndTime,
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
              // duration: 0.4,
            });

            form.resetFields();
            dispatch({ type: EGlobalOps.setShowInitialSetup, payload: true });
          },
        }
      );
    }
  };
  return (
    <div>
      <div className="flex items-center flex-wrap gap-6">
        <h4 className="text-base font-medium">Days of the week</h4>
        <div className="flex items-center flex-wrap">
          <div className={`${boxStyle} bg-caramel rounded-l`}>
            <h5>M</h5>
          </div>
          <div className={`${boxStyle} bg-caramel`}>
            <h5>T</h5>
          </div>
          <div className={`${boxStyle} bg-caramel`}>
            <h5>W</h5>
          </div>
          <div className={`${boxStyle} bg-caramel`}>
            <h5>T</h5>
          </div>
          <div className={`${boxStyle} bg-caramel`}>
            <h5>F</h5>
          </div>
          <div className={`${boxStyle}`}>
            <h5>S</h5>
          </div>
          <div className={`${boxStyle} rounded-r`}>
            <h5>S</h5>
          </div>
        </div>
      </div>

      {/* form */}
      <div className="mt-6">
        <Form form={form} onFinish={onFinish}>
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
