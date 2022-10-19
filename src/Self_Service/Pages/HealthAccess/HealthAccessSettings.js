import React, { useState } from "react";
import DashboardLayout from "../../../Layout/DashboardLayout";
import Themes from "../../../Themes/Themes";
import SelfServiceSubNav from "../../Components/SelfServiceSubNav";
import { useQuery } from "react-query";

import { getUserLeaveRequests } from "../../EndPointHelpers/Leaves";

import { Drawer, Spin, Button, Tabs, Modal } from "antd";
import AddHAForEmployee from "../../Components/HealthAccess/AddHAForEmployee";
import HealthAccessHomePageHeader from "../../Components/HealthAccess/HealthAccessHomePageHeader";
import HealthAccessSettHeader from "../../Components/HealthAccess/HealthAccessSettHeader";

const HealthAccessSettings = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [comp, setComp] = useState("");

  const {
    data: leaveRequests,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useQuery(
    ["user-leave-requests"],
    () => {
      return getUserLeaveRequests({
        token: "",
        userId: "",
      });
    },
    {
      onError: (err) => {
        console.log("The error =>", err);
      },
      onSuccess: (data) => {
        console.log("The success(0) =>", data);
      },
      select: (res) => {
        const leaveRequests = res.data.map((item) => ({
          ...item,
          key: item.id,
        }));
        return leaveRequests;
      },
    }
  );

  return (
    <DashboardLayout>
      <SelfServiceSubNav />
      {/* add new leave */}

      <div>
        <div className="Container">
          {/* header */}
          <HealthAccessSettHeader />

          {isError && (
            <div className="flex w-full h-32 justify-center items-center">
              <p>Err occured</p>
            </div>
          )}
          {isLoading && (
            <div className="flex w-full h-32 justify-center items-center">
              <Spin />
            </div>
          )}
          {isSuccess && <div>jjjjjjie</div>}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HealthAccessSettings;
