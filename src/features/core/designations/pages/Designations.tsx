import { PageIntro } from "components/layout/PageIntro";
import { useState } from "react";
import { AddDesignationModal } from "../components/AddDesignationModal";
import DesignationsViewContainer from "../components/DesignationsViewContainer";

const Designations = () => {
  const [showM, setShowM] = useState(false);

  return (
    <>
      <AddDesignationModal open={showM} handleClose={() => setShowM(false)} />

      <div className="Container">
        {
          <div className="mt-4">
            <PageIntro title="Job Designations" link="/settings" />
            <div className="flex flex-col mt-4 gap-2 md:flex-row md:justify-between md:items-center bg-card p-2 rounded text-sm">
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
    </>
  );
};

export default Designations;
