import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import DashboardLayout from "../../../../Layout/DashboardLayout";
import { Link } from "react-router-dom";
import { RolesTableView } from "../../../Components/UserAccessControl/Roles/RolesTableView";
import RolesViewContainer from "../../../Components/UserAccessControl/Roles/RolesViewContainer";
import { PageIntro } from "../../../../Layout/Components/PageIntro";
import { AddRole } from "../../../Components/UserAccessControl/Roles/AddRole";

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
  const [addRoleModal, setAddRoleModal] = useState(false);
  return (
    <DashboardLayout>
      <div className="Container">
        <AddRole
          open={addRoleModal}
          handleClose={() => setAddRoleModal(false)}
        />
        {
          <div className="mt-4">
            <h4 className="text-lg  mb-1"></h4>
            <PageIntro title="Roles" link="/settings" />
            <div className="flex justify-end">
              <button className="button" onClick={() => setAddRoleModal(true)}>Add Role</button>
            </div>
            <RolesViewContainer />
          </div>
        }
      </div>
    </DashboardLayout>
  );
};

export default Roles;
