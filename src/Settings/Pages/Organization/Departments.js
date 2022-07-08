import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import DashboardLayout from "../../../Layout/DashboardLayout";
import PenIcon from "../../Assets/pen_icon.svg";
import AddDesignationDrawer from "../../Components/AddDesignationDrawer";
import { DesignationsGridView } from "../../Components/DesignationsGridView";
import { DesignationsTableView } from "../../Components/DesignationsTableView";

const designations = [
  {
    id: "1",
    name: "fullstack developer",
    email: "isaac@snapnet.com",
    count: 0,
  },
  {
    id: "12",
    name: "backend developer",
    email: "isaac@snapnet.com",
    count: 2,
  },
  {
    id: "11",
    name: "frontend developer",
    email: "isaac@snapnet.com",
    count: 1,
  },
  {
    id: "123",
    name: "python developer",
    email: "isaac@snapnet.com",
    count: 4,
  },
  { id: "114", name: "AI/ML expert", email: "isaac@snapnet.com", count: 9 },
  { id: "41", name: "UI/UX designer", email: "isaac@snapnet.com", count: 3 },
  { id: "15", name: "Devops Engineer", email: "isaac@snapnet.com", count: 10 },
  { id: "15", name: "Scrum Master", email: "isaac@snapnet.com", count: 15 },
  {
    id: "15",
    name: "Product Manager/Scrum Master",
    email: "isaac@snapnet.com",
    count: 1,
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
                  onClick={() => setShowDraggableDrawer("add-designation")}
                >
                  Add designation
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
          {showDraggableDrawer === "add-designation" && (
            <AddDesignationDrawer handleDrawer={setShowDraggableDrawer} />
          )}
          <AnimatePresence exitBeforeEnter>
            {viewId === "grid" && (
              <DesignationsGridView designations={designations} />
            )}

            {viewId === "list" && (
              <DesignationsTableView designations={designations} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Departments;
