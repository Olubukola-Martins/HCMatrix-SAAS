import { useState } from "react";
import DashboardLayout from "../../../../Layout/DashboardLayout";
import { AddDesignationModal } from "../../../Components/Organization/Designations/AddDesignationModal";
import DesignationsViewContainer from "../../../Components/Organization/Designations/DesignationsViewContainer";

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
