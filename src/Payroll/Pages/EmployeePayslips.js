import React from "react";
import DashboardLayout from "../../Layout/DashboardLayout";
import PayrollSubNav from "../Components/PayrollSubNav";

const EmployeePayslips = () => {
  return (
    <DashboardLayout>
      <PayrollSubNav />
      <div>
        <div className="flex gap-2 text-accent">
          <i className="ri-arrow-left-s-line text-xl cursor-pointer"></i>
          <div>
            <h5 className="font-black text-lg">Employees Payslips</h5>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button className="button">Download</button>
          <button className="transparentButton">September 2022</button>
        </div>

        <table className="payroll-table text-accent">
          <thead>
            <tr>
              <th>
                <input type="checkbox" name="" id="" />
              </th>
              <th>Pay Date</th>
              <th>Pay Type</th>
              <th>Net Pay</th>
              <th>Gross Pay</th>
              <th>Deduction</th>
              <th>Bonuses</th>
              <th>Tax</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {[1, 2, 3, 4, 5, 6, 7].map((item) => (
              <tr key={item}>
                <td>
                  <input type="checkbox" name="" id="" />
                </td>

                <td>DD/MM/YY</td>
                <td>Salary</td>
                <td>N0.00</td>
                <td>N0.00</td>
                <td>Fixed</td>
                <td>Fixed</td>
                <td>N0.00</td>
                <td className="text-caramel text-xs">Closed</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default EmployeePayslips;
