import React, { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";
import PayrollSubNav from "../Components/PayrollSubNav";
import ViewPayslip from "../Components/ViewPayslip";

const EmployeePayslips = () => {
  const [view, setView] = useState(false);
  return (
    <DashboardLayout>
      <PayrollSubNav />

      <ViewPayslip open={view} handleClose={() => setView(false)} />

      <div>
        <div className="flex gap-2 text-accent">
          <Link to="/payroll/payslip">
            <i className="ri-arrow-left-s-line text-xl cursor-pointer"></i>
          </Link>
          <div>
            <h5 className="font-black text-lg">Employees Payslips</h5>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button className="button">Download</button>
          <button className="transparentButton">September 2022</button>
        </div>

        <table className="payroll-table text-accent mt-7">
          <thead>
            <tr>
              <th>
                <input type="checkbox" name="" id="" />
              </th>
              <th>Pay Date</th>
              <th>Name</th>
              <th>Employee ID</th>
              <th>Pay Type</th>
              <th>Net Pay</th>
              <th>Gross Pay</th>
              <th>Total Deductions</th>
              <th>Total Bonuses</th>
              <th>Tax</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {[1, 2, 3, 4].map((item) => (
              <tr key={item}>
                <td>
                  <input type="checkbox" name="" id="" />
                </td>
                <td>DD/MM/YY</td>
                <td>Ruth Godwin</td>
                <td>xxxx</td>
                <td>Salary</td>
                <td>N0.00</td>
                <td>N0.00</td>
                <td>N0.00</td>
                <td>N0.00</td>
                <td>N0.00</td>
                <td className="flex items-center gap-3">
                  <i
                    className="ri-eye-line text-lg cursor-pointer hover:text-caramel"
                    onClick={() => setView(true)}
                  ></i>
                  <i className="ri-download-2-line text-lg cursor-pointer hover:text-caramel"></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default EmployeePayslips;
