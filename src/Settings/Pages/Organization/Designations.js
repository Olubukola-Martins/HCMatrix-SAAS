import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import DashboardLayout from "../../../Layout/DashboardLayout";
import PenIcon from "../../Assets/pen_icon.svg";
import AddDesignationDrawer from "../../Components/AddDesignationDrawer";

const designations = [
  { id: "1", name: "backend developer", email: "isaac@snapnet.com" },
  { id: "12", name: "backend developer", email: "isaac@snapnet.com" },
  { id: "11", name: "frontend developer", email: "isaac@snapnet.com" },
  { id: "123", name: "python developer", email: "isaac@snapnet.com" },
  { id: "114", name: "AI/ML expert", email: "isaac@snapnet.com" },
  { id: "41", name: "UI/UX designer", email: "isaac@snapnet.com" },
  { id: "15", name: "Devops Engineer", email: "isaac@snapnet.com" },
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
            <div className="flex justify-between items-center bg-card p-2 rounded text-sm">
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
                  <div
                    className={`p-1 cursor-pointer ${
                      viewId === "grid" ? "bg-caramel text-accent" : "bg-card"
                    }`}
                    onClick={() => handleViewId("grid")}
                  >
                    <i
                      className="fa fa-th  text-base fa-solid "
                      aria-hidden="true"
                    ></i>
                  </div>
                  <div
                    className={`p-1  cursor-pointer ${
                      viewId === "list" ? "bg-caramel text-accent" : "bg-card"
                    }`}
                    onClick={() => handleViewId("list")}
                  >
                    <i className="fa fa-list " aria-hidden="true"></i>
                  </div>
                </div>
                <div className="question-icon">
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
              <motion.div
                className="Container mt-4"
                initial={{ opacity: 0, y: 400 }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                key={0}
                transition={{ ease: "easeIn" }}
                exit={{ opacity: 0, y: 400 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                  {designations.map((item) => (
                    <div className="border p-4 rounded-lg grid grid-cols-1 gap-4">
                      <div className="flex justify-between">
                        <h6 className="text-xl font-thin capitalize">
                          {item.name}
                        </h6>
                        <i className="fa-solid fa-ellipsis"></i>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-sm">{item.email}</p>
                        <div className="rounded-full bg-caramel h-8 w-8 flex items-center justify-center">
                          <span>O</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {viewId === "list" && (
              <motion.div
                className="Container mt-4"
                initial={{ opacity: 0, y: 400 }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                key={2}
                transition={{ ease: "easeIn" }}
                exit={{ opacity: 0, y: 400 }}
              >
                <table className="employee-profile-table">
                  <thead>
                    <tr className="text-left">
                      <th>Designation Name</th>
                      <th>Number of Employees</th>
                      <th>Mail Alias</th>
                      <th className="opacity-0">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {designations.map((item) => (
                      <tr key={item} className="text-left ">
                        <td className="capitalize">{item.name}</td>
                        <td>0</td>
                        <td>{item.email}</td>

                        <td>
                          <div className="flex items-center gap-2 text-xl ">
                            <img src={PenIcon} alt="edit" className="h-4" />{" "}
                            <i className="ri-delete-bin-line text-slate-400"></i>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Designations;
