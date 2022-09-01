import React from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";

const PayrollScheme = () => {
  return (
    <DashboardLayout>
      <div className="Container mt-10 pb-16">
        <div className="flex items-center gap-2 mb-10">
          <Link to="/payroll-review" className="hover:text-caramel">
            <i className="ri-arrow-left-s-line text-xl"></i>
          </Link>
          <h5 className="font-black text-lg">Setup Type/ Scheme</h5>
        </div>

        <div className="flex justify-end mb-6">
          <div className="flex justify-end gap-5 font-medium">
            <i className="ri-download-2-line text-xl"></i>
            <i className="ri-logout-box-r-line text-xl"></i>

            <button className="button">Add Scheme</button>
          </div>
        </div>

        <table className="payroll-table text-accent">
          <thead>
            <tr>
              <th>
                <input type="checkbox" name="" id="" />
              </th>
              <th>Scheme Name</th>
              <th>Scheme Type</th>
              <th>Date Created</th>

              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {[1, 2, 3].map((item) => (
              <tr key={item}>
                <td>
                  <input type="checkbox" name="" id="" />
                </td>

                <td>Allowance</td>
                <td>Salary</td>
                <td>DD/MM/YY</td>

                <td className="flex items-center justify-center gap-3">
                  <i className="ri-pencil-line text-base cursor-pointer"></i>
                  <i className="ri-delete-bin-6-line text-base cursor-pointer"></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default PayrollScheme;
