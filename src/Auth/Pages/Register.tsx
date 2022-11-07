import peachBg from "../Assets/Images/peachBg.png";
import lightBg from "../Assets/Images/lightBg.png";
import logo from "../Assets/Images/logo.png";
import { Form, Input } from "antd";
import { LockOutlined, ReconciliationOutlined, UserOutlined } from "@ant-design/icons";

export const Register = () => {
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
        className="Container w-full h-screen py-2 bg-cover bg-no-repeat flex items-center justify-center text-center"
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
                <Form.Item name="fullName">
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Full Name"
                    className="rounded"
                    style={{ padding: "6px 5px" }}
                  />
                </Form.Item>
                <Form.Item name="organization">
                  <Input
                    prefix={<ReconciliationOutlined className="site-form-item-icon text-base" />}
                    placeholder="Organization Name"
                    className="rounded"
                    style={{ padding: "6px 5px" }}
                  />
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
