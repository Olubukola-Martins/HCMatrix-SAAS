import React, { useState } from "react";

import SelfServiceSubNav from "features/self-service/components/SelfServiceSubNav";
import { RequestForLeave } from "../components/RequestForLeave";
import LeaveCards from "../components/LeaveCards";
import LeaveHomePageHeader from "../components/LeaveHomePageHeader";
import LeaveRequestsContainer from "../components/LeaveRequestsContainer";
import LeaveHistoryContainer from "../components/LeaveHistoryContainer";

const ECOMP = {
  ADD_NEW_LEAVE: "New Leave",
  SHOW_LEAVE_DETAILS: "Leave Details",
};

const LeaveHome = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [comp, setComp] = useState("");
  const handleShowNewLeave = () => {
    setShowDrawer(true);
    setComp(ECOMP.ADD_NEW_LEAVE);
  };

  return (
    <div>
      <SelfServiceSubNav />

      {comp === ECOMP.ADD_NEW_LEAVE && (
        <RequestForLeave
          open={showDrawer}
          handleClose={() => setShowDrawer(false)}
        />
      )}

      <div>
        <div className="Container">
          {/* header */}
          <LeaveHomePageHeader
            handleShowNewLeave={handleShowNewLeave}
            closeDrawer={() => setShowDrawer(false)}
          />

          <div>
            {/* cards */}

            <LeaveCards />

            {/* table section*/}
            <div className="mt-12 flex flex-col gap-4">
              <LeaveRequestsContainer />
              <LeaveHistoryContainer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveHome;
