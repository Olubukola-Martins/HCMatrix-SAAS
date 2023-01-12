import React, { useState } from "react";
import logo from "Layout/Images/logo2.png";
import { Form, Input, Steps } from "antd";
import {
  emailValidationRules,
  generalValidationRules,
} from "FormHelpers/validation";

interface loginProps {
  onFinished: any;
  initialValues: any;
}

export const InvitedEmployeeForm = () => {
  const [current, setCurrent] = useState(0);
  const [loginDetails, setLoginDetails] = useState<null>(null);
  const [profileDetails, setProfileDetails] = useState<null>(null);

  const onFinishLoginForm = (values: React.SetStateAction<null>) => {
    setLoginDetails(values);
    setCurrent(1);
  };
  const onFinishProfileForm = (values: React.SetStateAction<null>) => {
    setProfileDetails(values);
    setCurrent(2);
  };
  const forms = [
    <LoginForm onFinished={onFinishLoginForm} initialValues={loginDetails} />,
    <ProfileForm
      onFinished={onFinishProfileForm}
      initialValues={profileDetails}
    />,
    <Finish />,
  ];
  const isStepDisabled = (stepNumber: number) => {
    if (stepNumber === 0) {
      return false;
    }
    if (stepNumber === 1) {
      return loginDetails === null;
    }
    if (stepNumber === 2) {
      return loginDetails === null || profileDetails === null;
    }
  };

  return (
    <div className="Container">
      <div className="flex justify-center">
        <div
          className="bg-white rounded-md mt-5 p-5"
          style={{
            boxShadow:
              "0 2px 5px rgba(0,0,0,0.12), 1px 1px 2px rgba(0,0,0,0.24)",
          }}
        >
          <div className="mb-5">
            <img src={logo} alt="logo" className="h-10" />
          </div>

          <Steps
            style={{ padding: "32px 16px" }}
            onChange={setCurrent}
            current={current}
          >
            <Steps.Step disabled={isStepDisabled(0)} title="Login" />
            <Steps.Step disabled={isStepDisabled(1)} title="Profile" />
            <Steps.Step disabled={isStepDisabled(2)} title="Finish" />
          </Steps>
          {forms[current]}
        </div>
      </div>
    </div>
  );
};

// Login form first step
const LoginForm = ({ onFinished, initialValues }: loginProps) => {
  return (
    <Form onFinish={onFinished} initialValues={initialValues}>
      <Form.Item name="email" label="Email" rules={emailValidationRules}>
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={generalValidationRules}
      >
        <Input.Password />
      </Form.Item>
      <button type="submit" className="button">
        Continue
      </button>
    </Form>
  );
};

// Profile form step 2
const ProfileForm = ({ onFinished, initialValues }: loginProps) => {
  return (
    <Form onFinish={onFinished} initialValues={initialValues}>
      <Form.Item
        name="first name"
        label="First name"
        rules={generalValidationRules}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="lastName"
        label="Last name"
        rules={generalValidationRules}
      >
        <Input />
      </Form.Item>
      <button type="submit" className="button">
        Submit
      </button>
    </Form>
  );
};

// last step
const Finish = () => {
  return <h1>You are all set</h1>;
};
function stepNumber(arg0: number): boolean | undefined {
  throw new Error("Function not implemented.");
}
