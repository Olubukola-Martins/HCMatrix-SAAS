import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import DashboardLayout from "../../../../../Layout/DashboardLayout";
import { Link } from "react-router-dom";

import { WorkflowsTableView } from "../../../../Components/UserAccessControl/Automation/Workflows/WorkflowsTableView";
import CreateWorkflowDrawer from "../../../../Components/UserAccessControl/Automation/Workflows/CreateWorkflowDrawer";

const workflows = [
  {
    id: 90,
    name: "Leave Approval",
    noOfStages: 4,
    updatedAt: "2 days ago",
    lastModifiedBy: "James Logan",
  },
  {
    id: 90,
    name: "Loan Approval",
    noOfStages: 1,
    updatedAt: "2 days ago",
    lastModifiedBy: "James Logan",
  },
  {
    id: 90,
    name: "Payroll Approval",
    noOfStages: 2,
    updatedAt: "2 days ago",
    lastModifiedBy: "James Logan",
  },
  {
    id: 90,
    name: "Performanece Appraisal",
    noOfStages: 6,
    updatedAt: "2 days ago",
    lastModifiedBy: "James Logan",
  },
];

const Roles = () => {
  const [showDraggableDrawer, setShowDraggableDrawer] = useState("");
  return (
    <DashboardLayout>
      <div className="h-screen">
        {
          <div className="  mt-4">
            <div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-center p-2 rounded text-sm">
              <h4 className="text-lg  mb-1">Workflows</h4>
              <div className="flex gap-4 items-center">
                <Link
                  to="/settings/automation/workflows/create"
                  className="py-1 px-2 bg-caramel rounded text-sm text-white font-medium"
                >
                  Create workflow
                </Link>
                <button
                  id="invite-button"
                  onClick={() => setShowDraggableDrawer("add-workflow")}
                ></button>

                <div className="question-icon flex items-center gap-2 ml-auto md:ml-0">
                  <i
                    className="ri-filter-line text-xl cursor-pointer"
                    onClick={() => setShowDraggableDrawer("filter")}
                  ></i>
                  <i
                    className="ri-question-fill text-xl cursor-pointer text-gray-400"
                    title="Employee profile"
                  ></i>
                </div>
              </div>
            </div>
            {/* <div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-center bg-card p-2 rounded text-sm">
              <p>Manage workflows</p>

              <div className="flex gap-4 items-center">
                <button
                  id="invite-button"
                  className="py-1 px-2 bg-caramel rounded text-sm text-white font-medium"
                  onClick={() => setShowDraggableDrawer("add-workflow")}
                >
                  Add workflow
                </button>
               
                <div className="question-icon ml-auto md:ml-0">
                  <i
                    className="ri-question-fill text-xl cursor-pointer text-gray-400"
                    title="Employee profile"
                  ></i>
                </div>
              </div>
            </div> */}
          </div>
        }
        {/* adjust accordingly */}

        <div className="content overflow-y-hidden relative">
          <AnimatePresence exitBeforeEnter>
            {showDraggableDrawer === "add-workflow" && (
              <CreateWorkflowDrawer handleDrawer={setShowDraggableDrawer} />
            )}
            <WorkflowsTableView workflows={workflows} />
          </AnimatePresence>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Roles;
