import "../../../../assets/style.css";
import { Tabs } from "antd";
import { AppButton } from "components/button/AppButton";
import { useState } from "react";
import { AddMultipleEmployeeShift } from "./AddMultipleEmployeeShift";
import { ScheduleEmployeeShift } from "./ScheduleEmployeeShift";
import { GeneralEmployeeShift } from "./GeneralEmployeeShift";
import { AutoShiftRotation } from "./AutoShiftRotation";
import { ShiftSwapConfig } from "./ShiftSwapConfig";

export const WorkShift = () => {
  return (
    <>
      <div className="border rounded-md p-3 md:p-5 mt-5">
        <Tabs
          defaultActiveKey="1"
          items={[
            {
              key: "1",
              label: `General Employee Shift`,
              children: <GeneralEmployeeShift />,
            },
            {
              key: "2",
              label: `Schedule Employee Shift`,
              children: <ScheduleEmployeeShift />,
            },
            {
              key: "3",
              label: `Shift Settings`,
              children: (
                <div>
                  <AutoShiftRotation />
                  <ShiftSwapConfig />
                </div>
              ),
            },
          ]}
        />
      </div>
    </>
  );
};
