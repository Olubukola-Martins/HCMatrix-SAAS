import React from "react";
import DashboardLayout from "../../Layout/DashboardLayout";
import PayrollSubNav from "../Components/PayrollSubNav";

const Payslip = () => {
  return (
    <DashboardLayout>
      <PayrollSubNav />
      <div>
        <div className="flex gap-2 text-accent">
          <i className="ri-arrow-left-s-line text-xl cursor-pointer"></i>
          <div>
            <h5 className="font-black text-lg">Payslips</h5>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button className="button">Create Template</button>
          <button
            className="transparentButton"
            style={{ color: "var(--caramel)" }}
          >
            View Payslips
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-7 mt-5">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="bg-card p-4 rounded-md text-center text-accent shadow"
            >
              <span className="block text-xs">Payroll Report</span>

              <h2 className="font-semibold py-14 text-base">
                Report on Basic <br /> Allowances
              </h2>

              <div className="flex items-center justify-between text-sm">
                <span className="text-caramel underline cursor-pointer">
                  Edit
                </span>
                <span className="text-neutral underline cursor-pointer">
                  Delete
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Payslip;
