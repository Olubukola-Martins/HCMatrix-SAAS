import { Modal, Tabs } from "antd";
import Themes from "components/Themes";
import SelfServiceSubNav from "features/self-service/components/SelfServiceSubNav";
import React, { useState } from "react";
import AddHAForEmployee from "../components/AddHAForEmployee";
import HAExEmployees from "../components/HAExEmployees";
import HARegEmployees from "../components/HARegEmployees";
import HealthAccessHomePageHeader from "../components/HealthAccessHomePageHeader";
import HealthPlans from "../components/HealthPlans";

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
  return false;
};
// You only use redux when you need  the same state in diff components, not that you just need in one place
// In that case the groups the user belongs to is global
// In that case the role the user has (alongside its permissions) are  global
// In that case the delegations the user has (alongside its permissions) are  global
// departments has to be global, as the id alone will be returned

const HealthAccessHome = () => {
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

      <Modal
        open={showDrawer}
        onCancel={() => setShowDrawer(false)}
        title={"Add Employee"}
        footer={null}
      >
        <Themes>{comp === ECOMP.ADD_NEW_LEAVE && <AddHAForEmployee />}</Themes>
      </Modal>

      <div>
        <div className="Container">
          {/* header */}
          <HealthAccessHomePageHeader
            handleAddEmp={handleShowNewLeave}
            closeDrawer={() => setShowDrawer(false)}
          />

          {
            <div>
              <Tabs className="mt-4">
                <Tabs.TabPane tab="Health Plans" key="item-1">
                  <HealthPlans />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Registered Employees" key="item-2">
                  <HARegEmployees />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Excluded Employees" key="item-3">
                  <HAExEmployees />
                </Tabs.TabPane>
              </Tabs>
            </div>
          }
        </div>
      </div>
    </>
  );
};

export default HealthAccessHome;
