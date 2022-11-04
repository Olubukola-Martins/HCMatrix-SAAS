import { Button, DatePicker, Form, Input, Select, TimePicker } from "antd";
import React from "react";
import Themes from "../../../Themes/Themes";

interface IProps {
  id: string;
}

const CRBBookingDetails = ({ id }: IProps) => {
  return (
    <div>
      <Form labelCol={{ span: 24 }} requiredMark={false}>
        <Form.Item name={"bookedBy"}>
          <Select placeholder="user">
            <Select.Option value="Ruth Godwin">Ruth Godwin</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name={"roomName"}>
          <Select placeholder="Conference Room Name">
            <Select.Option value="Apple Room">Apple Room</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="meetingDate">
          <DatePicker className="w-full" />
        </Form.Item>
        <Form.Item name="Duration">
          <TimePicker.RangePicker className="w-full" use12Hours />
        </Form.Item>
        <Form.Item name="reason">
          <Input placeholder="Reason" />
        </Form.Item>
        <Form.Item name={"priority"}>
          <Select placeholder="Priority">
            <Select.Option value="High">High</Select.Option>
            <Select.Option value="Mid">Mid</Select.Option>
            <Select.Option value="Low">Low</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name={"status"}>
          <Select placeholder="status">
            <Select.Option value="High">Approved</Select.Option>
            <Select.Option value="Mid">Rejected</Select.Option>
            <Select.Option value="Low">Pending</Select.Option>
          </Select>
        </Form.Item>
        <Themes>
          {true ? (
            <div className="flex justify-between items-center">
              <Button type="text">
                <span className="text-red-600">Reject</span>
              </Button>
              <div className="flex gap-3">
                {/* <button className="transparentButton">
                Save And Add Another
              </button> */}
                <button className="button">Approve</button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <Button type="text">Cancel</Button>
              <div className="flex gap-3">
                {/* <button className="transparentButton">
                Save And Add Another
              </button> */}
                <button className="button">Override</button>
              </div>
            </div>
          )}
        </Themes>
      </Form>
    </div>
  );
};

export default CRBBookingDetails;
