import { Tooltip } from "antd";
import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { PageIntro } from "../../../../Layout/Components/PageIntro";
import DashboardLayout from "../../../../Layout/DashboardLayout";
import { AddDepartmentModal } from "../../../Components/Organization/Departments/AddDepartmentModal";
import { DepartmentsGridView } from "../../../Components/Organization/Departments/DepartmentsGridView";
import { DepartmentsTableView } from "../../../Components/Organization/Departments/DepartmentsTableView";
import DepartmentsViewContainer from "../../../Components/Organization/Departments/DepartmentsViewContainer";

const Departments = () => {
  const [showM, setShowM] = useState(false);

  return (
    <DashboardLayout>
      <AddDepartmentModal open={showM} handleClose={() => setShowM(false)} />
      <div className="Container">
        {
          <div className="  mt-4">
            <h4 className="text-lg  mb-1">Departments</h4>
            <div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-center bg-card p-2 rounded text-sm">
              <p>
                Manage all the department details and the departments settings
                in your organization.
              </p>

              <div className="flex gap-4 items-center">
                <button
                  id="invite-button"
                  className="py-1 px-2 bg-caramel rounded text-sm text-white font-medium"
                  onClick={() => setShowM(true)}
                >
                  Add department
                </button>
              </div>
              <button
                className="button"
                onClick={() => setAddDepartmentModal(true)}
              >
                Add department
              </button>
            </div>
            <DepartmentsViewContainer />
          </div>
        }

        <div className="content overflow-y-hidden relative">
          <AnimatePresence exitBeforeEnter>
            {viewId === "grid" && (
              <DepartmentsGridView departments={departments} />
            )}

            {viewId === "list" && (
              <DepartmentsTableView departments={departments} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Departments;
