import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import { AppButton } from "components/button/AppButton";
import { Tabs } from "antd";
import { AddTimeOff } from "../components/AddTimeOff";
import { AttendanceSubToper } from "features/timeAndAttendance/components/AttendanceSubToper";
import {
  useGetUserPermissions,
  canUserAccessComponent,
} from "components/permission-restriction/PermissionRestrictor";
import { MyRequest } from "../components/MyRequest";
import { TimeOffApproval } from "../components/TimeOffApproval";
import { AllTimeOffRequest } from "../components/AllTimeOffRequest";
import { useState } from "react";

export const TimeOff = () => {
  const [newTimeOffModal, setNewTimeOffModal] = useState(false);
  const { userPermissions } = useGetUserPermissions();
  const tabItems = [
    {
      key: "1",
      label: `My Requests`,
      children: <MyRequest />,
      hidden: false,
    },
    {
      key: "2",
      label: `Timeoff Approvals`,
      children: <TimeOffApproval />,
    },
    {
      key: "3",
      label: `All Requests`,
      children: <AllTimeOffRequest />,
      hidden: !canUserAccessComponent({
        userPermissions,
        requiredPermissions: ["view-all-time-off-requests"],
      }),
    },
  ];

  return (
    <>
      <AttendanceSubToper active="time-off" />
      <AddTimeOff
        open={newTimeOffModal}
        handleClose={() => setNewTimeOffModal(false)}
      />
      <div className="Container">
        <div>
          <PageIntro title="Timeoff Request" link={appRoutes.attendanceHome} />
          <p className="pt-2 pb-5">
            Welcome on board, set your time off policy
          </p>
        </div>

        <Tabs
          defaultActiveKey="1"
          items={tabItems.filter((item) => item.hidden !== true)}
          tabBarExtraContent={
            <div className="flex items-center gap-4">
              <AppButton
                label="New Request"
                handleClick={() => setNewTimeOffModal(true)}
              />
            </div>
          }
        />
      </div>
    </>
  );
};
