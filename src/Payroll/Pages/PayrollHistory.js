import React from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";

const PayrollHistory = () => {
  return (
    <DashboardLayout>
      <div className="Container mt-10 pb-16">
        <div className="flex items-center gap-2 mb-10">
          <Link to="#!" className="hover:text-caramel">
            <i className="ri-arrow-left-s-line text-xl"></i>
          </Link>
          <h5 className="font-black text-lg">Payroll History</h5>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PayrollHistory;
