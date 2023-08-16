import { AttendanceSettingsIntro } from "features/timeAndAttendance/components/settings/AttendanceSettingsIntro";
import { TimeAttendanceSettingsNav } from "features/timeAndAttendance/components/settings/TimeAttendanceSettingsNav";
import { Form, Select } from "antd";
import { useEffect } from "react";
import { AppButton } from "components/button/AppButton";
import { generalValidationRules } from "utils/formHelpers/validation";
import { useApiAuth } from "hooks/useApiAuth";
import { EGlobalOps, GlobalContext } from "stateManagers/GlobalContextProvider";
import { useContext } from "react";
import { useCreateAttendanceLocation } from "features/timeAndAttendance/hooks/useCreateAttendanceLocation";
import { openNotification } from "utils/notifications";
const formWrapStyle =
  "bg-card px-4 pt-4 rounded grid grid-cols-1 md:grid-cols-2 gap-x-10 mb-5 shadow-sm";
export const AddLocation = () => {
  const [form] = Form.useForm();
  const { companyId, token } = useApiAuth();
  const { mutate, isLoading } = useCreateAttendanceLocation();
  const globalCtx = useContext(GlobalContext);
  const { dispatch } = globalCtx;

  useEffect(() => {
    const defaultField = {
      branchId: "",
      biometricDeviceId: "",
      companyId: companyId,
    };
    form.setFieldsValue({ biometricDeviceLocations: [defaultField] });
  }, []);

  const handleFormSubmit = (values: any) => {
    if (companyId) {
      mutate(
        {
          companyId,
          token,
          biometricDeviceLocations: values.biometricDeviceLocations,
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
    const biometricDeviceLocations =
      form.getFieldValue("biometricDeviceLocations") || []; 
    const newLocation = {
      branchId: "",
      biometricDeviceId: "",
      companyId: companyId,
    };
    form.setFieldsValue({
      biometricDeviceLocations: [...biometricDeviceLocations, newLocation],
    }); 
  };

  const handleRemoveField = (index: number) => {
    const biometricDeviceLocations =
      form.getFieldValue("biometricDeviceLocations") || [];
    form.setFieldsValue({
      biometricDeviceLocations: biometricDeviceLocations.filter(
        (_: any, i: number) => i !== index
      ), 
    });
  };

  return (
    <>
      <TimeAttendanceSettingsNav active="add location" />
      <AttendanceSettingsIntro
        title={"Add Location"}
        description="Add your offices or places where your team members will be clocking in and out."
      />
      <div className="Container mt-7">
        <div className="bg-card rounded md:p-5 p-3">
          <div className="bg-mainBg py-4 px-4 rounded">
            <Form
              form={form}
              onFinish={handleFormSubmit}
              layout="vertical"
              requiredMark={false}
            >
              <Form.List name="biometricDeviceLocations">
                {(fields) => (
                  <>
                    {fields.map((field, index) => (
                      <div
                        key={field.key}
                        className={`${formWrapStyle} grid grid-cols-1 md:grid-cols-2 gap-x-7`}
                      >
                        <Form.Item
                          {...field}
                          name={[field.name, "branchId"]}
                          label="Select Branch"
                          className="w-full"
                          rules={generalValidationRules}
                        >
                          <Select
                            className="w-full"
                            placeholder="Select"
                            options={[
                              { label: "Branch 1", value: 1 },
                              { label: "Branch 2", value: 2 },
                            ]}
                            allowClear
                          />
                        </Form.Item>

                        <div className="flex items-center gap-3 w-full">
                          <Form.Item
                            {...field}
                            name={[field.name, "biometricDeviceId"]}
                            label="Select Biometrics"
                            className="w-full"
                            rules={generalValidationRules}
                          >
                            <Select
                              className="w-full"
                              options={[
                                { value: 1, label: "Bio 1" },
                                { value: 2, label: "Bio 2" },
                              ]}
                              allowClear
                              placeholder="Select"
                            />
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
                      label="+ Add More"
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
