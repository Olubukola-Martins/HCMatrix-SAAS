import React from "react";
import "../../../../style/settingsStyle.css";

const ManagerDirectReport = () => {
  return (
    <div>
      {/* Direct report */}
      <div>
        <div className="flex items-center justify-between">
          <h5 className="text-accent text-sm font-semibold pb-2">
            Direct Report(s)
          </h5>

          <input
            type="text"
            placeholder="Search.."
            className="rounded-3xl px-4 py-1 focus:outline-none bg-mainBg placeholder:text-sm"
          />
        </div>

        <table className="employee_info_table mt-5">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Type</th>
              <th>Action</th>
            </tr>
          </thead>
        </table>
        <div className="border text-center py-1 text-sm mt-1">
          No Matching Records
        </div>
      </div>

      {/*  Manager(s) */}
      <div className="mt-20">
        <div className="flex items-center justify-between">
          <h5 className="text-accent text-sm font-semibold pb-2">Manager(s)</h5>

          <input
            type="text"
            placeholder="Search.."
            className="rounded-3xl px-4 py-1 focus:outline-none bg-mainBg placeholder:text-sm"
          />
        </div>

        <table className="employee_info_table mt-5">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Type</th>
              <th>Action</th>
            </tr>
          </thead>
        </table>
        <div className="border text-center py-1 text-sm mt-1">
          No Matching Records
        </div>
      </div>
    </div>
  );
};

export default ManagerDirectReport;
