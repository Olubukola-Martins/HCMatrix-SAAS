import { Modal, Switch } from "antd";
import React, { useEffect, useState } from "react";
import Themes from "components/Themes";
import { IoIosArrowBack } from "react-icons/io";

interface IProps {
  open: boolean;
  handleClose: Function;
}

const SettingsAIChatBotModal = ({ open, handleClose }: IProps) => {
  const [settings, setSettings] = useState({
    enableSuggestion: false,
    enableVoiceResponse: false,
  });

  useEffect(() => {
    const aiBotSettings = localStorage.getItem("aiBotSettings");
    if (aiBotSettings) {
      setSettings(JSON.parse(aiBotSettings));
    } else {
      const defaultSettings = {
        enableSuggestion: false,
        enableVoiceResponse: false,
      };
      localStorage.setItem("aiBotSettings", JSON.stringify(defaultSettings));
      setSettings(defaultSettings);
    }
  }, []);

  const handleToggle = (key: keyof typeof settings, value: boolean) => {
    const updatedSettings = { ...settings, [key]: value };
    localStorage.setItem("aiBotSettings", JSON.stringify(updatedSettings));
    setSettings(updatedSettings);
  };

  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      style={{ maxWidth: 600, top: 10 }}
      footer={null}
      closable={false}
      width={600} 
    >
      <Themes>
        <div className="relative mb-4">
          <button onClick={() => handleClose()} className="absolute left-0">
            <IoIosArrowBack />
          </button>
          <h5 className="text-sm font-medium text-center">Settings</h5>
        </div>

        <div className="p-4">
          <div className="mb-6">
            <h6 className="text-lg font-semibold mb-4">Chatbot Preference</h6>
            <div className="flex justify-between space-x-4">
              <div className="flex justify-between items-center p-4 border rounded-lg w-1/2">
                <span>Enable Suggestion</span>
                <Switch
                  checked={settings.enableSuggestion}
                  onChange={(checked) => handleToggle("enableSuggestion",checked)}
                />
              </div>
              <div className="flex justify-between items-center p-4 border rounded-lg w-1/2">
                <span>Voice Response</span>
                <Switch
                  checked={settings.enableVoiceResponse}
                  onChange={(checked) => handleToggle("enableVoiceResponse",checked)}
                />
              </div>
            </div>
          </div>

          {/* <div className="mb-6">
            <h6 className="text-lg font-semibold mb-4">
              Notification Settings
            </h6>
            <div className="flex justify-start space-x-4">
              <div className="flex justify-between items-center p-4 border rounded-lg w-1/2">
                <span>Push</span>
                <Switch defaultChecked />
              </div>
            </div>
          </div> */}

          <div className="flex justify-end mt-6">
            <button className="button rounded-lg" onClick={() => handleClose()}>Save</button>
          </div>
        </div>
      </Themes>
    </Modal>
  );
};

export default SettingsAIChatBotModal;
