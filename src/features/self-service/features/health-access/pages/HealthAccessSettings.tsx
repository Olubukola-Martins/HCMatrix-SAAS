import React, { useState } from "react";

import { Button, Form, InputNumber } from "antd";
import SelfServiceSubNav from "features/self-service/components/SelfServiceSubNav";
import HealthAccessSettHeader from "../components/HealthAccessSettHeader";

const gapStyle = "bg-white pt-4 px-3 flex  gap-16 align-center rounded-md";

const HealthAccessSettings = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [comp, setComp] = useState("");

  return (
    <>
      <SelfServiceSubNav />
      {/* add new leave */}

      <div>
        <div className="Container">
          {/* header */}
          <HealthAccessSettHeader />
          <div className="mt-6 bg-card py-6 px-6 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h4 className="text-xl font-thin ">Payment Burden Setting</h4>
              <p className="text-base text-slate-400 font-extralight">
                Specify the monthly percentage you and your employees will pay.
              </p>
            </div>
            <Form labelCol={{ span: 24 }}>
              <div className="flex flex-col gap-4">
                <div className={gapStyle}>
                  <Form.Item label="Employer Burden" className="flex-1">
                    <InputNumber
                      placeholder="Employer Burden"
                      className="w-full"
                    />
                  </Form.Item>
                  <Form.Item label="Employee Burden" className="flex-1">
                    <InputNumber
                      placeholder="Employee Burden"
                      className="w-full"
                    />
                  </Form.Item>
                </div>
              </div>
            </Form>
            <div className="flex items-center justify-between">
              <Button type="text">Cancel</Button>
              <button className="button">Save</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HealthAccessSettings;
