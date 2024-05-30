import { Form, InputNumber, Select, Switch } from "antd";
import { AppButton } from "components/button/AppButton";

const shiftData = [
  { value: "morning", label: "Morning shift" },
  { value: "afternoon", label: "Afternoon shift" },
  { value: "evening", label: "Evening shift" },
];

export const AutoShiftRotation = () => {
  return (
    <>
      <Form>
        <div className="bg-card rounded px-3 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
            <h3 className="font-semibold">
              Enable auto shift rotation for temporary shift
            </h3>
            <Form.Item
              name="EnableAutoShift"
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
                <Form.Item name="rotationFrequency">
                  <InputNumber min={1} placeholder="0" />
                </Form.Item>
              </div>
              <div className="bg-white border rounded px-3 py-[5px]">
                Day(s)
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card rounded px-3 pt-4 mt-3">
          <h3 className="font-semibold pb-2">
            Configure rotation pattern for temporary shift
          </h3>

          <div className="flex items-start gap-3">
            <div className="bg-white border w-[6rem] rounded px-3 py-[5px] shadow-sm">
              Morning
            </div>
            <i className="ri-arrow-right-line text-xl pt-1"></i>
            <Form.Item className="w-[9rem]" name="morning">
              <Select options={shiftData} placeholder="Select" />
            </Form.Item>
          </div>
          <div className="flex items-start gap-3 my-3">
            <div className="bg-white border w-[6rem] rounded px-3 py-[5px] shadow-sm">
              Afternoon
            </div>
            <i className="ri-arrow-right-line text-xl pt-1"></i>
            <Form.Item className="w-[9rem]" name="afternoon">
              <Select options={shiftData} placeholder="Select" />
            </Form.Item>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-white border rounded w-[6rem] px-3 py-[5px] shadow-sm">
              Evening
            </div>
            <i className="ri-arrow-right-line text-xl pt-1"></i>
            <Form.Item className="w-[9rem]" name="evening">
              <Select options={shiftData} placeholder="Select" />
            </Form.Item>
          </div>
        </div>

        <div className="flex justify-end mt-2 mr-3">
          <AppButton type="submit" label="Save" />
        </div>
      </Form>
    </>
  );
};
