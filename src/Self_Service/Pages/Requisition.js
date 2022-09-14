import React from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";

const Requisition = () => {
  return (
    <DashboardLayout>
      <div>
        <div className="flex items-center gap-2">
          <Link to="/self-service/home" className="hover:text-caramel">
            <i className="ri-arrow-left-s-line text-xl"></i>
          </Link>
          <h5 className="font-black text-lg">Asset Requisition</h5>
        </div>
        <div className="flex items-center gap-3 mt-4 md:mt-0 justify-start md:justify-end">
          <button className="button">New Requisition</button>
          <button
            className="transparentButton"
            style={{ color: "var(--caramel)" }}
          >
            Add / Replace Assets
          </button>
        </div>

        <table className="payroll-table text-accent mt-6">
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th>Requisition Date</th>
              <th>Requisition Type</th>
              <th>Title</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5].map((item) => (
              <tr key={item}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>DD/MM/YY</td>
                <td>Asset Request</td>
                <td>Laptop Request</td>
                <td>HP EliteBook</td>
                <td>Pending</td>
                <td className="flex items-center justify-center gap-3">
                  <i className="ri-eye-line text-lg"></i>
                  <i className="ri-download-2-line text-lg"></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default Requisition;
