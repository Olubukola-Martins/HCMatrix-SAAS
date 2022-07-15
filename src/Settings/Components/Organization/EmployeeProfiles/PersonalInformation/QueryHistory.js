import React from "react";

const QueryHistory = () => {
  return (
    <>
      <div className="flex justify-end">
        <input
          type="text"
          placeholder="Search.."
          className="rounded-3xl px-4 py-1 focus:outline-none bg-mainBg placeholder:text-sm"
        />
      </div>

      <table className="employee_info_table mt-5">
        <thead>
          <tr>
            <th>QueryType</th>
            <th>Employee Name</th>
            <th>Status</th>
            <th>Query Excerpt</th>
            <th>Action taken</th>
            <th>Date issued</th>
            <th>Action</th>
          </tr>
        </thead>
      </table>
      <div className="border text-center py-1 text-sm mt-1">
        No Matching Records
      </div>
    </>
  );
};

export default QueryHistory;
