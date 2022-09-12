import React from "react";
import { NavLink } from "react-router-dom";

const PayrollSubNav = () => {
  return (
    <div className="bg-card w-full py-4 px-3 text-accent rounded mb-7 shadow flex items-center gap-5 text-sm font-medium">
      <NavLink to="/payroll/review" className="hover:text-caramel">
        Payroll Review
      </NavLink>
      <NavLink to="/payroll/report" className="hover:text-caramel">
        Payroll Report
      </NavLink>
      <NavLink to="/settings/payroll" className="hover:text-caramel">
        Payroll Settings
      </NavLink>
       <NavLink to="/payroll/payslip" className="hover:text-caramel">
        Payslip
      </NavLink>
    </div>
  );
};

export default PayrollSubNav;
