import { MailOutlined, LockOutlined } from "@mui/icons-material";
import { Form, Input } from "antd";
import React from "react";

export const EmployeeRegistrationForm = () => {
  
  return (
    <div>
      <Form>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Field is required",
            },
            { type: "email", message: "Invalid Email Address" },
          ]}
          hasFeedback
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon pr-1" />}
            placeholder="Employee ID or Work Email"
            className="rounded border-slate-400"
            style={{ padding: "6px 5px" }}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Field is required",
            },
            {
              min: 6,
              message: "password must be at least 6 characters",
            },
            // {
            //   validator: (_, value) =>
            //     value && value.includes("A")
            //       ? Promise.resolve()
            //       : Promise.reject("Password does not match criteria."),
            // },
          ]}
          hasFeedback
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon pr-1" />}
            placeholder="Password"
            className="rounded border-slate-400"
            style={{ padding: "6px 5px" }}
          />
        </Form.Item>

        <Form.Item
          name="CPassword"
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "Field is required",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  "The two passwords that you entered does not match."
                );
              },
            }),
          ]}
          hasFeedback
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon pr-1" />}
            placeholder="Confirm Password"
            className="rounded border-slate-400"
            style={{ padding: "6px 5px" }}
          />
        </Form.Item>

        <button className="authBtn w-full mt-4 mb-3">Sign Up</button>
      </Form>
    </div>
  );
};
