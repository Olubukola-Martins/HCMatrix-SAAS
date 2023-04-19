import { Progress } from "antd";
import { AppButton } from "components/button/AppButton";
import { useState } from "react";
import { Link } from "react-router-dom";
import { NewEvaluation } from "../components/NewEvaluation";
import { PerformanceNav } from "../components/PerformanceNav";

export const BalanceScorecard = () => {
    const [open, setOpen] = useState(false)

  return (
    <div className="Container">
        <NewEvaluation open={open} handleClose={() => setOpen(false)}/>
      <h2 className="lg:text-xl text-lg pb-5 font-bold">Performance</h2>
      <div className="shadow-md rounded border px-3 pb-5">
        <PerformanceNav active="balance scorecard" />
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-lg ">Welcome back Esther</h4>
            <p className="text-sm">
              You have an ongoing evaluation click on view to see the employee
              evaluation.
            </p>
          </div>
          <AppButton label="Set New Evaluation" handleClick={() => setOpen(true)}/>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-8">
          <div className="border rounded shadow-sm">
            <div className="flex items-center justify-between bg-card px-4 py-4">
              <h2 className="font-semibold text-2xl text-accent">
                Q1 Evaluation
              </h2>
              <h4 className="text-yellow-700 rounded-lg p-2 bg-yellow-200 font-bold">
                Ongoing
              </h4>
            </div>

            <div className="flex items-center justify-between px-4 my-5">
              <div>
                <p>Start: Tuesday, 10 January 2022</p>
                <p className="text-caramel pt-1">
                  End: Wednesday, 31 March 2022
                </p>
              </div>
              <div className=" bg-slate-400 h-20" style={{ width: 1.8 }} />

              <div className="flex items-center gap-x-3">
                <Progress
                  type="circle"
                  percent={50}
                  width={50}
                  strokeColor="var(--caramel)"
                />
                <h3 className="font-semibold text-base ">Overall Progress</h3>
              </div>
            </div>

            <div className="w-full bg-slate-400" style={{ height: 1.7 }} />
            <div className="px-4 my-5 flex justify-end">
              <Link
                to="/"
                className="text-caramel text-right text-base underline font-semibold"
              >
                View
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
