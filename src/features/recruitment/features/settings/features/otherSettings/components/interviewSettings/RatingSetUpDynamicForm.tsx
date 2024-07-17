import React from "react";
import { Form, Input } from "antd";
import { AppButton } from "components/button/AppButton";
import {
  textInputValidationRules,
  textInputValidationRulesOpt,
} from "utils/formHelpers/validation";
import { RatingFormList } from "./RatingFormList";
import { IRatingSetUpDynamicFormProps } from "../../types";



export const RatingSetUpDynamicForm: React.FC<IRatingSetUpDynamicFormProps> = ({
  initialValues,
  onSubmit,
}) => {
  const [form] = Form.useForm();

  const handleAddField = () => {
    const newRatingSetup = form.getFieldValue("newRatingSetup") || [];
    const initialRatingSetup = {
      metric: "",
      weight: "",
      criteria: [""],
    };
    form.setFieldsValue({
      newRatingSetup: [...newRatingSetup, initialRatingSetup],
    });
  };

  const handleRemoveField = (index: number) => {
    const newRatingSetup = form.getFieldValue("newRatingSetup") || [];
    form.setFieldsValue({
      newRatingSetup: newRatingSetup.filter((_: any, i: number) => i !== index),
    });
  };

  return (
    <div className="Container">
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        requiredMark={false}
        onFinish={onSubmit}
      >
        <div className="flex flex-col lg:flex-row gap-5">
          <Form.Item
            label="Metric"
            name="metric"
            rules={textInputValidationRules}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Weight(%)"
            name="weight"
            rules={textInputValidationRules}
          >
            <Input />
          </Form.Item>
        </div>

        <Form.List name="criteria">
          {(fields, { add, remove }) => (
            <RatingFormList
              fields={fields}
              add={add}
              remove={remove}
              placeholderPrefix="Criteria"
            />
          )}
        </Form.List>

        <Form.List name="newRatingSetup">
          {(fields) => (
            <>
              {fields.map((field) => (
                <div key={field.key}>
                  <div className="flex flex-col lg:flex-row gap-5">
                    <Form.Item
                      label="Metric"
                      name={[field.name, "metric"]}
                      rules={textInputValidationRules}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Weight(%)"
                      name={[field.name, "weight"]}
                      rules={textInputValidationRules}
                    >
                      <Input />
                    </Form.Item>
                  </div>
                  <Form.List name={[field.name, "criteria"]}>
                    {(
                      criteriaFields,
                      { add: addCriteria, remove: removeCriteria }
                    ) => (
                      <>
                        {criteriaFields.map((criteriaField, criteriaIndex) => (
                          <Form.Item
                            key={criteriaField.key}
                            label={criteriaIndex === 0 ? "Criteria" : ""}
                            name={[criteriaField.name]}
                            rules={textInputValidationRulesOpt}
                          >
                            <Input
                              placeholder={
                                criteriaIndex > 0
                                  ? `Criteria ${criteriaIndex + 1}`
                                  : "Criteria"
                              }
                            />
                          </Form.Item>
                        ))}

                        <div className="flex justify-end gap-2">
                          <button type="button" onClick={() => addCriteria("")}>
                            <i className="ri-add-circle-line text-xl cursor-pointer hover:text-caramel"></i>
                          </button>
                          {criteriaFields.length > 1 && (
                            <button
                              type="button"
                              onClick={() =>
                                removeCriteria(criteriaFields.length - 1)
                              }
                            >
                              <i className="ri-delete-bin-line text-xl cursor-pointer hover:text-caramel"></i>
                            </button>
                          )}
                        </div>
                      </>
                    )}
                  </Form.List>

                  <div className="my-4">
                    
                    <AppButton
                      label="Remove Rating Field"
                      variant="transparent"
                      handleClick={() => handleRemoveField(field.key)}
                    />
                  </div>
                </div>
              ))}
            </>
          )}
        </Form.List>

        <div className="flex justify-end items-center my-5">
          <AppButton
            label="+ Add New Rating Field"
            variant="transparent"
            handleClick={handleAddField}
          />
        </div>

        <div className="flex justify-end">
          <AppButton label="Save" type="submit" />
        </div>
      </Form>
    </div>
  );
};
