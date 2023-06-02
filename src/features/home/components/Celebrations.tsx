import { Tabs } from "antd";
import React from "react";
import { Birthdays } from "./Birthdays";
import { Holidays } from "./Holidays";
import { WorkAnniversary } from "./WorkAnniversary";

export const Celebrations = () => {
  return (
    <div>
      <h3 className="pb-1 font-medium">Celebrations & Holidays</h3>
      <Tabs
        defaultActiveKey="1"
        items={[
          { key: "Birthdays", label: "Birthdays", children: <Birthdays /> },
          {
            key: "Work Anniversaries",
            label: "Work Anniversaries",
            children: <WorkAnniversary />,
          },
          { key: "Holidays", label: "Holidays", children: <Holidays /> },
        ]}
      />
    </div>
  );
};
