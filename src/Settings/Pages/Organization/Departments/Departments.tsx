import { Tooltip } from "antd";
import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { PageIntro } from "../../../../Layout/Components/PageIntro";
import DashboardLayout from "../../../../Layout/DashboardLayout";
import { AddDepartment } from "../../../Components/Organization/Departments/AddDepartment";
import { DepartmentsGridView } from "../../../Components/Organization/Departments/DepartmentsGridView";
import { DepartmentsTableView } from "../../../Components/Organization/Departments/DepartmentsTableView";

const Departments = () => {
  const [addDepartmentModal, setAddDepartmentModal] = useState(false);

  const [viewId, setViewId] = useState("list");
  const handleViewId = (val: React.SetStateAction<string>) => {
    setViewId(val);
  };
  return (
    <DashboardLayout>
      <AddDepartment
        open={addDepartmentModal}
        handleClose={() => setAddDepartmentModal(false)}
      />
      <div className="Container">
        <PageIntro title="Departments" link="/settings" />
        <div className="mt-5">
          <div className="">
            <div className="flex justify-between items-center">
              <div className="view-toggler flex rounded overflow-hidden items-center bg-card p-1">
                <Tooltip title="Grid View">
                  <i
                    onClick={() => handleViewId("grid")}
                    className={
                      viewId === "grid"
                        ? "ri-layout-grid-fill text-base text-white bg-caramel px-2 border cursor-pointer"
                        : "ri-layout-grid-fill text-base text-black bg-white px-2 border cursor-pointer"
                    }
                    aria-hidden="true"
                  ></i>
                </Tooltip>
                <Tooltip title="List View">
                  <i
                    className={
                      viewId === "list"
                        ? "ri-list-unordered text-base text-white bg-caramel px-2 border cursor-pointer"
                        : "ri-list-unordered text-base text-black bg-white px-2 border cursor-pointer"
                    }
                    onClick={() => handleViewId("list")}
                    aria-hidden="true"
                  ></i>
                </Tooltip>
              </div>
              <button
                className="button"
                onClick={() => setAddDepartmentModal(true)}
              >
                Add department
              </button>
            </div>
          </div>
        </div>

        <div className="content overflow-hidden relative mt-5">
          <AnimatePresence exitBeforeEnter>
            {viewId === "grid" && <DepartmentsGridView />}

            {viewId === "list" && <DepartmentsTableView />}
          </AnimatePresence>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Departments;
