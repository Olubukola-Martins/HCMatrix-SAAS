import { Modal, Switch } from "antd";
import React from "react";
import Themes from "components/Themes";

interface IProps {
  open: boolean;
  handleClose: Function;
}

const SettingsAIChatBotModal = ({ open, handleClose }: IProps) => {
  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      style={{ maxWidth: 500, top: 10 }}
      footer={null}
      closable={false}
    >
      <Themes>
        <div className="relative mb-4">
          <button onClick={() => handleClose()} className="absolute left-0">
            {"<"}
          </button>
          <h5 className="text-sm font-medium text-center">Settings</h5>
        </div>

        <div className="p-4">
          <div className="mb-6">
            <h6 className="text-lg font-semibold mb-4">Chatbot Preference</h6>
            <div className="flex justify-between space-x-4">
              <div className="flex justify-between items-center p-4 border rounded-lg w-1/2">
                <span>Enable Suggestion</span>
                <Switch defaultChecked />
              </div>
              <div className="flex justify-between items-center p-4 border rounded-lg w-1/2">
                <span>Voice Response</span>
                <Switch defaultChecked />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h6 className="text-lg font-semibold mb-4">
              Notification Settings
            </h6>
            <div className="flex justify-start space-x-4">
              <div className="flex justify-between items-center p-4 border rounded-lg w-1/2">
                <span>Push</span>
                <Switch defaultChecked />
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button className="button rounded-lg">Save</button>
          </div>
        </div>
      </Themes>
    </Modal>
  );
};

export default SettingsAIChatBotModal;
