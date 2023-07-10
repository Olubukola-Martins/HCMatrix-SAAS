import { Form, Select, Switch } from "antd";
import { AppButton } from "components/button/AppButton";
import { LeaningSettingsNav } from "features/leaningAndDev/components/settings/LeaningSettingsNav";
import "../../assets/style.css";

export const Gamification = () => {
  const formWrapStyle1 =
    "bg-card px-4 pt-4 rounded grid grid-cols-1 md:grid-cols-2 gap-x-10 mb-5 shadow-sm";
  const [form] = Form.useForm();

  const handleFormSubmit = (values: any) => {
    console.log("Form submitted:", values);
  };
  return (
    <>
      <LeaningSettingsNav active="gamification" />
      <div className="Container">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-medium text-lg">Gamification Settings</h3>
          <AppButton label="Next setting" />
        </div>

        <div className="bg-card rounded md:p-5 p-3">
          <div className="bg-mainBg py-4 px-4 rounded">
            <Form
              form={form}
              onFinish={handleFormSubmit}
              layout="vertical"
              requiredMark={false}
            >
              <div className={`formWrapper`}>
                <h3 className="font-medium">
                  Allow employee view their badges
                </h3>
                <div className="flex justify-end">
                  <Form.Item name="allowBadge" noStyle>
                    <Switch defaultChecked />
                  </Form.Item>
                </div>
              </div>
              <div className={`formWrapper`}>
                <h3 className="font-medium">
                  Allow rearrangement of leader board
                </h3>
                <div className="flex justify-end">
                  <Form.Item name="leaderBoard" noStyle>
                    <Switch defaultChecked />
                  </Form.Item>
                </div>
              </div>

              <div className={`formWrapper`}>
                <Form.Item
                  name="level"
                  label="Level settings"
                  className="font-medium"
                >
                  <Select
                    allowClear
                    placeholder="Select"
                    options={[
                      { value: 1, label: "Level 1" },
                      { value: 2, label: "Level 2" },
                    ]}
                  />
                </Form.Item>
                <Form.Item
                  name="course"
                  label="Courses to be completed"
                  className="font-medium"
                >
                  <Select
                    allowClear
                    placeholder="Select"
                    options={[
                      { value: 1, label: "Complete 1 course" },
                      { value: 2, label: "Complete 2 courses" },
                    ]}
                  />
                </Form.Item>
              </div>

              <div className="flex justify-end">
                <AppButton label="Save" type="submit" />
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};
