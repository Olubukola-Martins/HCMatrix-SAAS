import React, { useState } from "react";
import { Drawer, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import Themes from "components/Themes";
import SelfServiceSubNav from "features/self-service/components/SelfServiceSubNav";
import AddNewLeaveForm from "../components/AddNewLeaveForm";
import LeaveSettingsAccordians from "../components/LeaveSettingsAccordians";
import LeaveSettingsHeader from "../components/LeaveSettingsHeader";

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
  // if (userDelegations.includes("approve/reject leaves")) state = true;
  // if (requests.some((item) => item.currentStage.approverId === userId))
  //   state = true;
  return state;
};
// You only use redux when you need  the same state in diff components, not that you just need in one place
// In that case the groups the user belongs to is global
// In that case the role the user has (alongside its permissions) are  global
// In that case the delegations the user has (alongside its permissions) are  global
// departments has to be global, as the id alone will be returned

const LeaveSettings = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [comp, setComp] = useState("");
  const handleShowNewLeave = () => {
    setShowDrawer(true);
    setComp(ECOMP.ADD_NEW_LEAVE);
  };

  return (
    <>
      <SelfServiceSubNav />
      {/* add new leave */}

      <Drawer
        open={showDrawer}
        onClose={() => setShowDrawer(false)}
        // className={`${isDark ? "custom-draw-dark" : ""}`}
        // mask={false}
        closeIcon={false}
        title={
          <Themes>
            <div className="px-4 py-4 flex justify-between items-center">
              <span className="text-accent">{comp}</span>
              <Button
                type="text"
                icon={<CloseOutlined />}
                onClick={() => setShowDrawer(false)}
              />
            </div>
          </Themes>
        }
        // zIndex={10}
        // contentWrapperStyle={{ top: 220, right: 70 }}
        // contentWrapperStyle={{ background: "purple" }}
        // getContainer={() => containerRef.current}
      >
        <Themes>
          <div className="p-4">
            {comp === ECOMP.ADD_NEW_LEAVE && <AddNewLeaveForm />}
          </div>
        </Themes>
      </Drawer>

      <div>
        <div className="Container">
          {/* header */}
          <LeaveSettingsHeader />

          {/* {isError && (
            <div className="flex w-full h-32 justify-center items-center">
              <p>Err occured</p>
            </div>
          )}
          {isLoading && (
            <div className="flex w-full h-32 justify-center items-center">
              <Spin />
            </div>
          )} */}
          {<LeaveSettingsAccordians />}
        </div>
      </div>
    </>
  );
};

export default LeaveSettings;
