import { Button, Popover } from "antd";
import React from "react";
import { MoreOutlined } from "@ant-design/icons";

const SurveyTempHeader = () => {
  return (
    <div className="flex items-center justify-between text-lg font-normal">
      <h4>Templates</h4>

      <Popover content={<Button type="text">Hide All Templates</Button>}>
        <Button type="text" icon={<MoreOutlined />} />
      </Popover>
    </div>
  );
};

export default SurveyTempHeader;
