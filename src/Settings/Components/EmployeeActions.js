import React, { useState } from "react";
import AssignDepartmentModal from "./AssignDepartmentModal";
import MoveToCompanyModal from "./MoveToCompanyModal";
import MoveToCompanyDropdown from "./MoveToCompanyDropdown";

const EmployeeActions = () => {
  const [openId, setOpenId] = useState("");
  const handleClose = () => {
    setOpenId("");
  };

  //sync modal controls
  const [anchorSyncEl, setAnchorSyncEl] = useState(null);
  const handleSyncClick = (event) => {
    setAnchorSyncEl(event.currentTarget);
  };

  const handleSyncClose = () => {
    setAnchorSyncEl(null);
  };

  return (
    <div className="Container">
      <div className="bg-card mb-2">
        <div className="flex justify-end">
          <span className="pr-3 pb-2 cursor-pointer">x</span>
        </div>
        <div className="px-3 pb-4 text-caramel font-semibold text-sm grid grid-cols-5 gap-x-8 gap-y-4 flex-wrap">
          <button className="rounded border py-1 border-caramel">
            Enroll to E-Learning
          </button>
          <button className="rounded border py-1 border-caramel">
            + Add to Group
          </button>
          <button className="rounded border py-1 border-caramel">
            Assign to Role
          </button>
          <button className="rounded border py-1 border-caramel">
            Assign to Line Manager
          </button>

          <button className="rounded border py-1 border-caramel">
            Change Employee Status
          </button>
          <button className="rounded border py-1 border-caramel">
            Change Login Status
          </button>
          {/* <button className="rounded border py-1 border-caramel">Others</button> */}
          <button
            className="rounded border py-1 border-caramel"
            onClick={() => setOpenId("assign-department")}
          >
            Assign to department
          </button>
          <AssignDepartmentModal open={openId} handleClose={handleClose} />
          <button
            className="rounded border py-1 border-caramel"
            // onClick={() => setOpenId("move-to-company")}
            onClick={handleSyncClick}
          >
            <span>Transfer to company</span>
          </button>
          <MoveToCompanyDropdown
            anchorEl={anchorSyncEl}
            handleClose={handleSyncClose}
          />
          <MoveToCompanyModal open={openId} handleClose={handleClose} />
        </div>
      </div>
    </div>
  );
};

export default EmployeeActions;
