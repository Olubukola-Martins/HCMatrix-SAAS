import React from "react";

const AssigneeHistory = () => {
  return (
    <div>
        <div className="flex items-center gap-3 justify-end">
            
          <div className="my-5 flex justify-end gap-3">
              <i className="ri-download-2-line text-lg"></i>
            </div>
            <button className="transparentButton">Add New Maintenance</button>
        </div>
      <table className="payroll-table text-accent mt-6">
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>Assignee Name</th>
            {/* <th>Employee ID</th> */}
            <th>Job Role</th>
            <th>Department</th>
            <th>Date Assigned</th>
            <th>Date Returned</th>
            <th>Journey Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4].map((item) => (
            <tr key={item}>
              <td>
                <input type="checkbox" />
              </td>
              <td>Ruth Godwin</td>
              {/* <td>000</td> */}
              <td>Marketing Manager</td>
              <td>Sales & Marketing</td>
              <td>DD/MM/YY</td>
              <td>DD/MM/YY</td>
              <td>0hrs</td>
              <td>
              <i className="ri-more-2-fill text-lg"></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssigneeHistory;
