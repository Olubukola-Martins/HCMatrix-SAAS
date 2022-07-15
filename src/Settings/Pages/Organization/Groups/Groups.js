import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import DashboardLayout from "../../../../Layout/DashboardLayout";
import PenIcon from "../../../Assets/pen_icon.svg";
import AddGroupDrawer from "../../../Components/Organization/Groups/AddGroupDrawer";
import { GroupsTableView } from "../../../Components/Organization/Groups/GroupsTableView";

const groups = [
  {
    id: "1",
    name: "Dev Team",
    email: "isaac@snapnet.com",
    description: "Welcome to our group",
  },
  {
    id: "2",
    name: "Marketing Team",
    email: "isaac@snapnet.com",
    description: "Welcome to our group",
  },
  {
    id: "3",
    name: "Design Team",
    email: "isaac@snapnet.com",
    description: "Welcome to our group",
  },
];

const Groups = () => {
  const [headerId, setHeaderId] = useState("header1");
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
              <h4 className="text-lg ">Groups</h4>
              <div className="flex gap-4 items-center">
                <p>
                  <span className="text-caramel ">My Groups</span>/All Groups
                </p>
                <button
                  id="invite-button"
                  className="py-1 px-2 bg-caramel rounded text-sm text-white font-medium"
                  onClick={() => setShowDraggableDrawer("add-group")}
                >
                  Add group
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
              Create and manage custom groups to connect people across different
              departments.
            </p>
          </div>
        )}
        {headerId === "header3" && (
          <div className="Container mt-4">
            <h4 className="text-lg  mb-1">Groups</h4>
            <div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-center bg-card p-2 rounded text-sm">
              <p>Manage all the group details in your organization.</p>

              <div className="flex gap-4 items-center">
                <button
                  id="invite-button"
                  className="py-1 px-2 bg-caramel rounded text-sm text-white font-medium"
                  onClick={() => setShowDraggableDrawer("add-group")}
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
          {showDraggableDrawer === "add-group" && (
            <AddGroupDrawer handleDrawer={setShowDraggableDrawer} />
          )}
          <AnimatePresence exitBeforeEnter>
            {viewId === "list" && <GroupsTableView groups={groups} />}
          </AnimatePresence>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Groups;
