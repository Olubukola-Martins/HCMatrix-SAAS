import { Modal, Tabs } from "antd";
import React, { useState } from "react";

import SendSurveyThruEmail from "./SendSurveyThruEmail";
import SendSurveyThruLink from "./SendSurveyThruLink";
import Themes from "components/Themes";

interface IProps {
  handlePreview: Function;
  showPreview: boolean;
}

const NewSurveyHeader = ({ handlePreview, showPreview }: IProps) => {
  const [showD, setShowD] = useState(false);
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3 font-extrabold ">
        <i className="ri-arrow-left-s-line text-lg cursor-pointer hover:text-caramel"></i>
        <h2 className="text-xl md:text-2xl text-accent">New Survey</h2>
      </div>
      <div className="flex items-center gap-4 font-extrabold">
        <i
          className={`ri-eye-line text-base cursor-pointer hover:text-caramel ${
            showPreview ? "text-caramel" : ""
          }`}
          onClick={() => handlePreview((val: boolean) => !val)}
        />
        <i className="ri-arrow-go-back-fill text-base cursor-pointer hover:text-caramel" />
        <i className="ri-arrow-go-forward-fill text-base cursor-pointer hover:text-caramel" />
        <button className="button" onClick={() => setShowD(true)}>
          Send
        </button>
      </div>
      <Modal
        visible={showD}
        title="Send Form"
        onCancel={() => setShowD(false)}
        footer={null}
        style={{ top: "20px" }}
      >
        <Themes>
          <Tabs>
            <Tabs.TabPane tab="Email" key="item-1">
              <SendSurveyThruEmail />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Link" key="item-2">
              <SendSurveyThruLink />
            </Tabs.TabPane>
          </Tabs>
        </Themes>
      </Modal>
    </div>
  );
};

export default NewSurveyHeader;
