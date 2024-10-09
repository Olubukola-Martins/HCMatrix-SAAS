import { Form, Select, Switch } from "antd";
import { AppButton } from "components/button/AppButton";
import { LeaningSettingsNav } from "features/learningAndDev/components/settings/LeaningSettingsNav";
import "../../assets/style.css";

export const GamificationSettings = () => {
  const [form] = Form.useForm();

  const handleFormSubmit = (values: any) => {};
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
                      { value: 3, label: "Level 3" },
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
