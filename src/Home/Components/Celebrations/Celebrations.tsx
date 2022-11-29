import { Tabs } from "antd";
import React from "react";
import { Birthdays } from "./Birthdays";
import { Holidays } from "./Holidays";
import { WorkAnniversary } from "./WorkAnniversary";

export const Celebrations = () => {
  return (
    <div>
  
      <h3 className="pb-1 font-medium">Celebrations & Holidays</h3>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Birthdays" key="1">
          <Birthdays />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Work Anniversaries" key="2">
          <WorkAnniversary />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Holidays" key="3">
          <Holidays />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};
