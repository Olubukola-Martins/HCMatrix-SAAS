import React from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";

const SystemAdmins = () => {
  return (
    <DashboardLayout>
      <div className="Container mt-10 pb-16">
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-2">
            <Link to="payroll/review" className="hover:text-caramel">
              <i className="ri-arrow-left-s-line text-xl"></i>
            </Link>
            <h5 className="font-black text-lg">System Administrators</h5>
          </div>
          <button className="border border-caramel px-2 py-1 rounded-md text-caramel">
            View recent activities
          </button>
        </div>

        <div className="flex justify-end mb-6">
          <div className="flex justify-end gap-5 font-medium text-sm">
            <div className="">
              <input
                type="text"
                placeholder="Search comapnies"
                className="w-full bg-transparent rounded-md px-2 py-1 border border-gray-400 focus:outline-none "
              />
            </div>
            <button className="bg-caramel px-2 py-1 rounded-md text-white">
              Add Admin
            </button>
          </div>
        </div>

        <table className="payroll-table text-accent">
          <thead>
            <tr>
              <th>S/N</th>
              <th>Admin Name</th>
              <th>Email</th>
              <th>Company(ies) assigned</th>

              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {Array(4)
              .fill(0)
              .map((item, index) => (
                <tr key={item}>
                  <td>{index + 1}</td>

                  <td>James Walter</td>
                  <td>onyeka@gmail.com</td>
                  <td>Dangote Cement</td>

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

export default SystemAdmins;
