import React from "react";
import { Link } from "react-router-dom";

const HealthAccessHomePageHeader = ({ handleAddEmp, closeDrawer }) => {
  // role from redux
  const roleContainsPerm = true;
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3 font-extrabold ">
        <i className="ri-arrow-left-s-line text-lg cursor-pointer hover:text-caramel"></i>
        <h2 className="text-xl md:text-2xl text-accent">Health Access</h2>
      </div>
      <div className="flex gap-2">
        {roleContainsPerm && (
          <Link
            to={`/self-service/health-access/settings`}
            className="border border-red-400 hover:text-caramel rounded px-2 py-1 font-medium text-sm text-neutral"
          >
            Settings
          </Link>
        )}
        <button className="button" onClick={() => handleAddEmp()}>
          Add Employee(s)
        </button>
      </div>
    </div>
  );
};

export default HealthAccessHomePageHeader;
