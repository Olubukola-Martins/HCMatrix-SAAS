import { Form, Input, Switch } from "antd";
import { RecruitmentSettingsIntro } from "../components/RecruitmentSettingsIntro";
import { appRoutes } from "config/router/paths";
import { textInputValidationRules } from "utils/formHelpers/validation";
import { AppButton } from "components/button/AppButton";
import "../assets/style.css";

const CandidateSource = () => {
  const [form] = Form.useForm();
  const handleSubmit = (values: any) => {
    console.log("Received values of form:", values);
  };

  const handleAddField = () => {
    const newStatus = form.getFieldValue("newStatus") || [];
    const initialStatus = { statusName: "", allowStatus: true };
    form.setFieldsValue({ newStatus: [...newStatus, initialStatus] });
  };

  const handleRemoveField = (index: number) => {
    const newStatus = form.getFieldValue("newStatus") || [];
    form.setFieldsValue({
      newStatus: newStatus.filter((_: any, i: number) => i !== index),
    });
  };

  return (
    <>
      <RecruitmentSettingsIntro
        title="Candidate Source"
        description={"Integrate more platform to the system."}
        nextLink={appRoutes.recruitmentEmailTemplate}
      />

      <div className="Container mt-5">
        <div className="bg-card rounded md:p-5 p-3">
          <h2 className="pb-5 font-medium text-base">Sources</h2>
          <div className="bg-mainBg py-4 px-4 rounded">
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
              <div className=" recruitmentSettingsForm ">
                <h3 className="font-medium">LinkedIn</h3>
                <Form.Item
                  name="test"
                  className="flex justify-end items-end"
                  noStyle
                >
                  <Switch />
                </Form.Item>
              </div>

              <div>
                <h2 className="pb-5 font-medium text-base">Source name</h2>
                <Form.List name="newStatus">
                  {(fields) => (
                    <>
                      {fields.map((field, index) => (
                        <div key={field.key} className="grid grid-cols-2 ">
                          <Form.Item
                            {...field}
                            name={[field.name, "statusName"]}
                            label="Name"
                            rules={textInputValidationRules}
                          >
                            <Input placeholder="Enter status name" />
                          </Form.Item>
                          <div className="flex gap-5 items-center justify-end">
                            <Form.Item
                              {...field}
                              name={[field.name, "allowStatus"]}
                              noStyle
                              valuePropName="checked"
                            >
                              <Switch />
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
                        label="+ Add sources"
                        handleClick={() => handleAddField()}
                      />
                    </>
                  )}
                </Form.List>
              </div>
              <div className="flex justify-end items-center mt-5 gap-4">
                <button
                  className="text-base font-medium hover:text-caramel"
                  type="reset"
                >
                  Cancel
                </button>
                <AppButton type="submit" label="Save" />
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CandidateSource;
