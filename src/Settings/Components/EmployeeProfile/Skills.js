import React from 'react'
import "../../style/settingsStyle.css";

const Skills = () => {
  return (
 <>
  <div className="flex items-center justify-between">
        <button className="button">Add Skills</button>

        <input
          type="text"
          placeholder="Search.."
          className="rounded-3xl px-4 py-1 focus:outline-none bg-mainBg placeholder:text-sm"
        />
      </div>

      <table className="employee_info_table mt-5">
          <thead>
            <tr>
              <th>Skill</th>
              <th>Competency</th>
              <th>Action</th>
            </tr>
          </thead>
        </table>
        <div className="border text-center py-1 text-sm mt-1">
          No Matching Records
        </div>
 </>
  )
}

export default Skills