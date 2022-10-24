import { Form, Input, Select } from "antd";
import React from "react";

const users = Array(4)
  .fill(3)
  .map((item, i) => ({
    title: "John Doe",
    value: "John Doe " + i,
    children: "Alex",
    key: i,
    id: i,
  }));

const SendSurveyThruEmail = () => {
  return (
    <div className="mt-4">
      <Form labelCol={{ span: 24 }} requiredMark={false}>
        <Form.Item name="email" rules={[{ required: true }]}>
          <Select options={users} placeholder="Selcet employee" />
        </Form.Item>
        <Form.Item name="subject" rules={[{ required: true }]}>
          <Input placeholder="Subject" />
        </Form.Item>
        <Form.Item name="description" rules={[{ required: true }]}>
          <Input placeholder="Description" />
        </Form.Item>
        <Form.Item>
          <div className="flex justify-end">
            <button className="button">Send</button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SendSurveyThruEmail;
