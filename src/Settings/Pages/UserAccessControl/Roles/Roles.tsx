import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import DashboardLayout from "../../../../Layout/DashboardLayout";
import { Link } from "react-router-dom";

import { RolesTableView } from "../../../Components/UserAccessControl/Roles/RolesTableView";
import RolesViewContainer from "../../../Components/UserAccessControl/Roles/RolesViewContainer";
import { PageIntro } from "../../../../Layout/Components/PageIntro";

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
      <div className="Container">
        {
          <div className="  mt-4">
            <h4 className="text-lg  mb-1"></h4>
            <PageIntro title="Role & Permissions" link="/settings" />
            <div className="flex flex-col mt-4 gap-2 md:flex-row md:justify-between md:items-center bg-card p-2 rounded text-sm">
              <p>Manage all the roles and permissions in your organization.</p>

              <div className="flex gap-4 items-center">
                <Link
                  id="invite-button"
                  className="py-1 px-2 bg-caramel rounded text-sm text-white font-medium"
                  to="/settings/roles/create"
                >
                  Add role
                </Link>
              </div>
            </div>
            <RolesViewContainer />
          </div>
        }
      </div>
    </DashboardLayout>
  );
};

export default Roles;
