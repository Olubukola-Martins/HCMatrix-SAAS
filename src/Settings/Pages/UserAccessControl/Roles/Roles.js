import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import DashboardLayout from "../../../../Layout/DashboardLayout";
import { Link } from "react-router-dom";

import { RolesTableView } from "../../../Components/UserAccessControl/Roles/RolesTableView";

const roles = [
  {
    id: 90,
    name: "Line Manager",
    lastModifiedBy: "John Doe",
    updatedAt: "July 3, 2022",
  },
  {
    id: 1,
    name: "Department Head",
    lastModifiedBy: "John Doe",
    updatedAt: "July 3, 2022",
  },
  {
    id: 0,
    name: "IT Administrator",
    lastModifiedBy: "John Doe",
    updatedAt: "July 3, 2022",
  },
  {
    id: 2,
    name: "Head of Strategy",
    lastModifiedBy: "John Doe",
    updatedAt: "July 3, 2022",
  },
  {
    id: 3,
    name: "Head of Hr",
    lastModifiedBy: "John Doe",
    updatedAt: "July 3, 2022",
  },
  {
    id: 4,
    name: "Employee",
    lastModifiedBy: "John Doe",
    updatedAt: "July 3, 2022",
  },
  {
    id: 5,
    name: "Branch Manager",
    lastModifiedBy: "John Doe",
    updatedAt: "July 3, 2022",
  },
];

const Roles = () => {
  const [viewId, setViewId] = useState("list");

  return (
    <DashboardLayout>
      <div className="h-screen">
        {
          <div className="  mt-4">
            <h4 className="text-lg  mb-1">Roles and Permissions</h4>
            <div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-center bg-card p-2 rounded text-sm">
              <p>Manage roles and permissions</p>

              <div className="flex gap-4 items-center">
                <Link
                  id="invite-button"
                  className="py-1 px-2 bg-caramel rounded text-sm text-white font-medium"
                  to="/settings/roles/create"
                >
                  Add role
                </Link>
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
            <div className="flex flex-col gap-2 md:flex-row md:justify-end md:items-center mt-2 p-2 rounded text-sm">
              <div className="input-container w-1/4">
                <input
                  type="text"
                  placeholder="Search roles"
                  className="w-full bg-transparent rounded-md p-2 border border-gray-400 focus:outline-none "
                />
              </div>
            </div>
          </div>
        }
        {/* adjust accordingly */}

        <div className="content overflow-y-hidden relative">
          <AnimatePresence exitBeforeEnter>
            {viewId === "list" && <RolesTableView roles={roles} />}
          </AnimatePresence>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Roles;
