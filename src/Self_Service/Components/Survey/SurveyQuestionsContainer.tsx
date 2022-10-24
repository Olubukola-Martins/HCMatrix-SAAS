import { Form, Input, Select, Space, Button, Typography } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import CheckBoxForm from "./TypeForms/CheckBoxForm";
import SelectForm from "./TypeForms/SelectForm";
import RadioForm from "./TypeForms/RadioForm";
import type { FormInstance } from "antd/es/form";

const { Option } = Select;

export enum EInputType {
  TEXT_INPUT = "text input",
  TEXTAREA = "textarea",
  CHECKBOX = "checkbox",
  RADIO = "radio",
  SELECT = "select",
}
const types: EInputType[] = [
  EInputType.TEXT_INPUT,
  EInputType.CHECKBOX,
  EInputType.TEXTAREA,
  EInputType.RADIO,
  EInputType.SELECT,
];

interface IQOption {
  id: number;
  type: EInputType;
  options?: { letter: string; value: string }[];
}

export interface IFormDetails {
  title: string;
  description?: string;
  questions: {
    id: number;
    type: EInputType;
    content: string;
    options?: { letter?: string; value: string }[];
  }[];
}

interface IProps {
  handleFormDetail: Function;
  showPreview: boolean;
}

const SurveyQuestionsContainer = ({
  handleFormDetail,
  showPreview,
}: IProps) => {
  const [form] = Form.useForm();
  const formRef = React.createRef<FormInstance>();
  const [selectedType, setSelectedType] = useState<EInputType>(
    EInputType.TEXTAREA
  );
  const [questionOptions, setQuestionOptions] = useState<IQOption[]>([]);

  const onFinish = (values: any) => {
    console.log("Received values of form:", values);
    console.log(
      "The answer =>",
      form.getFieldValue("title"),
      form.getFieldsValue(true),
      formRef.current!.getFieldsValue(true)
    );
  };

  const handleSelect = (val: EInputType, option: any) => {
    const id = option.key.split(":")[1];
    const type = option.key.split(":")[0];
    console.log("option =>", option.key.split(":"));
    setSelectedType(val);
    let items;
    if (questionOptions.find((item) => item.id === id)) {
      items = questionOptions.map((item) =>
        item.id === id ? { ...item, id, type } : item
      );
    } else {
      items = [
        ...questionOptions,
        {
          id,
          type,
        },
      ];
    }
    setQuestionOptions(items);
    console.log("option =>", option.key.split(":"), questionOptions);
  };

  useEffect(() => {
    console.log(
      "Welcome =>",
      form.getFieldValue("title"),
      form.getFieldsValue(true),
      formRef.current!.getFieldValue("title")
    );
    const formDetail: IFormDetails = {
      title: formRef.current!.getFieldValue("title"),
      ...form.getFieldsValue(true),
    };
    handleFormDetail(() => formDetail);
  }, [showPreview]);

  return (
    <div
      className={`${showPreview ? "hidden" : ""} bg-card px-6 rounded-md py-5`}
    >
      <Form
        labelCol={{ span: 24 }}
        form={form}
        ref={formRef}
        name="form_nest_item"
        onFinish={onFinish}
        autoComplete="off"
        requiredMark={false}
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <div className="bg-white py-3  px-4 grid md:grid-cols-1 gap-2 rounded-md">
              <Form.Item label="Form Title" name={"title"}>
                <Input placeholder="Form Title" />
              </Form.Item>
              <Form.Item label="Form Description" name={"description"}>
                <Input.TextArea placeholder="Form Description" />
              </Form.Item>
            </div>
            {/* dynamic form */}
            <div className="bg-white py-3  px-4 grid md:grid-cols-1 gap-2 rounded-md w-full">
              <div className="grid md:grid-cols-3 gap-2">
                <Typography.Text>
                  <span className="font-bold">Question</span>
                </Typography.Text>
                <Typography.Text>
                  <span className="font-bold">Type</span>
                </Typography.Text>
              </div>

              <Form.List
                name="questions"
                rules={[
                  {
                    validator: async (_, names) => {
                      if (!names || names.length < 2) {
                        return Promise.reject(
                          new Error("At least 2 questions")
                        );
                      }
                    },
                  },
                ]}
              >
                {(fields, { add, remove }, { errors }) => (
                  <div className="flex flex-col gap-4">
                    {fields.map((field, index) => (
                      <div className="bg-card pt-4 px-4 rounded-md flex flex-col gap-2">
                        <div>
                          <span className="font-semibold text-xs text-accent">
                            {index + 1}.)
                          </span>
                        </div>
                        <div className="grid md:grid-cols-3 gap-2 " key={index}>
                          <Form.Item
                            {...field}
                            name={[field.name, "content"]}
                            rules={[
                              { required: true, message: "Missing question" },
                            ]}
                          >
                            <Input.TextArea
                              rows={4}
                              placeholder="What is the question?"
                            />
                          </Form.Item>
                          <Form.Item
                            {...field}
                            name={[field.name, "type"]}
                            rules={[
                              { required: true, message: "Missing type" },
                            ]}
                          >
                            <Select
                              placeholder="What is the type?"
                              onSelect={handleSelect}
                            >
                              {types.map((item) => (
                                <Option value={item} key={`${item}:${index}`}>
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
                          <div className="pl-4 md:col-span-2">
                            {/* check */}
                            {questionOptions.find((item) => item.id == index)
                              ?.type === EInputType.CHECKBOX && (
                              <Form.List
                                {...field}
                                name={[field.name, "options"]}
                                // rules={[
                                //   { required: true, message: "Missing type" },
                                // ]}
                              >
                                {(rfields, { add: radd, remove: rremove }) => (
                                  <CheckBoxForm
                                    fields={rfields}
                                    add={radd}
                                    remove={rremove}
                                  />
                                )}
                              </Form.List>
                            )}
                            {/* select */}
                            {questionOptions.find((item) => item.id == index)
                              ?.type === EInputType.SELECT && (
                              <Form.List
                                {...field}
                                name={[field.name, "options"]}
                                // rules={[
                                //   { required: true, message: "Missing type" },
                                // ]}
                              >
                                {(rfields, { add: radd, remove: rremove }) => (
                                  <SelectForm
                                    fields={rfields}
                                    add={radd}
                                    remove={rremove}
                                  />
                                )}
                              </Form.List>
                            )}
                            {/* radio */}
                            {questionOptions.find((item) => item.id == index)
                              ?.type === EInputType.RADIO && (
                              <Form.List
                                {...field}
                                name={[field.name, "options"]}
                                // rules={[
                                //   { required: true, message: "Missing type" },
                                // ]}
                              >
                                {(rfields, { add: radd, remove: rremove }) => (
                                  <RadioForm
                                    fields={rfields}
                                    add={radd}
                                    remove={rremove}
                                  />
                                )}
                              </Form.List>
                            )}
                          </div>
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
                        Add Question
                      </Button>

                      <Form.ErrorList errors={errors} />
                    </Form.Item>
                  </div>
                )}
              </Form.List>
            </div>
          </div>{" "}
          <div className="flex justify-end">
            <Form.Item>
              <button className="button" type="submit">
                Submit
              </button>
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default SurveyQuestionsContainer;
