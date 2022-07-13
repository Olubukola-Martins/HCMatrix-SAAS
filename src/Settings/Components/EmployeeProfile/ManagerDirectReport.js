import React from "react";
import '../../style/settingsStyle.css'

const ManagerDirectReport = () => {
  return (
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
    </div>
  );
};

export default ManagerDirectReport;
