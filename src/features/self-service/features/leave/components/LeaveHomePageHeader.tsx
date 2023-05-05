import React from "react";
import { Link } from "react-router-dom";

const LeaveHomePageHeader = ({
  handleShowNewLeave,
  closeDrawer,
}: {
  handleShowNewLeave: Function;
  closeDrawer: Function;
}) => {
  // role from redux
  const roleContainsPerm = true;
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3 font-extrabold ">
        <i className="ri-arrow-left-s-line text-lg cursor-pointer hover:text-caramel"></i>
        <h2 className="text-xl md:text-2xl text-accent">Leave</h2>
      </div>
      <div className="flex gap-2">
        <button className="button" onClick={() => handleShowNewLeave()}>
          New Leave
        </button>
        {roleContainsPerm && (
          <Link
            to={`/self-service/leave/settings`}
            className="border border-red-400 hover:text-caramel rounded px-2 py-1 font-medium text-sm text-neutral"
          >
            Leave Settings
          </Link>
        )}
      </div>
    </div>
  );
};

export default LeaveHomePageHeader;
