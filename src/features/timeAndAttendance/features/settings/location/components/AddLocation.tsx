import { Drawer, Form, Select } from "antd";
import { AppButton } from "components/button/AppButton";
import { useFetchBranches } from "features/core/branches/hooks/useFetchBranches";
import { UseWindowWidth } from "features/timeAndAttendance/hooks/UseWindowWidth";
import { useDebounce } from "hooks/useDebounce";
import { useContext, useEffect, useState } from "react";
import { GlobalContext, EGlobalOps } from "stateManagers/GlobalContextProvider";
import { IDrawerProps } from "types";
import { generalValidationRules } from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { useGetBiometricDevice } from "../../Biometrics/hooks/useGetBiometricDevice";
import { useCreateLocation } from "../hooks/useCreateLocation";
const formWrapStyle =
  "bg-card px-4 pt-4 rounded grid grid-cols-1 md:grid-cols-2 gap-x-10 mb-5 shadow-sm";
export const AddLocation = ({ handleClose, open, id }: IDrawerProps) => {
  const { drawerSize } = UseWindowWidth();
  const [form] = Form.useForm();
  const { mutate, isLoading } = useCreateLocation();
  const globalCtx = useContext(GlobalContext);
  const { dispatch } = globalCtx;
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm: string = useDebounce<string>(searchTerm);
  const { data: biometricData, isLoading: loadBiometric } =
    useGetBiometricDevice();

  const { data: branchData, isFetching } = useFetchBranches({
    searchParams: {
      name: debouncedSearchTerm,
    },
  });

  const handleSearch = (val: string) => {
    setSearchTerm(val);
  };

  useEffect(() => {
    const defaultField = {
      branchId: "",
      biometricDeviceId: "",
    };
    form.setFieldsValue({ biometricDeviceLocations: [defaultField] });
  }, []);

  const handleFormSubmit = (values: any) => {
    const data = values.biometricDeviceLocations.map((value: any) => ({
      branchId: value.branchId,
      biometricDeviceId: value.biometricDeviceId,
    }));
    mutate(
      { data, id },
      {
        onError: (err: any) => {
          openNotification({
            state: "error",
            title: "Error Occurred",
            description:
              err?.response.data.message ?? err?.response.data.error.message,
            duration: 6.0,
          });
        },
        onSuccess: (res: any) => {
          openNotification({
            state: "success",
            title: "Success",
            description: res.data.message,
          });
          form.resetFields();
          handleClose();
          dispatch({ type: EGlobalOps.setShowInitialSetup, payload: true });
        },
      }
    );
  };
  const handleAddField = () => {
    const biometricDeviceLocations =
      form.getFieldValue("biometricDeviceLocations") || [];
    const newLocation = {
      branchId: "",
      biometricDeviceId: "",
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
    <Drawer
      title="Add location"
      size={drawerSize}
      open={open}
      onClose={() => handleClose()}
    >
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
                      placeholder="Select branch"
                      loading={isFetching}
                      showSearch
                      allowClear
                      onClear={() => setSearchTerm("")}
                      onSearch={handleSearch}
                      defaultActiveFirstOption={false}
                      showArrow={false}
                      filterOption={false}
                      options={branchData?.data.map((item) => ({
                        value: item.id,
                        label: item.name,
                      }))}
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
                        options={biometricData?.map((item) => ({
                          value: item.id,
                          label: item.name,
                        }))}
                        allowClear
                        placeholder="Select"
                        loading={loadBiometric}
                      />
                    </Form.Item>

                    {!id && (
                      <i
                        className="ri-delete-bin-line text-xl cursor-pointer hover:text-caramel"
                        onClick={() => handleRemoveField(index)}
                      ></i>
                    )}
                  </div>
                </div>
              ))}

              {!id && (
                <AppButton
                  variant="transparent"
                  label="+ Add Location"
                  handleClick={() => handleAddField()}
                />
              )}
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
