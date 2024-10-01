import { Form, InputNumber, Skeleton, Switch } from "antd";
import { AppButton } from "components/button/AppButton";
import {
  TSaveShiftRotationSettingData,
  useSaveShiftRotationSetting,
} from "../hooks/shift/other-settings/useSaveShiftRotationSetting";
import { useEffect } from "react";
import { useGetShiftRotationSetting } from "../hooks/shift/other-settings/useGetShiftRotationSetting";
import { numberHasToBeGreaterThanValueRule } from "utils/formHelpers/validation";
import { FormShiftCategoryInput } from "./shiftCategory/FormShiftCategoryInput";
import { useGetWorkSheduleShiftCategories } from "../hooks/shift/categories/useGetWorkSheduleShiftCategories";
import { usePagination } from "hooks/usePagination";

export const AutoShiftRotation = () => {
  const [form] = Form.useForm<TSaveShiftRotationSettingData>();
  const { pagination } = usePagination();
  const { isLoading: isLoadingSetting, data: setting } =
    useGetShiftRotationSetting();
  const { data: ShiftCategoriesData } = useGetWorkSheduleShiftCategories({
    props: {
      pagination,
      enabled: true,
    },
  });

  useEffect(() => {
    form.setFieldsValue({
      enableRotation: setting?.enableRotation,
      pattern: setting?.rotationPattern?.map(({ shiftFromId, shiftToId }) => ({
        shiftFromId,
        shiftToId,
      })),
      rotationFrequency: setting?.rotationFrequency,
      rotationFrequencyUnit: setting?.rotationFrequencyUnit ?? "days",
    });
  }, [setting, form]);

  const { handleSubmit, isLoading: isSaving } = useSaveShiftRotationSetting();

  const handleAddField = () => {
    const patterns = form.getFieldValue("pattern") || [];
    const data: TSaveShiftRotationSettingData["pattern"][number] = {
      shiftFromId: null,
      shiftToId: null,
    };
    form.setFieldsValue({ pattern: [...patterns, data] });
  };
  const handleRemoveField = (index: number) => {
    const patterns = form.getFieldValue("pattern") || [];
    if (patterns.length > 0) {
      patterns.splice(index, 1);
      form.setFieldsValue({ pattern: patterns });
    }
  };

  return (
    <Skeleton loading={isLoadingSetting} paragraph={{ rows: 8 }}>
      <Form
        layout="vertical"
        onFinish={handleSubmit}
        form={form}
        requiredMark={false}
      >
        <div className="bg-card rounded px-3 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
            <h3 className="font-semibold">
              Enable auto shift rotation for temporary shift
            </h3>
            <Form.Item<TSaveShiftRotationSettingData>
              name="enableRotation"
              className="flex justify-end items-end"
              valuePropName="checked"
              initialValue={false}
            >
              <Switch />
            </Form.Item>
          </div>

          <div>
            <h5 className="pb-2">Select Rotation Frequency</h5>
            <div className="flex items-start gap-3">
              <div>
                <Form.Item<TSaveShiftRotationSettingData>
                  name="rotationFrequency"
                  rules={[numberHasToBeGreaterThanValueRule(0)]}
                >
                  <InputNumber min={1} placeholder="0" />
                </Form.Item>
              </div>
              <div className="bg-white border rounded px-3 py-[5px]">
                Day(s)
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card rounded px-3 pt-4 mt-3 pb-5 scrollBar overflow-y-auto h-[18rem]">
          <h3 className="font-semibold pb-4">
            Configure rotation pattern for temporary shift
          </h3>

          <div className="flex items-start gap-3">
            <Form.List name="pattern">
              {(fields) => (
                <div className="space-y-4">
                  {fields.map((field, index) => (
                    <div key={field.key} className="flex gap-5">
                      <div className="flex gap-5">
                        <div className="w-[10rem]">
                          <FormShiftCategoryInput
                            Form={Form}
                            control={{
                              name: [field.name, "shiftFromId"],
                              label: "",
                            }}
                          />
                        </div>
                        <i className="ri-arrow-right-line text-xl pt-1"></i>
                        <div className="w-[10rem]">
                          <FormShiftCategoryInput
                            Form={Form}
                            control={{
                              name: [field.name, "shiftToId"],
                              label: "",
                            }}
                            {...field}
                            noStyle
                          />
                        </div>
                      </div>
                      <i
                        className="ri-delete-bin-line text-red-500 text-[22px] cursor-pointer hover:text-slate-500"
                        onClick={() => handleRemoveField(index)}
                      ></i>
                    </div>
                  ))}

                  {fields.length < (ShiftCategoriesData?.data?.length || 0) && (
                    <AppButton
                      variant="transparent"
                      label="+ Add Pattern"
                      handleClick={() => handleAddField()}
                    />
                  )}
                </div>
              )}
            </Form.List>
          </div>
        </div>

        <div className="flex justify-end mt-2 mr-3">
          <AppButton type="submit" label="Save" isLoading={isSaving} />
        </div>
      </Form>
    </Skeleton>
  );
};
