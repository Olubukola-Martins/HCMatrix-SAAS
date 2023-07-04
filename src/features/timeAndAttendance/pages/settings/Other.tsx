import { Form, InputNumber, Select, Switch } from "antd";
import { AppButton } from "components/button/AppButton";
import { AttendanceSettingsIntro } from "features/timeAndAttendance/components/settings/AttendanceSettingsIntro";
import { TimeAttendanceSettingsNav } from "features/timeAndAttendance/components/settings/TimeAttendanceSettingsNav";

export const Other = () => {
  const formWrapStyle =
    "bg-card px-4 pt-4 rounded grid grid-cols-1 md:grid-cols-2 gap-x-10 mb-5 shadow-sm";
  return (
    <div>
      <TimeAttendanceSettingsNav active="other settings" />
      <AttendanceSettingsIntro
        title={"Other settings"}
        description="Complete the following settings"
      />
      <div className="Container mt-7">
        <div className="bg-card rounded md:p-5 p-3">
          <div className="bg-mainBg py-4 px-4 rounded">
            <h3 className="font-medium text-base pb-3 pt-1">
              Attendance settings
            </h3>
            <Form layout="vertical">
              <div className={formWrapStyle}>
                <Form.Item
                  name="workflow"
                  label="Select manual Attendance workflow"
                >
                  <Select
                    placeholder="Select"
                    options={[{ value: 1, label: "Attendance workflow" }]}
                  />
                </Form.Item>
                <Form.Item
                  name="confirmation"
                  label="Select overtime confirmation workflow"
                >
                  <Select
                    placeholder="Select"
                    options={[{ value: 1, label: "loan workflow" }]}
                  />
                </Form.Item>
              </div>
              <div className={formWrapStyle}>
                <Form.Item name="longitude" label="Company longitude">
                  <InputNumber placeholder="00.00" className="w-full" />
                </Form.Item>
                <Form.Item name="latitude" label="Company latitude">
                  <InputNumber placeholder="0.0" className="w-full" />
                </Form.Item>
              </div>

              <div
                className={`${formWrapStyle} flex justify-between items-center`}
              >
                <h3>Enforce Geofence on soft clock-in</h3>
                <Form.Item className="flex justify-end items-end">
                  <Switch defaultChecked />
                </Form.Item>
              </div>
              <div
                className={`${formWrapStyle} flex justify-between items-center`}
              >
                <Form.Item
                  name="clock-in-distance"
                  label="Allow clock-in distance from company (km)"
                >
                  <InputNumber className="w-full" placeholder="0.00" />
                </Form.Item>

                <Form.Item
                  name="accept"
                  className="flex justify-end items-center"
                >
                  <Switch defaultChecked />
                </Form.Item>
              </div>
              <div className="flex justify-end my-2">
                <AppButton label="Save" type="submit" />
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
