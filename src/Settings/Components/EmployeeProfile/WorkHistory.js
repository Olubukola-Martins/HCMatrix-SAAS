import React from "react";

const WorkHistory = () => {
  return (
    <>
      {/* promotion history */}
      <div>
        <h5 className="text-accent text-sm font-semibold pb-2">
          Promotion History
        </h5>
        <div className="flex items-center justify-between">
          <button className="button">Change Grade</button>
          <input
            type="text"
            placeholder="Search.."
            className="rounded-3xl px-4 py-1 focus:outline-none bg-mainBg placeholder:text-sm"
          />
        </div>

        <table className="employee_info_table mt-5">
          <thead>
            <tr>
              <th>New Grade</th>
              <th>Old Grade</th>
              <th>Approved by</th>
              <th>Approved on</th>
            </tr>
          </thead>
        </table>
        <div className="border text-center py-1 text-sm mt-1">
          No Matching Records
        </div>
      </div>
       
       <div className="border-b my-10"/>

      {/* Job History */}
      <div>
        <h5 className="text-accent text-sm font-semibold pb-2">
          Job History
        </h5>
        <div className="flex items-center justify-between">
          <button className="button">Assign New Job</button>
          <input
            type="text"
            placeholder="Search.."
            className="rounded-3xl px-4 py-1 focus:outline-none bg-mainBg placeholder:text-sm"
          />
        </div>

        <table className="employee_info_table mt-5">
          <thead>
            <tr>
              <th>Job Role</th>
              <th>Department</th>
              <th>Started On</th>
              <th>Ended</th>
              <th>Action</th>
            </tr>
          </thead>
        </table>
        <div className="border text-center py-1 text-sm mt-1">
          No Matching Records
        </div>
      </div>

      <div className="border-b my-10"/>

      {/* Work Experience */}
      <div>
        <h5 className="text-accent text-sm font-semibold pb-2">
        Work Experience 
        </h5>
        <div className="flex items-center justify-between">
          <button className="button">Add Employment History</button>
          <input
            type="text"
            placeholder="Search.."
            className="rounded-3xl px-4 py-1 focus:outline-none bg-mainBg placeholder:text-sm"
          />
        </div>

        <table className="employee_info_table mt-5">
          <thead>
            <tr>
              <th>Organization</th>
              <th>Position</th>
              <th></th>
              <th>End Date</th>
              <th>Action</th>
            </tr>
          </thead>
        </table>
        <div className="border text-center py-1 text-sm mt-1">
          No Matching Records
        </div>
      </div>
    </>
  );
};

export default WorkHistory;
