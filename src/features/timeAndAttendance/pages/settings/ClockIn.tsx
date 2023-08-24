import { Form, Input, InputNumber, Switch } from "antd";
import { AppButton } from "components/button/AppButton";
import { AttendanceSettingsIntro } from "features/timeAndAttendance/components/settings/AttendanceSettingsIntro";
import { TimeAttendanceSettingsNav } from "features/timeAndAttendance/components/settings/TimeAttendanceSettingsNav";
import { useCreateClockIn } from "features/timeAndAttendance/hooks/useCreateClockIn";
import { useApiAuth } from "hooks/useApiAuth";
import { EGlobalOps, GlobalContext } from "stateManagers/GlobalContextProvider";
import { generalValidationRules } from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { useContext } from "react";

const formWrapStyle =
  "bg-card px-4 pt-4 rounded grid grid-cols-1 md:grid-cols-2 gap-x-10 mb-5 shadow-sm";
export const ClockIn = () => {
  const [form] = Form.useForm();
  const { mutate, isLoading } = useCreateClockIn();
  const { companyId, token, currentUserId } = useApiAuth();
  const globalCtx = useContext(GlobalContext);
  const { dispatch } = globalCtx;

  const handleFormSubmit = (values: any) => {
    
    if (companyId) {
      mutate(
        {
          companyId,
          adminId: currentUserId,
          isSoftClockIn: values.softClockIn,
          isBiometricClockIn: values.allowBiometrics,
          biometricDevices: values.biometricDevices,
          token,
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
            dispatch({ type: EGlobalOps.setShowInitialSetup, payload: true });
          },
        }
      );
    }
  };

  const handleAddField = () => {
    const biometricDevices = form.getFieldValue("biometricDevices") || [];
    const newDevice = { companyId: companyId, serialNumber: null };
    form.setFieldsValue({ biometricDevices: [...biometricDevices, newDevice] });
  };

  const handleRemoveField = (index: number) => {
    const biometricDevices = form.getFieldValue("biometricDevices") || [];
    form.setFieldsValue({
      biometricDevices: biometricDevices.filter(
        (_: any, i: number) => i !== index
      ),
    });
  };

  return (
    <>
      <TimeAttendanceSettingsNav active="clock in settings" />
      <AttendanceSettingsIntro
        title={"Clock in Settings"}
        description="Select Clock-in options."
      />

      <div className="Container mt-7">
        <div className="bg-card rounded md:p-5 p-3">
          <div className="bg-mainBg py-4 px-4 rounded">
            <Form
              form={form}
              onFinish={handleFormSubmit}
              layout="vertical"
              requiredMark={false}
              initialValues={{
                softClockIn: true,
                allowBiometrics: true,
              }}
            >
              <div
                className={`${formWrapStyle} flex justify-between items-center`}
              >
                <h3 className="font-medium">Allow soft clock-in</h3>
                <Form.Item
                  name="softClockIn"
                  className="flex justify-end items-end"
                >
                  <Switch defaultChecked />
                </Form.Item>
              </div>
              <div
                className={`${formWrapStyle} flex justify-between items-center`}
              >
                <h3 className="font-medium">
                  Allow Biometrics device clock-in
                </h3>
                <Form.Item
                  name="allowBiometrics"
                  className="flex justify-end items-end"
                >
                  <Switch defaultChecked />
                </Form.Item>
              </div>
              <Form.List name="biometricDevices">
                {(fields) => (
                  <>
                    {fields.map((field, index) => (
                      <div
                        key={field.key}
                        className={`${formWrapStyle} grid grid-cols-1 md:grid-cols-2 gap-x-7`}
                      >
                        <Form.Item
                          {...field}
                          name={[field.name, "name"]}
                          label="Name"
                          className="w-full"
                          rules={generalValidationRules}
                        >
                          <Input />
                        </Form.Item>

                        <div className="flex items-center gap-3 w-full">
                          <Form.Item
                            {...field}
                            name={[field.name, "serialNumber"]}
                            label="Serial Number"
                            className="w-full"
                            rules={generalValidationRules}
                          >
                            <InputNumber className="w-full" />
                          </Form.Item>

                          <i
                            className="ri-delete-bin-line text-xl cursor-pointer hover:text-caramel"
                            onClick={() => handleRemoveField(index)}
                          ></i>
                        </div>
                      </div>
                    ))}

                    <AppButton
                      variant="transparent"
                      label="+ Add Biometrics"
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
      </div>
    </>
  );
};
