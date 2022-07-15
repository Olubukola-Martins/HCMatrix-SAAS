import React, { useState } from "react";
import AssignJobRole from "./AssignJobRole";
import EmployeeGradeForm from "./EmployeeGradeForm";
import WorkExperienceForm from "./WorkExperienceForm";

const WorkHistory = () => {
  const [gradeModal, setGradeModal] = useState(false);
  const [jobModal, setJobModal] = useState(false);
  const [workExperienceModal, setWorkExperienceModal] = useState(false);
  return (
    <>
      {/* promotion history */}
      <div>
        <h5 className="text-accent text-sm font-semibold pb-2">
          Promotion History
        </h5>
        <div className="flex items-center justify-between">
          <button className="button" onClick={() => setGradeModal(true)}>
            Change Grade
          </button>
          <input
            type="text"
            placeholder="Search.."
            className="rounded-3xl px-4 py-1 focus:outline-none bg-mainBg placeholder:text-sm"
          />
          <EmployeeGradeForm
            open={gradeModal}
            handleClose={() => setGradeModal(false)}
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

      <div className="border-b my-10" />

      {/* Job History */}
      <div>
        <h5 className="text-accent text-sm font-semibold pb-2">Job History</h5>
        <div className="flex items-center justify-between">
          <button className="button" onClick={() => setJobModal(true)}>
            Assign New Job
          </button>
          <input
            type="text"
            placeholder="Search.."
            className="rounded-3xl px-4 py-1 focus:outline-none bg-mainBg placeholder:text-sm"
          />
          <AssignJobRole
            open={jobModal}
            handleClose={() => setJobModal(false)}
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

      <div className="border-b my-10" />

      {/* Work Experience */}
      <div>
        <h5 className="text-accent text-sm font-semibold pb-2">
          Work Experience
        </h5>
        <div className="flex items-center justify-between">
          <button
            className="button"
            onClick={() => setWorkExperienceModal(true)}
          >
            Add Employment History
          </button>
          <input
            type="text"
            placeholder="Search.."
            className="rounded-3xl px-4 py-1 focus:outline-none bg-mainBg placeholder:text-sm"
          />
          <WorkExperienceForm
            open={workExperienceModal}
            handleClose={() => setWorkExperienceModal(false)}
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
