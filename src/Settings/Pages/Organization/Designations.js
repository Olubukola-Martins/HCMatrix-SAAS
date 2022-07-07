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

const Designations = () => {
  const [headerId, setHeaderId] = useState("header3");
  const [viewId, setViewId] = useState("list");
  const [showDraggableDrawer, setShowDraggableDrawer] = useState("");

  const handleViewId = (val) => {
    setViewId(val);
  };
  return (
    <DashboardLayout>
      <div className="h-screen">
        {headerId === "header2" && (
          <div className="Container mt-4">
            <div className="flex justify-between items-center bg-card p-2 rounded">
              <h4 className="text-lg ">
                <i
                  className="fa fa-arrow-left text-caramel mr-2 text-base"
                  aria-hidden="true"
                ></i>
                Designations
              </h4>
              <div className="flex gap-4 items-end">
                <img src={PenIcon} alt="edit" className="h-5" />
                <i className="fa fa-info-circle text" aria-hidden="true"></i>
                <i className="fa-solid fa-ellipsis"></i>
              </div>
            </div>
            <p className="text-xs mt-1">
              Manage all the designation details in your organization.
            </p>
          </div>
        )}
        {headerId === "header1" && (
          <div className="Container mt-4">
            <div className="flex justify-between items-center bg-card p-2 rounded text-sm">
              <h4 className="text-lg ">Designations</h4>
              <div className="flex gap-4 items-center">
                <p>
                  <span className="text-caramel ">My Groups</span>/All Groups
                </p>
                <button
                  id="invite-button"
                  className="py-1 px-2 bg-caramel rounded text-sm text-white font-medium"
                >
                  Add designation
                </button>
                <div className="question-icon">
                  <i
                    className="ri-question-fill text-xl cursor-pointer text-gray-400"
                    title="Employee profile"
                  ></i>
                </div>
              </div>
            </div>
            <p className="text-xs mt-1">
              Manage all the designation details in your organization.
            </p>
          </div>
        )}
        {headerId === "header3" && (
          <div className="Container mt-4">
            <h4 className="text-lg  mb-1">Job designation</h4>
            <div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-center bg-card p-2 rounded text-sm">
              <p>Manage all the designation details in your organization.</p>

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
        )}

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

export default Designations;
