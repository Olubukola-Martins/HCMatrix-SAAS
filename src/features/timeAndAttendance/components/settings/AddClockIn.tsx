import { Drawer, Form, Input } from "antd";
import { AppButton } from "components/button/AppButton";
import { UseWindowWidth } from "features/timeAndAttendance/hooks/UseWindowWidth";
import { useCreateBiometric } from "features/timeAndAttendance/hooks/useCreateBiometric";
import { QUERY_KEY_FOR_BIOMETRIC_DEVICE } from "features/timeAndAttendance/hooks/useGetBiometricDevice";
import { useContext, useEffect } from "react";
import { useQueryClient } from "react-query";
import { GlobalContext, EGlobalOps } from "stateManagers/GlobalContextProvider";
import { IDrawerProps } from "types";
import { generalValidationRules } from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";

const formWrapStyle =
  "bg-card px-4 pt-4 rounded grid grid-cols-1 md:grid-cols-2 gap-x-10 mb-5 shadow-sm";
export const AddClockIn = ({ handleClose, open }: IDrawerProps) => {
  const { drawerSize } = UseWindowWidth();
  const [form] = Form.useForm();
  const { mutate, isLoading } = useCreateBiometric();
  const globalCtx = useContext(GlobalContext);
  const { dispatch } = globalCtx;
  const queryClient = useQueryClient();

  useEffect(() => {
    const defaultField = {
      name: "",
      serialNumber: "",
    };
    form.setFieldsValue({ biometricDevices: [defaultField] });
  }, []);

  const handleFormSubmit = (values: any) => {
    const data = values.biometricDevices.map((value: any) => ({
      name: value.name,
      serialNumber: value.serialNumber,
    }));

    mutate(
      { data },
      {
        onError: (err: any) => {
          console.log(err);

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
          });

          form.resetFields();
          dispatch({ type: EGlobalOps.setShowInitialSetup, payload: true });
          queryClient.invalidateQueries([QUERY_KEY_FOR_BIOMETRIC_DEVICE]);
          handleClose();
        },
      }
    );
  };
  const handleAddField = () => {
    const biometricDevices = form.getFieldValue("biometricDevices") || [];
    const newDevice = { serialNumber: null };
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
    <Drawer
      title="See Clock In"
      size={drawerSize}
      open={open}
      onClose={() => handleClose()}
    >
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
                      <Input className="w-full" />
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
    </Drawer>
  );
};
