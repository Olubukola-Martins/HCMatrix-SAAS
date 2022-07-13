import React from "react";

const Salary = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <button className="button">Add Salary</button>
        <input
          type="text"
          placeholder="Search.."
          className="rounded-3xl px-4 py-1 focus:outline-none bg-mainBg placeholder:text-sm"
        />
      </div>

      <table className="employee_info_table mt-5">
        <thead>
          <tr>
            <th>Salary</th>
            <th>Effective Date</th>
            <th>Created By</th>
            <th>Created On</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>N500,000</td>
            <td>01 - 08 - 2022</td>
            <td>Basil Spain</td>
            <td>14 - 07 - 2022</td>
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

export default Salary;
