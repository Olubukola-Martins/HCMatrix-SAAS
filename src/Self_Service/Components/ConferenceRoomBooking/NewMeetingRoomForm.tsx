import { Button, Form, Input } from "antd";
import React from "react";
import { generalValidationRules } from "../../../FormHelpers/validation";
import Themes from "../../../Themes/Themes";

interface IProps {
  handleClose: Function;
}

const NewMeetingRoomForm = ({ handleClose }: IProps) => {
  return (
    <div>
      <Form labelCol={{ span: 24 }} requiredMark={false}>
        <Form.Item
          name={"roomName"}
          rules={generalValidationRules}
          label="Meeting Room Name"
        >
          <Input placeholder="Room name" />
        </Form.Item>
        <Themes>
          <div className="flex justify-between items-center">
            <Button type="text" onClick={() => handleClose()}>
              Cancel
            </Button>
            <div className="flex gap-3">
              <button className="button">Save</button>
            </div>
          </div>
        </Themes>
      </Form>
    </div>
  );
};

export default NewMeetingRoomForm;
