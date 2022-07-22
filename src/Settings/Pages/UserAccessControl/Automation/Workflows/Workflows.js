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
];

const Roles = () => {
  const [showDraggableDrawer, setShowDraggableDrawer] = useState("");
  return (
    <DashboardLayout>
      <div className="h-screen">
        {
          <div className="Container mt-4">
            <h4 className="text-lg  mb-1">Workflows</h4>
            <div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-center bg-card p-2 rounded text-sm">
              <p>Manage workflows</p>

              <div className="flex gap-4 items-center">
                <button
                  id="invite-button"
                  className="py-1 px-2 bg-caramel rounded text-sm text-white font-medium"
                  onClick={() => setShowDraggableDrawer("add-workflow")}
                >
                  Add workflow
                </button>
                {/* <div className="view-toggler flex rounded overflow-hidden items-center">
                  <i
                    onClick={() => handleViewId("grid")}
                    className={
                      viewId === "grid"
                        ? "ri-layout-grid-fill text-base text-white bg-caramel px-2 border cursor-pointer"
                        : "ri-layout-grid-fill text-base text-black bg-white px-2 border cursor-pointer"
                    }
                    aria-hidden="true"
                  ></i>

                  <i
                    className={
                      viewId === "list"
                        ? "ri-list-unordered text-base text-white bg-caramel px-2 border cursor-pointer"
                        : "ri-list-unordered text-base text-black bg-white px-2 border cursor-pointer"
                    }
                    onClick={() => handleViewId("list")}
                    aria-hidden="true"
                  ></i>
                </div> */}
                <div className="question-icon ml-auto md:ml-0">
                  <i
                    className="ri-question-fill text-xl cursor-pointer text-gray-400"
                    title="Employee profile"
                  ></i>
                </div>
              </div>
            </div>
            {/* <div className="flex flex-col gap-2 md:flex-row md:justify-end md:items-center mt-2 p-2 rounded text-sm">
              <div className="input-container w-1/4">
                <input
                  type="text"
                  placeholder="Search workflows"
                  className="w-full bg-transparent rounded-md p-2 border border-gray-400 focus:outline-none "
                />
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
