import React, { useState } from "react";
import "../../../../style/settingsStyle.css";
import AddQualification from "./AddQualification";

const Qualification = () => {
  const [qualificationModal, setQualificationModal] = useState(false);
  return (
    <>
      <div className="flex items-center justify-between">
        <button className="button" onClick={() => setQualificationModal(true)}>
          Add Qualification
        </button>
        <input
          type="text"
          placeholder="Search.."
          className="rounded-3xl px-4 py-1 focus:outline-none bg-mainBg placeholder:text-sm"
        />
        <AddQualification
          open={qualificationModal}
          handleClose={() => setQualificationModal(false)}
        />
      </div>

      <table className="employee_info_table mt-5">
        <thead>
          <tr>
            <th>Title</th>
            <th>Qualification</th>
            <th>Year:</th>
            <th>Institution</th>
            <td>CGPA/GRAD/Score</td>
            <td>Discipline</td>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Genomics</td>
            <td>Bachelors</td>
            <td>2016</td>
            <td>Uniben</td>
            <td>4.53</td>
            <td>Biochemistry</td>
            <td>
              <span className="flex items-center gap-2 text-xl justify-center">
                <i className="ri-pencil-line"></i>
                <i className="ri-delete-bin-line"></i>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Qualification;
