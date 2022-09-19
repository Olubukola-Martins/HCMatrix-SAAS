import React from "react";
import { NavLink } from "react-router-dom";

const SelfServiceSubNav = () => {
  return (
   <div className="Container">
      <div className="bg-card w-full py-4 px-3 text-accent rounded mb-7 shadow flex items-center gap-5 text-sm font-medium">
      <NavLink to="/payroll/review" className="hover:text-caramel">
        Loan
      </NavLink>
      <NavLink to="/" className="hover:text-caramel">
        Leave
      </NavLink>
      <NavLink to="/" className="hover:text-caramel">
        Health Access
      </NavLink>
       <NavLink to="/" className="hover:text-caramel">
        Payslip
      </NavLink>
      <NavLink to="/" className="hover:text-caramel">
        Settings
      </NavLink>
      <NavLink to="/" className="hover:text-caramel">
        Settings
      </NavLink>
      <NavLink to="/self-service/home" className="hover:text-accent text-caramel">
        More..
      </NavLink>
    </div>
   </div>
  );
};

export default SelfServiceSubNav;