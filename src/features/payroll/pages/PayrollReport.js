import { Dialog, Slide } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import AddPayrollReport from "../components/AddPayrollReport";
import PayrollSubNav from "../components/PayrollSubNav";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PayrollReport = () => {
  const [openFullDialog, setOpenFullDialog] = useState(false);
  return (
    <>
      <PayrollSubNav />

      <Dialog fullScreen open={openFullDialog} TransitionComponent={Transition}>
        <>
          <AddPayrollReport close={() => setOpenFullDialog(false)} />
        </>
      </Dialog>
      <div>
        <div className="flex gap-2 text-accent">
          <Link to="#" className="hover:text-caramel">
            <i className="ri-arrow-left-s-line text-xl"></i>
          </Link>
          <div>
            <h5 className="font-black text-lg">Report</h5>
            <span className="text-xs">
              Control the information that should appear in your payroll
              reports.
            </span>
          </div>
        </div>

        <div className="flex justify-end">
          <button className="button" onClick={() => setOpenFullDialog(true)}>
            Add a Report
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
    </>
  );
};

export default PayrollReport;
