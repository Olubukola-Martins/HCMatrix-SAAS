import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import DashboardLayout from "../../../../Layout/DashboardLayout";
import PenIcon from "../../../Assets/pen_icon.svg";
import AddDesignationDrawer from "../../../Components/Organization/Designations/AddDesignationDrawer";
import { AddDesignationModal } from "../../../Components/Organization/Designations/AddDesignationModal";
import { DesignationsGridView } from "../../../Components/Organization/Designations/DesignationsGridView";
import { DesignationsTableView } from "../../../Components/Organization/Designations/DesignationsTableView";
import DesignationsViewContainer from "../../../Components/Organization/Designations/DesignationsViewContainer";

const designations = [
  {
    id: "1",
    name: "fullstack developer",
    department: "Application Development",
    count: 0,
  },
  {
    id: "12",
    name: "backend developer",
    department: "Application Development",
    count: 2,
  },
  {
    id: "11",
    name: "frontend developer",
    department: "Application Development",
    count: 1,
  },
  {
    id: "123",
    name: "HR Admin",
    department: "Human Resources",
    count: 4,
  },
  {
    id: "114",
    name: "AI/ML expert",
    department: "Data Analytics",
    count: 9,
  },
  {
    id: "41",
    name: "UI/UX designer",
    department: "Design",
    count: 3,
  },
  {
    id: "15",
    name: "Flexer",
    department: "Enjoyment",
    count: 10,
  },
  {
    id: "15",
    name: "Scrum Master",
    department: "Product Management",

    count: 15,
  },
  {
    id: "15",
    name: "Product Manager/Scrum Master",
    department: "Product Management",
    count: 1,
  },
];

const Designations = () => {
  const [showM, setShowM] = useState(false);

  return (
    <DashboardLayout>
      <AddDesignationModal open={showM} handleClose={() => setShowM(false)} />

      <div className="Container">
        {
          <div className="  mt-4">
            <h4 className="text-lg  mb-1">Job Designations</h4>
            <div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-center bg-card p-2 rounded text-sm">
              <p>Manage all the job designations in your organization.</p>

              <div className="flex gap-4 items-center">
                <button
                  id="invite-button"
                  className="py-1 px-2 bg-caramel rounded text-sm text-white font-medium"
                  onClick={() => setShowM(true)}
                >
                  Add Designation
                </button>
              </div>
            </div>
            <DesignationsViewContainer />
          </div>
        }
      </div>
    </DashboardLayout>
  );
};

export default Designations;
