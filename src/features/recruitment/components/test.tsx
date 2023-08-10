import React from "react";
import { Form, Input, Button } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

export const DynamicForm: React.FC = () => {
  const onFinish = (values: any) => {
    console.log("Received values of form:", values);
  };

  return (
    <Form name="dynamic-form" onFinish={onFinish}>
          <Form.List name="name">
              
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, index) => (
              <div key={field.key}>
                <Form.Item
                  {...field}
                  label={`First Name #${index + 1}`}
                  name={[field.name, "first_name"]}
                  rules={[
                    { required: true, message: "First name is required" },
                  ]}
                >
                  <Input placeholder="Enter first name" />
                </Form.Item>
                <Form.Item
                  {...field}
                  label={`Last Name #${index + 1}`}
                  name={[field.name, "last_name"]}
                  
                  rules={[{ required: true, message: "Last name is required" }]}
                >
                  <Input placeholder="Enter last name" />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(field.name)} />
              </div>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add User
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

// export default DynamicForm;
