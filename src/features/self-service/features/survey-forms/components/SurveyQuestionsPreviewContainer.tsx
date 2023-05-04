import {
  Checkbox,
  Divider,
  Form,
  Input,
  Radio,
  Select,
  Typography,
} from "antd";
import React from "react";
import { EInputType, IFormDetails } from "./SurveyQuestionsContainer";

interface IProps {
  formDetail: IFormDetails | null;
  showPreview: boolean;
}

const SurveyQuestionsPreviewContainer = ({
  formDetail,
  showPreview,
}: IProps) => {
  return (
    <div className={`bg-card p-4 rounded-md ${!showPreview ? "hidden" : ""}`}>
      {formDetail ? (
        <div className="flex flex-col gap-4">
          {/* header */}
          <div className="text-center flex flex-col gap-2 items-center">
            <div className="md:w-3/5">
              <Typography.Title level={3}>
                <span className="text-caramel">
                  {formDetail?.title ?? "No Preview"}
                </span>
              </Typography.Title>
              <Typography.Paragraph>
                {formDetail?.description ?? "No data"}
              </Typography.Paragraph>
            </div>
          </div>
          <Divider />
          {/* questions */}
          <Form>
            <div className="flex flex-col gap-4">
              {formDetail?.questions?.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-4 bg-white p-4 rounded-md"
                >
                  {/* content */}
                  <div className="flex gap-2">
                    <span className="text-xs">{index + 1}.)</span>
                    <p>{item.content}</p>
                  </div>
                  <div className="px-6">
                    {item.type === EInputType.TEXT_INPUT && (
                      <Form.Item name={item.id}>
                        <Input placeholder="Type your answer here" />
                      </Form.Item>
                    )}
                    {item.type === EInputType.TEXTAREA && (
                      <Form.Item name={item.id}>
                        <Input.TextArea placeholder="Type your answer here" />
                      </Form.Item>
                    )}
                    {item.type === EInputType.CHECKBOX && (
                      <Form.Item name={item.id}>
                        <div className="grid md:grid-cols-3 gap-4">
                          {item.options?.map((option, i) => (
                            <Checkbox key={i} value={option.value}>
                              {option.value}
                            </Checkbox>
                          ))}
                        </div>
                      </Form.Item>
                    )}
                    {item.type === EInputType.RADIO && (
                      <Form.Item name={item.id}>
                        <Radio.Group>
                          {item.options?.map((option, i) => (
                            <Radio key={i} value={option.value}>
                              {option.value}
                            </Radio>
                          ))}
                        </Radio.Group>
                      </Form.Item>
                    )}
                    {item.type === EInputType.SELECT && (
                      <Form.Item name={item.id}>
                        <Select style={{ width: "max-content" }}>
                          {item.options?.map((option, i) => (
                            <Select.Option key={i} value={option.value}>
                              {option.value}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Form>
        </div>
      ) : (
        <div>No detail has been inputted</div>
      )}
    </div>
  );
};

export default SurveyQuestionsPreviewContainer;
