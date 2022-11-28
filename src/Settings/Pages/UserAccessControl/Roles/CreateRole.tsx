import React, { useState } from "react";
import DashboardLayout from "../../../../Layout/DashboardLayout";
import { Link } from "react-router-dom";
import CreateRoleForm from "../../../Components/UserAccessControl/Roles/CreateRoleForm";

const CreateRole = () => {
  return (
    <DashboardLayout>
      <div className="Container">
        <div className="mt-4 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-accent font-semibold mt-2 pb-1">
            <Link to="/settings/roles">
              <i className="ri-arrow-left-line text-lg cursor-pointer hover:text-caramel"></i>
            </Link>
            <h4 className="text-lg  mb-1">Create Role</h4>
          </div>
          <div className="bg-card px-4 py-4 rounded-md">
            <CreateRoleForm />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreateRole;
