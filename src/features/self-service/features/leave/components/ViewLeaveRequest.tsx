import { Form, DatePicker, Input, Select, Switch, Button } from "antd";

import React, { useState } from "react";
import Themes from "components/Themes";

const { RangePicker } = DatePicker;
const inputContainerClass = "bg-card text-accent px-2 pt-4 rounded-lg";

const ViewLeaveRequest = ({ id }: any) => {
  // should be from global state - user leave days left
  const [leaveLength, setLeaveLength] = useState(0);
  const handleSubmit = (data: any) => {
    // return;s
    const props = {
      token: "",
      userId: "",
      workAssignee: data.workAssignee,
      leaveType: data.leaveType,
      startDate: data.period[0].format("YYYY-MM-DD"),
      endDate: data.period[1].format("YYYY-MM-DD"),
      leaveLength,
      withPay: data.withPay,
      status: "pending",
      reason: data.reason,
    };
  };

  return (
    <div>
      <Form labelCol={{ span: 24 }} onFinish={handleSubmit}>
        <div className="flex flex-col gap-4">
          <div className={inputContainerClass}>
            <Form.Item label="Period" name="period">
              <RangePicker
                className="w-full"
                // onChange={(period) =>
                //   setLeaveLength(period[1].diff(period[0], "days") + 1)
                // }
              />
            </Form.Item>
          </div>
          <div className={inputContainerClass}>
            <Form.Item label="Number of days">
              <Input
                placeholder="Number of days"
                disabled
                value={leaveLength}
              />
            </Form.Item>
          </div>
          <div className={inputContainerClass}>
            <Form.Item label="Type of Leave" name={"leaveType"}>
              <Select placeholder="Type of leave">
                <Select.Option key={1} value="Maternity">
                  Maternity
                </Select.Option>
                <Select.Option key={2} value="Partenity">
                  Partenity
                </Select.Option>
                <Select.Option key={3} value="Annual">
                  Annual
                </Select.Option>
              </Select>
            </Form.Item>
          </div>
          <div className={inputContainerClass}>
            <Form.Item label="Number of days Entitled">
              <Input placeholder="0" disabled />
            </Form.Item>
          </div>
          <div className={inputContainerClass}>
            <Form.Item label="Number of days Left">
              <Input placeholder="2" disabled />
            </Form.Item>
          </div>
          <div className={inputContainerClass}>
            <Form.Item label="Reason" name="reason">
              <Input.TextArea placeholder="reason" />
            </Form.Item>
          </div>
          <div className={inputContainerClass}>
            <Form.Item label="Request Allowance" name={"withPay"}>
              <Themes isBg={false}>
                <Switch unCheckedChildren="No" checkedChildren="Yes" />
              </Themes>
            </Form.Item>
          </div>
          <div className={inputContainerClass}>
            <Form.Item label="" name={`workAssignee`}>
              <Select placeholder="Select Work Assignee">
                <Select.Option key={1}>James Dean</Select.Option>
              </Select>
            </Form.Item>
          </div>
          <div className="flex flex-row justify-between items-center">
            <Button type="text">
              <span className="text-red-400">Reject</span>
            </Button>
            <div className="flex flex-col gap-4">
              <Themes isBg={false}>
                <button className="button w-full">Accept</button>
              </Themes>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default ViewLeaveRequest;
