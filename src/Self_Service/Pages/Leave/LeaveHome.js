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

const ECOMP = {
  ADD_NEW_LEAVE: "New Leave",
  SHOW_LEAVE_DETAILS: "Leave Details",
};
// or has the permission to approve/rej leaves generally
// therefore fetch leave requests where the leaveRequest->currentStage->approver_id = user_id
//  or the approver_role_id = user_role_id
//  or the approver_group_id = user_group_id
//  or the leaveRequest->userId = user_id (in this case if user permissions dont contain the necssary then hide approve and reject)
const permissions = ["approve/reject leaves"];
const userId = "32323232";
// if any of this conditions are met then show leave requests table rather than leave history table
// question the cards above do they show the personal info of logged in user or that of the requests that concern the user
const showApproveRejectLeaveRequests = ({
  requests = [],
  userPermissions = permissions,
  userDelegations = [],
}) => {
  // if any of the conditions are met then return true
  let state = false;
  if (userPermissions.includes("approve/reject leaves")) state = true;
  if (userDelegations.includes("approve/reject leaves")) state = true;
  if (requests.some((item) => item.currentStage.approverId === userId))
    state = true;
  return false;
};
// You only use redux when you need  the same state in diff components, not that you just need in one place
// In that case the groups the user belongs to is global
// In that case the role the user has (alongside its permissions) are  global
// In that case the delegations the user has (alongside its permissions) are  global
// departments has to be global, as the id alone will be returned

const LeaveHome = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [comp, setComp] = useState("");
  const handleShowNewLeave = () => {
    setShowDrawer(true);
    setComp(ECOMP.ADD_NEW_LEAVE);
  };
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
      onError: (err) => {},
      onSuccess: (data) => {},
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

      <Drawer
        open={showDrawer}
        onClose={() => setShowDrawer(false)}
        // className={`${isDark ? "custom-draw-dark" : ""}`}
        // mask={false}

        title={comp}
        // zIndex={10}
        // contentWrapperStyle={{ top: 220, right: 70 }}
        // contentWrapperStyle={{ background: "purple" }}
        // getContainer={() => containerRef.current}
      >
        <Themes>{comp === ECOMP.ADD_NEW_LEAVE && <AddNewLeaveForm />}</Themes>
      </Drawer>

      <div>
        <div className="Container">
          {/* header */}
          <LeaveHomePageHeader
            handleShowNewLeave={handleShowNewLeave}
            closeDrawer={() => setShowDrawer(false)}
          />

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
          {isSuccess && (
            <div>
              {/* cards */}

              <LeaveCards />

              {/* table section*/}
              <div className="mt-12">
                {showApproveRejectLeaveRequests({}) ? (
                  <LeaveRequestsTable data={leaveRequests} />
                ) : (
                  <LeaveHistoryTable data={leaveRequests} />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LeaveHome;
