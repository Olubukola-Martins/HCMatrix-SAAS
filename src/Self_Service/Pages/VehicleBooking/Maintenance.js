import React from "react";

const Maintenance = () => {
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
            <th>Description</th>
            <th>Vehicle Name</th>
            <th>Plate No</th>
            <th>Registered</th>
            <th>Due Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4].map((item) => (
            <tr key={item}>
              <td>
                <input type="checkbox" />
              </td>
              <td>Oil Change</td>
              <td>Toyota Corolla</td>
              <td>xxxxxxx</td>
              <td>DD/MM/YY</td>
              <td>DD/MM/YY</td>
              <td>
               <button className="transparentButton" style={{color: "var(--caramel)"}}>Renew</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Maintenance;
