import { Form, Input, InputNumber, TimePicker } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { AppButton } from "components/button/AppButton";
import { AttendanceSettingsIntro } from "features/timeAndAttendance/components/settings/AttendanceSettingsIntro";
import { TimeAttendanceSettingsNav } from "features/timeAndAttendance/components/settings/TimeAttendanceSettingsNav";
import { useCreateTimeOffPolicy } from "features/timeAndAttendance/hooks/useCreateTimeOffPolicy";
import { useApiAuth } from "hooks/useApiAuth";
import { useContext, useEffect } from "react";
import { EGlobalOps, GlobalContext } from "stateManagers/GlobalContextProvider";
import { generalValidationRules } from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";

export const TimeOffPolicy = () => {
  const [form] = Form.useForm();
  const { companyId, token, currentUserId } = useApiAuth();
  const { mutate, isLoading } = useCreateTimeOffPolicy();
  const globalCtx = useContext(GlobalContext);
  const { dispatch } = globalCtx;

  const handleFormSubmit = (values: any) => {
    if (companyId) {
      mutate(
        {
          companyId,
          token,
          timeOffPolicies: values.fields,
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

  useEffect(() => {
    const defaultField = {
      name: "",
      durationInDays: "",
      comment: "",
      adminId: currentUserId,
      companyId: companyId
    };
    form.setFieldsValue({ fields: [defaultField] });
  }, []);

  const handleAddField = () => {
    const fields = form.getFieldValue("fields") || [];
    const newField = {
      name: "",
      durationInDays: "",
      comment: "",
      adminId: currentUserId,
      companyId: companyId
    };
    form.setFieldsValue({ fields: [...fields, newField] });
  };

  const handleRemoveField = (index: number) => {
    const fields = form.getFieldValue("fields") || [];
    form.setFieldsValue({
      fields: fields.filter((_: any, i: number) => i !== index),
    });
  };
  return (
    <>
      <TimeAttendanceSettingsNav active="time off policy" />
      <AttendanceSettingsIntro
        title={"Create Time Off Policy"}
        description="Plan work by setting your team's work and break time. Manage overtime rules in settings"
      />
      <div className="Container mt-7">
        <div className="bg-card rounded md:p-5 p-3">
          <Form form={form} onFinish={handleFormSubmit} layout="vertical">
            <Form.List name="fields">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field, index) => (
                    <div key={field.key}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-7">
                        <Form.Item
                          {...field}
                          name={[field.name, "name"]}
                          label="Create Time off Policy"
                          className="w-full"
                          rules={generalValidationRules}
                          required={false}
                        >
                          <Input placeholder="eg: medical policy" />
                        </Form.Item>

                        <Form.Item
                          {...field}
                          name={[field.name, "durationInDays"]}
                          label="Duration in days"
                          className="w-full"
                          rules={generalValidationRules}
                          required={false}
                        >
                          <InputNumber className="w-full" />
                        </Form.Item>
                      </div>
                      <Form.Item
                        {...field}
                        name={[field.name, "comment"]}
                        label="Enter Comment"
                        className="w-full"
                        requiredMark="optional"
                      >
                        <TextArea className="w-full " rows={3} />
                      </Form.Item>
                      <div className="flex justify-end">
                        <i
                          className="ri-delete-bin-line -mt-3 text-xl text-red-400 cursor-pointer hover:text-caramel"
                          onClick={() => handleRemoveField(index)}
                        ></i>
                      </div>
                    </div>
                  ))}

                  <AppButton
                    variant="transparent"
                    label="+ Add Time off policy"
                    handleClick={() => handleAddField()}
                  />
                </>
              )}
            </Form.List>

            <div className="flex justify-end">
              <AppButton label="Save" type="submit" isLoading={isLoading} />
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};
function ITimeTrackingRule() {
  throw new Error("Function not implemented.");
}
