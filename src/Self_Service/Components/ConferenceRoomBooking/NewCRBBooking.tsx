import { Button, DatePicker, Form, Input, Select, TimePicker } from "antd";
import React from "react";
import Themes from "../../../Themes/Themes";

interface IProps {
  handleClose: Function;
}

const NewCRBBooking = ({ handleClose }: IProps) => {
  return (
    <div>
      <Form labelCol={{ span: 24 }} requiredMark={false}>
        <Form.Item
          name={"roomName"}
          rules={[{ required: true, message: "Room name is required!" }]}
        >
          <Select placeholder="Conference Room Name">
            <Select.Option value="Apple Room">Apple Room</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="meetingDate"
          rules={[{ required: true, message: "Meeting Date is required!" }]}
        >
          <DatePicker className="w-full" />
        </Form.Item>
        <Form.Item
          name="Duration"
          rules={[{ required: true, message: "Duration is required!" }]}
        >
          <TimePicker.RangePicker className="w-full" use12Hours />
        </Form.Item>
        <Form.Item
          name="reason"
          rules={[{ required: true, message: "Reason is required!" }]}
        >
          <Input placeholder="Reason" />
        </Form.Item>
        <Form.Item
          name={"priority"}
          rules={[{ required: true, message: "Priority is required!" }]}
        >
          <Select placeholder="Priority">
            <Select.Option value="High">High</Select.Option>
            <Select.Option value="Mid">Mid</Select.Option>
            <Select.Option value="Low">Low</Select.Option>
          </Select>
        </Form.Item>
        <Themes>
          <div className="flex justify-between items-center">
            <Button type="text" onClick={() => handleClose()}>
              Cancel
            </Button>
            <div className="flex gap-3">
              {/* <button className="transparentButton">
                Save And Add Another
              </button> */}
              <Button type="ghost">Save And Add Another</Button>
              <button className="button">Submit</button>
            </div>
          </div>
        </Themes>
      </Form>
    </div>
  );
};

export default NewCRBBooking;
