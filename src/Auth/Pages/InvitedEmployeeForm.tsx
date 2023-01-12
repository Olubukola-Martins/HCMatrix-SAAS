import React, { useState } from "react";
import logo from "Layout/Images/logo2.png";
import { Steps } from "antd";
import { CreatePassword } from "Auth/Components/InvitedEmployee/CreatePassword";
import { PersonalInfo } from "Auth/Components/InvitedEmployee/PersonalInfo";
export interface stepperInputProps {
  onFinished: any;
  initialValues: any;
  setCurrent?: any
}

export const InvitedEmployeeForm = () => {
  const [current, setCurrent] = useState(0);
  const [accountDetails, setAccountDetails] = useState<null>(null);
  const [profileDetails, setProfileDetails] = useState<null>(null);

  const onFinishLoginForm = (values: React.SetStateAction<null>) => {
    setAccountDetails(values);
    setCurrent(1);
  };
  const onFinishProfileForm = (values: React.SetStateAction<null>) => {
    setProfileDetails(values);
  };
  const forms = [
    <CreatePassword
      onFinished={onFinishLoginForm}
      initialValues={accountDetails}
    />,
    <PersonalInfo
    setCurrent={setCurrent}
      onFinished={onFinishProfileForm}
      initialValues={profileDetails}
    />,
  ];
  const isStepDisabled = (stepNumber: number) => {
    if (stepNumber === 0) {
      return false;
    }
    if (stepNumber === 1) {
      return accountDetails === null;
    }
    if (stepNumber === 2) {
      return accountDetails === null || profileDetails === null;
    }
  };

  return (
    <div className="Container">
      <div className="flex justify-center">
        <div
          className="bg-white rounded-md my-7 p-5"
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
            <Steps.Step disabled={isStepDisabled(0)} title="Create Password" />
            <Steps.Step
              disabled={isStepDisabled(1)}
              title="Personal Information"
            />
            <Steps.Step
              disabled={isStepDisabled(2)}
              title="Finish"
            />
          </Steps>
          {forms[current]}
        </div>
      </div>
    </div>
  );
};


