import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { PageIntro } from "../../../../Layout/Components/PageIntro";
import DashboardLayout from "../../../../Layout/DashboardLayout";
import { AddDepartmentModal } from "../../../Components/Organization/Departments/AddDepartmentModal";
import { DepartmentsGridView } from "../../../Components/Organization/Departments/DepartmentsGridView";
import { DepartmentsTableView } from "../../../Components/Organization/Departments/DepartmentsTableView";
import DepartmentsViewContainer from "../../../Components/Organization/Departments/DepartmentsViewContainer";

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
  const [showM, setShowM] = useState(false);

  return (
    <DashboardLayout>
      <AddDepartmentModal open={showM} handleClose={() => setShowM(false)} />
      <div className="Container">
        {
          <div className="mt-4">
            <PageIntro title="Departments" link="/settings" />
            <div className="flex flex-col mt-5 gap-2 md:flex-row md:justify-between md:items-center bg-card p-2 rounded text-sm">
              <p>
                Manage all the department details and the departments settings
                in your organization.
              </p>

              <div className="flex gap-4 items-center">
                <button
                  id="invite-button"
                  className="py-1 px-2 bg-caramel rounded text-sm text-white font-medium"
                  onClick={() => setShowM(true)}
                >
                  Add department
                </button>
              </div>
            </div>
            <DepartmentsViewContainer />
          </div>
        }
      </div>
    </DashboardLayout>
  );
};

export default Departments;
