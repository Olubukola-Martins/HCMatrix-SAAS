import { Form, InputNumber } from "antd";
import { AppButton } from "components/button/AppButton";
import { useCreateWorkSchedule } from "features/timeAndAttendance/hooks/useCreateWorkSchedule";
import { useApiAuth } from "hooks/useApiAuth";
import { useContext, useEffect } from "react";
import { EGlobalOps, GlobalContext } from "stateManagers/GlobalContextProvider";
import { generalValidationRules } from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";

export const WeeklyWork = () => {
  const boxStyle = "border py-3 px-7 text-accent font-medium text-base";
  const [form] = Form.useForm();
  const { companyId, token, currentUserId } = useApiAuth();
  const globalCtx = useContext(GlobalContext);
  const { dispatch } = globalCtx;
  const { mutate, isLoading } = useCreateWorkSchedule();

  useEffect(() => {
    form.setFieldsValue({
      workDaysAndTime: [{ hours: "" }],
    });
  }, []);

  const handleSubmit = (values: any) => {
    const workDaysAndTime = values?.workDaysAndTime.map((item: any) => {
      return {
        hours: item.hours,
      };
    });
    if (companyId) {
      mutate(
        {
          companyId,
          token,
          adminId: currentUserId,
          workArrangement: "Weekly",
          workDaysAndTime: workDaysAndTime,
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
      <Form form={form} className="mt-6" onFinish={handleSubmit}>
        <Form.List name="workDaysAndTime">
          {(fields) => (
            <>
              {fields.map((field, index) => (
                <div key={field.key}>
                  <Form.Item
                    label="Hours"
                    {...field}
                    name={[field.name, "hours"]}
                    rules={generalValidationRules}
                  >
                    <InputNumber
                      className="w-full"
                      placeholder="Enter hours..."
                    />
                  </Form.Item>
                </div>
              ))}
            </>
          )}
        </Form.List>

        <div className="flex justify-end">
          <AppButton label="Save" type="submit" />
        </div>
      </Form>
    </div>
  );
};
