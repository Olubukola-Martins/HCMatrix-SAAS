import React, { useState } from "react";
import DashboardLayout from "../../../Layout/DashboardLayout";
import SelfServiceSubNav from "../../Components/SelfServiceSubNav";

import { Button, Form, InputNumber, Select, Typography } from "antd";

import HealthAccessSettHeader from "../../Components/HealthAccess/HealthAccessSettHeader";

const gapStyle = "bg-white pt-4 px-3 flex  gap-16 align-center rounded-md";

const HealthAccessSettings = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [comp, setComp] = useState("");

  return (
    <DashboardLayout>
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
    </DashboardLayout>
  );
};

export default HealthAccessSettings;
