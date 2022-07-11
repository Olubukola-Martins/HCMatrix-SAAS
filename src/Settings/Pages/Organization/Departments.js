import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import DashboardLayout from "../../../Layout/DashboardLayout";

import AddDepartmentDrawer from "../../Components/AddDepartmentDrawer";
import { DepartmentsGridView } from "../../Components/DepartmentsGridView";
import { DepartmentsTableView } from "../../Components/DepartmentsTableView";

const departments = [
  {
    id: "1",
    name: "Human Resource",
    email: "isaac@snapnet.com",
    noOfEmployees: 4,
    head: "Emeka Chukwu",
  },
  {
    id: "3",
    name: "App development",
    email: "isaac@snapnet.com",
    noOfEmployees: 2,
    head: "Emeka Chukwu",
  },
  {
    id: "2",
    name: "Marketing",
    email: "isaac@snapnet.com",
    noOfEmployees: 15,
    head: "Emeka Chukwu",
  },
  {
    id: "4",
    name: "Devops",
    email: "isaac@snapnet.com",
    noOfEmployees: 15,
    head: "Emeka Chukwu",
  },
  {
    id: "12",
    name: "Graphic Design",
    email: "isaac@snapnet.com",
    noOfEmployees: 15,
    head: "Emeka Chukwu",
  },
];

const Departments = () => {
  const [viewId, setViewId] = useState("list");
  const [showDraggableDrawer, setShowDraggableDrawer] = useState("");

  const handleViewId = (val) => {
    setViewId(val);
  };
  return (
    <DashboardLayout>
      <div className="h-screen">
        {
          <div className="Container mt-4">
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
                  onClick={() => setShowDraggableDrawer("add-department")}
                >
                  Add department
                </button>
                <div className="view-toggler flex rounded overflow-hidden items-center">
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
                </div>
                <div className="question-icon ml-auto md:ml-0">
                  <i
                    className="ri-question-fill text-xl cursor-pointer text-gray-400"
                    title="Employee profile"
                  ></i>
                </div>
              </div>
            </div>
          </div>
        }

        <div className="content overflow-y-hidden relative">
          {showDraggableDrawer === "add-department" && (
            <AddDepartmentDrawer handleDrawer={setShowDraggableDrawer} />
          )}
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
