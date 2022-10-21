import { Form, Input, Select, Space, Button, Typography } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};

const areas = [
  { label: "Beijing", value: "Beijing" },
  { label: "Shanghai", value: "Shanghai" },
];

const sights = {
  Beijing: ["Tiananmen", "Great Wall"],
  Shanghai: ["Oriental Pearl", "The Bund"],
};
const types = ["text input", "textarea", "checkboxes", "radio", "select"];

type SightsKeys = keyof typeof sights;

const SurveyQuestionsContainer = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Received values of form:", values);
  };

  const handleChange = () => {
    form.setFieldsValue({ sights: [] });
  };

  return (
    <div className="bg-card px-6 rounded-md py-5">
      <Form
        labelCol={{ span: 24 }}
        form={form}
        name="dynamic_form_nest_item"
        onFinish={onFinish}
        autoComplete="off"
        requiredMark={false}
      >
        <div className="flex flex-col gap-4">
          <div className="bg-white py-3  px-4 grid md:grid-cols-1 gap-2 rounded-md">
            <Form.Item label="Form Title">
              <Input placeholder="Form Title" />
            </Form.Item>
            <Form.Item label="Form Description">
              <Input.TextArea placeholder="Form Description" />
            </Form.Item>
          </div>
          {/* dynamic form */}
          <div className="bg-white py-3  px-4 grid md:grid-cols-1 gap-2 rounded-md w-full">
            <div className="grid md:grid-cols-3 gap-2">
              <Typography.Text>Question</Typography.Text>
              <Typography.Text>Type</Typography.Text>
            </div>

            <Form.List
              name="questions"
              rules={[
                {
                  validator: async (_, names) => {
                    if (!names || names.length < 2) {
                      return Promise.reject(new Error("At least 2 questions"));
                    }
                  },
                },
              ]}
            >
              {(fields, { add, remove }, { errors }) => (
                <>
                  {fields.map((field, index) => (
                    <div className="grid md:grid-cols-3 gap-2" key={index}>
                      <Form.Item
                        {...field}
                        name={[field.name, "question"]}
                        rules={[
                          { required: true, message: "Missing question" },
                        ]}
                      >
                        <Input placeholder="What is the question?" />
                      </Form.Item>
                      <Form.Item
                        {...field}
                        name={[field.name, "type"]}
                        rules={[{ required: true, message: "Missing type" }]}
                      >
                        <Select placeholder="What is the type?">
                          {types.map((item) => (
                            <Option value={item} key={item}>
                              {item}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>

                      <div>
                        {fields.length > 1 ? (
                          <div>
                            {/* <div className="h-12" /> */}
                            <MinusCircleOutlined
                              className="dynamic-delete-button"
                              onClick={() => remove(field.name)}
                            />
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      style={{ width: "100%" }}
                      icon={<PlusOutlined />}
                    >
                      Add field
                    </Button>

                    <Form.ErrorList errors={errors} />
                  </Form.Item>
                </>
              )}
            </Form.List>
          </div>
        </div>{" "}
        <Form.Item>
          <button className="button" type="submit">
            Submit
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SurveyQuestionsContainer;
