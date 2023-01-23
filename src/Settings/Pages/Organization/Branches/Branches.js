import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import AddBranch from "Settings/Components/Organization/Branches/AddBranch";
import { BranchGridView } from "Settings/Components/Organization/Branches/BranchGridView";
import { BranchTableView } from "Settings/Components/Organization/Branches/BranchTableView";
import ImportBranch from "Settings/Components/Organization/Branches/ImportBranch";
import DashboardLayout from "../../../../Layout/DashboardLayout";

const Branches = () => {
  const [showDraggableDrawer, setShowDraggableDrawer] = useState("");
  const [switchView, setSwitchView] = useState(true);

  return (
    <DashboardLayout>
      <div className="relative">
        <div className="  pb-12">
          <div className="flex items-center gap-3 text-accent font-semibold mt-2 pb-1">
            <Link to="/settings">
              <i className="ri-arrow-left-line text-xl cursor-pointer hover:text-caramel"></i>
            </Link>
            <h5 className="text-lg">Work Branch</h5>
          </div>

          <div className="bg-card flex flex-col lg:flex-row gap-4 lg:justify-between lg:items-center p-3 rounded-md">
            <p className="text-sm md:text-base text-accent">
              Create multiple branches for your organization and manage
              branch details
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowDraggableDrawer("filter")}
                className="py-1 px-2 bg-caramel rounded text-sm text-white font-medium"
              >
                Add branch
              </button>
              <button
                onClick={() => setShowDraggableDrawer("importBranch")}
                className="py-1 px-2 bg-transparent rounded text-sm text-accent border border-slate-200 hover:border-slate-400 font-medium transition ease-in-out duration-300"
              >
                Import
              </button>
              <div className="flex items-center">
                <i
                  onClick={() => setSwitchView(true)}
                  className={
                    switchView
                      ? "ri-layout-grid-fill text-base text-white bg-caramel px-2 border cursor-pointer"
                      : "ri-layout-grid-fill text-base text-black bg-white px-2 border cursor-pointer"
                  }
                  title="Grid view"
                ></i>

                <i
                  onClick={() => setSwitchView(false)}
                  className={
                    switchView
                      ? "ri-list-unordered text-base text-black bg-white px-2 border cursor-pointer"
                      : "ri-list-unordered text-base text-white bg-caramel px-2 border cursor-pointer"
                  }
                  title="Table view"
                ></i>
              </div>
              <i className="ri-question-fill text-xl text-slate-400"></i>
            </div>
          </div>
          <AnimatePresence>
            {showDraggableDrawer === "filter" && (
              <AddBranch handleDrawer={() => setShowDraggableDrawer("")} />
            )}
            {showDraggableDrawer === "importBranch" && (
              <ImportBranch handleDrawer={() => setShowDraggableDrawer("")} />
            )}
          </AnimatePresence>

          {/* main body */}
          <div className="mt-10 min-h-screen">
            {switchView ? <BranchGridView /> : <BranchTableView />}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Branches;
