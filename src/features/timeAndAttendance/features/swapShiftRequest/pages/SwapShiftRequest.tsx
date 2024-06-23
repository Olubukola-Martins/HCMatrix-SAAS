import { Tabs } from "antd";
import { AppButton } from "components/button/AppButton";
import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import { AttendanceSubToper } from "features/timeAndAttendance/components/AttendanceSubToper";
import { TbFileExport } from "react-icons/tb";
import { NewRequest } from "../components/NewRequest";
import { useState } from "react";
import { AllRequest } from "../components/AllRequest";
import { MySwapApprovals } from "../components/MySwapApprovals";
import { MyRequest } from "../components/MyRequest";

const SwapShiftRequest = () => {
  const [creteRequest, setCreteRequest] = useState(false);
  return (
    <>
      <AttendanceSubToper active="swap-shift-request" />
      <NewRequest
        open={creteRequest}
        handleClose={() => setCreteRequest(false)}
      />
      <div className="Container">
        <div>
          <PageIntro
            title="Swap Shift Request"
            link={appRoutes.attendanceHome}
          />
          <p className="pt-2 pb-5">
            You can now approve and request for shift swap.
          </p>
        </div>

        <Tabs
          defaultActiveKey="1"
          items={[
            {
              key: "1",
              label: `My Requests`,
              children: <MyRequest/>,
            },
            {
              key: "2",
              label: `My Swap Approvals`,
              children: <MySwapApprovals/>,
            },
            {
              key: "3",
              label: `All Requests`,
              children: <AllRequest/>,
            },
          ]}
          tabBarExtraContent={
            <div className="flex items-center gap-4">
              <TbFileExport className="text-2xl" />
              <AppButton label="New Request" handleClick={() => setCreteRequest(true)}/>
            </div>
          }
        />
      </div>
    </>
  );
};

export default SwapShiftRequest;
