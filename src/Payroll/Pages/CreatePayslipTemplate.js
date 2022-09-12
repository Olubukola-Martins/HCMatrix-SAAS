import React from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";
import PayrollSubNav from "../Components/PayrollSubNav";

const CreatePayslipTemplate = () => {
  return (
    <DashboardLayout>
      <PayrollSubNav />
      <div>
        <div className="flex gap-2 text-accent">
          <Link to="/payroll/payslip">
            <i className="ri-arrow-left-s-line text-xl cursor-pointer"></i>
          </Link>
          <div>
            <h5 className="font-black text-lg">Create Payslip Template</h5>
          </div>
        </div>

        
      </div>
    </DashboardLayout>
  );
};

export default CreatePayslipTemplate;
