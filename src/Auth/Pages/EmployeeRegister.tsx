import peachBg from "../Assets/Images/peachBg.png";
// import greenBg from "../Assets/Images/greenBg.png";
import lightBg from "../Assets/Images/lightBg.png";
import logo from "../Assets/Images/logo.png";
import microsoft from "../Assets/Images/microsoft.svg";
import google from "../Assets/Images/google.svg";
import office from "../Assets/Images/office.svg";
import linkedin from "../Assets/Images/linkedin.svg";
import { Divider, Form, Input, Select } from "antd";
import "../Style/style.css";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Link, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import { useIsAuthenticated } from "react-auth-kit";

export const EmployeeRegister = () => {
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    Aos.init({ duration: 1500 });
  }, []);
  return (
    <>
      {isAuthenticated() && <Navigate to="/" replace={true} />}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div
          className="Container w-full text-white py-2 bg-cover bg-no-repeat authIntro"
          style={{ backgroundImage: `url(${peachBg})` }}
        >
          <div>
            <img src={logo} alt="logo" className="h-16" />
            <div className="flex items-center justify-center authIntroInner">
              <div className="text-center">
                <h2
                  data-aos="fade-down"
                  className="text-white text-xl font-bold"
                >
                  Welcome To HCMatrix!
                </h2>
                <p className="pt-6 pb-4">
                  Already have an account? <br className="hidden md:flex" />
                  please login with your personal information to stay
                  <br className="hidden md:flex" /> connected with us.
                </p>
                <div className="flex justify-center">
                  <Link
                    to="/login"
                    className="border justify-center flex items-center gap-3 border-white rounded px-16 py-1 text-white hover:border-gray-700 font-medium text-base transition duration-300 ease-in-out"
                  >
                    <i className="ri-arrow-left-line"></i> <span>Sign In</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="Container w-full h-screen py-10 bg-cover bg-no-repeat text-center relative overflow-y-auto overflow-x-hidden"
          style={{ backgroundImage: `url(${lightBg})` }}
        >
          <div className="formWrap lg:pt-24" style={{ maxWidth: 500 }}>
            <div>
              <div
                data-aos="fade-left"
                style={{
                  boxShadow:
                    "0 2px 5px rgba(0,0,0,0.12), 1px 1px 2px rgba(0,0,0,0.24)",
                }}
                className="pb-5 pt-6 rounded-md px-6"
              >
                <h2 className="text-xl md:text-2xl font-bold">
                  Create Account
                </h2>
                <p className="pt-2 pb-7">Getting started made easy</p>
                <div className="lg:px-14">
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
                        prefix={
                          <LockOutlined className="site-form-item-icon pr-1" />
                        }
                        placeholder="Confirm Password"
                        className="rounded border-slate-400"
                        style={{ padding: "6px 5px" }}
                      />
                    </Form.Item>

                    <button className="authBtn w-full mt-4 mb-3">
                      Sign Up
                    </button>
                  </Form>
                  <Divider>
                    <span className="text-sm">Sign Up with</span>
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
            <div
              className="flex items-center gap-2 justify-center text-xs py-5"
              style={{ color: "var(--authPrimary)" }}
            >
              <span>Private Policy</span>
              <span className="text-black font-semibold text-xl">.</span>
              <span>Terms of service</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
