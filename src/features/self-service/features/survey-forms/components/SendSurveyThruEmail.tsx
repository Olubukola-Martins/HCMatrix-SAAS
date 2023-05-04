import { Form, Input, Select } from "antd";
import React, { useState } from "react";

const users = Array(4)
  .fill(3)
  .map((item, i) => ({
    title: "John Doe",
    value: "John Doe " + i,
    children: "Alex",
    key: i,
    id: i,
  }));
const categories = [
  {
    title: "User Group",
    value: "User Group ",
    children: "Group 1",
    key: 1,
    id: 1,
  },
  {
    title: "Department",
    value: "Department ",
    children: "App Dev",
    key: 0,
    id: 0,
  },
];

const SendSurveyThruEmail = () => {
  const [categoryItems, setCategoryItems] = useState([]);
  return (
    <div className="mt-4">
      <Form labelCol={{ span: 24 }} requiredMark={false}>
        <Form.Item name="category" rules={[{ required: true }]}>
          <Select options={categories} placeholder="Select category" />
        </Form.Item>
        <Form.Item name="categoryIds" rules={[{ required: true }]}>
          <Select options={categoryItems} placeholder="Selcet employee" />
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
