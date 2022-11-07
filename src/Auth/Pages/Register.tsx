import peachBg from "../Assets/Images/peachBg.png";
import lightBg from "../Assets/Images/lightBg.png";
import logo from "../Assets/Images/logo.png";
import { Divider, Form, Input, Select } from "antd";

import {
  LockOutlined,
  ReconciliationOutlined,
  UserOutlined,
  BankOutlined,
  MailOutlined,
} from "@ant-design/icons";
import React from "react";
import {
  emailValidationRules,
  generalValidationRules,
} from "../../FormHelpers/validation";
const { Option } = Select;

export const Register = () => {
  const industryData = [
    "Advertising & marketing",
    " Agriculture",
    "Chemicals & Resources",
    " Construction",
    "Consumer Goods & FMCG",
    "E-COMMERCE",
    "Health, Pharmacy & Medtech",
    "Internet",
    "Life",
    " Media",
    "Metals & Electronics",
    "Real Estate",
    " Retail and Trade",
    "Services",
    "Society",
    " Sports & Recreation",
    "Technology & Telecommunications",
    "transportation and Logistics",
    "Travel, Tourism & Hospitality",
  ];

  return (
    <div className="flex">
      <div
        className="Container w-full h-screen text-white py-2 bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${peachBg})` }}
      >
        <div>
          <img src={logo} alt="logo" className="h-16" />
          <div
            className="flex items-center justify-center"
            style={{ height: "80vh" }}
          >
            <div className="text-center">
              <h2 className="text-white text-xl font-bold">
                Welcome To HCMatrix!
              </h2>
              <p className="pt-6 pb-4">
                Already have an account? <br className="hidden md:flex" />
                please login with your personal information to stay
                <br className="hidden md:flex" /> connected with us.
              </p>
              <button className="border border-white rounded px-16 py-1 text-white hover:border-gray-700 font-medium text-base transition duration-300 ease-in-out">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="Container w-full h-screen pb-10 pt-32 overflow-auto bg-cover bg-no-repeat flex items-center justify-center text-center"
        style={{ backgroundImage: `url(${lightBg})` }}
      >
        <div>
          <div
            style={{
              boxShadow:
                "0 2px 5px rgba(0,0,0,0.12), 1px 1px 2px rgba(0,0,0,0.24)",
            }}
            className="pb-5 pt-6 rounded-md px-6"
          >
            <h2 className="text-2xl font-bold">Create Company Account</h2>
            <p className="pt-2 pb-7">Getting started made easy</p>
            <div className="px-4">
              <Form>
                <Form.Item
                  name="fullName"
                  rules={generalValidationRules}
                  hasFeedback
                >
                  <Input
                    prefix={
                      <UserOutlined className="site-form-item-icon pr-1" />
                    }
                    placeholder="Full Name"
                    className="rounded border-slate-400"
                    style={{ padding: "6px 5px" }}
                  />
                </Form.Item>
                <Form.Item
                  name="organization"
                  rules={generalValidationRules}
                  hasFeedback
                >
                  <Input
                    prefix={
                      <ReconciliationOutlined className="site-form-item-icon pr-1" />
                    }
                    placeholder="Organization Name"
                    className="rounded border-slate-400"
                    style={{ padding: "6px 5px" }}
                  />
                </Form.Item>
                <Form.Item
                  name="industry"
                  rules={generalValidationRules}
                  hasFeedback
                >
                  <Select
                    showSearch
                    allowClear
                    optionLabelProp="label"
                    className="border-red-400"
                    placeholder={
                      <div className="flex justify-start items-center">
                        <BankOutlined className="site-form-item-icon pr-1 text-black" />
                        &nbsp; Industry
                      </div>
                    }
                    style={{ width: "100%" }}
                  >
                    {industryData.map((data) => (
                      <Select.Option
                        key={data}
                        value={data}
                        label={
                          <div className="flex justify-start items-center">
                            <BankOutlined className="site-form-item-icon pr-1 text-black" />
                            &nbsp;
                            {data}
                          </div>
                        }
                      >
                        {data}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
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
                    prefix={
                      <MailOutlined className="site-form-item-icon pr-1" />
                    }
                    placeholder="Business Email"
                    className="rounded border-slate-400"
                    style={{ padding: "6px 5px" }}
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
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
                    prefix={
                      <LockOutlined className="site-form-item-icon pr-1" />
                    }
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
                    prefix={
                      <LockOutlined className="site-form-item-icon pr-1" />
                    }
                    placeholder="Conform Password"
                    className="rounded border-slate-400"
                    style={{ padding: "6px 5px" }}
                  />
                </Form.Item>
                <button className="button w-full mt-4 mb-3">Sign Up</button>
              </Form>
              <Divider><span className="text-sm">Sign Up with</span></Divider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
