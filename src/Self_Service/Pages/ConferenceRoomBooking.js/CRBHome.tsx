import React, { useState } from "react";
import DashboardLayout from "../../../Layout/DashboardLayout";
import Themes from "../../../Themes/Themes";
import SelfServiceSubNav from "../../Components/SelfServiceSubNav";
import { useQuery } from "react-query";

import LeaveHistoryTable from "../../Components/Leave/LeaveHistoryTable";
import LeaveHomePageHeader from "../../Components/Leave/LeaveHomePageHeader";
import { getUserLeaveRequests } from "../../EndPointHelpers/Leaves";
import { Drawer, Spin, Button } from "antd";
import AddNewLeaveForm from "../../Components/Leave/AddNewLeaveForm";
import { CloseOutlined } from "@ant-design/icons";
import LeaveCards from "../../Components/Leave/LeaveCards";
import LeaveRequestsTable from "../../Components/Leave/LeaveRequestsTable";
import CRBHeader from "../../Components/ConferenceRoomBooking/CRBHeader";
import EntryBoxes from "../../Components/Utilities/EntryBoxes";
import CRBCards from "../../Components/ConferenceRoomBooking/CRBCards";
import CRBRequestsTable from "../../Components/ConferenceRoomBooking/CRBRequestsTable";
import CRBHistoryTable from "../../Components/ConferenceRoomBooking/CRBHistoryTable";

const CRBHome = () => {
  return (
    <DashboardLayout>
      <SelfServiceSubNav />

      <div>
        <div className="Container">
          <CRBHeader title="Meeting Room Booking" />
          <CRBCards />
          <div className="mt-12">
            {false ? <CRBRequestsTable /> : <CRBHistoryTable />}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CRBHome;
