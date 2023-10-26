import { appRoutes } from "config/router/paths";
import React from "react";
import { Link } from "react-router-dom";

const MyRecentRequestsCard = () => {
  return (
    <div className="shadow px-2 py-3 rounded border  flex flex-col gap-2">
      <div className="flex justify-between border-b pb-2 font-medium">
        <h3>Recent Requests </h3>
        <span>Status</span>
      </div>
      <div className="flex justify-between items-center border-b pb-2">
        <div>
          <h3>Recent Requests </h3>
          <span className="text-xs">HP EliteBook</span>
        </div>
        <div>
          <button className="px-2 py-1 border rounded text-green-600">
            Approved
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center border-b pb-2">
        <div>
          <h3>Reimbursement</h3>
          <span className="text-xs">Bolt Fare</span>
        </div>
        <div>
          <button className="px-2 py-1 border rounded text-red-600">
            Rejected
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center border-b pb-2">
        <div>
          <h3>Recent Requests </h3>
          <span className="text-xs">Data Allowance</span>
        </div>
        <div>
          <button className="px-2 py-1 border rounded text-yellow-400">
            Pending
          </button>
        </div>
      </div>
      <Link
        to={appRoutes.selfServiceHome}
        className="underline text-caramel text-center"
      >
        View All
      </Link>
    </div>
  );
};

export default MyRecentRequestsCard;
