import peachBg from "../Assets/Images/peachBg.png";
import lightBg from "../Assets/Images/lightBg.png";
import logo from "../Assets/Images/logo.png";
import microsoft from "../Assets/Images/microsoft.svg";
import google from "../Assets/Images/google.svg";
import office from "../Assets/Images/office.svg";
import linkedin from "../Assets/Images/linkedin.svg";
import { Divider, Form, Input, Select } from "antd";
import "../Style/style.css";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import {
  emailValidationRules,
  generalValidationRules,
} from "../../FormHelpers/validation";
import { Link } from "react-router-dom";

export const Login = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div
        className="Container w-full text-white py-2 bg-cover bg-no-repeat authIntro"
        style={{ backgroundImage: `url(${peachBg})` }}
      >
        <div>
          <img src={logo} alt="logo" className="h-16" />
          <div className="flex items-center justify-center authIntroInner">
            <div className="text-center">
              <h2 className="text-white text-xl font-bold">
                Great To Have You Back!
              </h2>
              <p className="pt-6 pb-4">
                We provide you with a better and more dependable approach to
                <br className="hidden md:flex" /> operating your business to
                boost profits and productivity.
              </p>
              <div className="flex justify-center">
                <Link to="/register" className="border justify-center flex items-center gap-3 border-white rounded px-16 py-1 text-white hover:border-gray-700 font-medium text-base transition duration-300 ease-in-out">
                  <i className="ri-arrow-left-line"></i> <span>Sign Up</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="Container w-full h-screen py-10 bg-cover bg-no-repeat text-center relative overflow-auto"
        style={{ backgroundImage: `url(${lightBg})` }}
      >
        <div className="formWrap pt-10" style={{ maxWidth: 500 }}>
          <div>
            <div
              style={{
                boxShadow:
                  "0 2px 5px rgba(0,0,0,0.12), 1px 1px 2px rgba(0,0,0,0.24)",
              }}
              className="pb-5 pt-6 rounded-md px-6"
            >
              <h2 className="text-xl md:text-2xl font-bold">
                Login to your account
              </h2>
              <p className="pt-2 pb-7">Getting started made easy</p>
              <div className="px-4">
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
                      prefix={
                        <MailOutlined className="site-form-item-icon pr-1" />
                      }
                      placeholder="Employee ID or Work Email"
                      className="rounded border-slate-400"
                      style={{ padding: "6px 5px" }}
                    />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={generalValidationRules}
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

                  <button className="button w-full mt-4 mb-3">Sign In</button>
                </Form>
                <Divider>
                  <span className="text-sm">Sign In with</span>
                </Divider>
                <div className="flex items-center justify-center gap-6">
                  <img
                    src={microsoft}
                    alt="microsoft"
                    className="cursor-pointer"
                    title="Microsoft"
                  />
                  <img
                    src={google}
                    alt="google"
                    className="cursor-pointer"
                    title="Google"
                  />
                  <img
                    src={linkedin}
                    alt="microsoft"
                    className="cursor-pointer"
                    title="Linkedin"
                  />
                  <img
                    src={office}
                    alt="microsoft"
                    className="-ml-4 cursor-pointer"
                    title="Microsoft"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 justify-center text-xs py-5">
            <span className="text-caramel">Private Policy</span>
            <span className="text-black font-semibold text-xl">.</span>
            <span className="text-caramel">Terms of service</span>
          </div>
        </div>
      </div>
    </div>
  );
};
