import React from "react";
import DashboardLayout from "../../Layout/DashboardLayout";
import "../Style/style.css";

const PayrollReview = () => {
  return (
    <DashboardLayout>
      <div className="Container mt-10">
        <div className="flex items-center gap-1 mb-5">
          <i className="ri-arrow-left-s-line font-semibold"></i>
          <h5 className="font-black text-base">Payroll Review</h5>
        </div>

        <div className="flex justify-end gap-4 font-medium mb-5">
          <i className="ri-download-2-line text-xl"></i>
          <i className="ri-logout-box-r-line text-xl"></i>
          <button className="border border-gray-500 rounded px-2 py-1 font-medium text-caramel text-sm">
            Compare
          </button>
        </div>

        <table className="payroll-review-table text-gray-600">
          <thead>
            <tr>
              <th>S/N</th>
              <th>Pay Period</th>
              <th>Number of Employee</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>View</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>1</td>
              <td>DD/MM/YY</td>
              <td>2</td>
              <td>NO</td>
              <td className="text-yellow-500 font-medium">Pending</td>
              <td>
                <i className="ri-eye-line text-lg cursor-pointer font-medium"></i>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>DD/MM/YY</td>
              <td>2</td>
              <td>NO</td>
              <td className="text-red-500 font-medium">Closed</td>
              <td>
                <i className="ri-eye-line text-lg cursor-pointer font-medium"></i>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>DD/MM/YY</td>
              <td>2</td>
              <td>NO</td>
              <td className="text-red-500 font-medium">Closed</td>
              <td>
                <i className="ri-eye-line text-lg cursor-pointer font-medium"></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default PayrollReview;
