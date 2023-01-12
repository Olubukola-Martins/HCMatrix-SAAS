import React from "react";
import logo from "Layout/Images/logo2.png";
import { Steps } from "antd";

export const InvitedEmployeeForm = () => {
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
          <div>
            <img src={logo} alt="logo" className="h-10" />
          </div>

          <Steps>
            <Steps.Step title="Test" />

            {/* </Steps.Step> */}
          </Steps>
        </div>
      </div>
    </div>
  );
};
