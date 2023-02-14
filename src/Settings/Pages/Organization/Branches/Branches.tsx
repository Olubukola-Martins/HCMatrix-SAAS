import { appRoutes } from "AppRoutes";
import { useState } from "react";
import { AddBranchModal } from "Settings/Components/Organization/Branches/AddBranchModal";
import BranchesViewContainer from "Settings/Components/Organization/Branches/BranchesViewContainer";
import { PageIntro } from "../../../../Layout/Components/PageIntro";
import DashboardLayout from "../../../../Layout/DashboardLayout";

const Branches = () => {
  const [showM, setShowM] = useState(false);

  return (
    <DashboardLayout>
      <AddBranchModal open={showM} handleClose={() => setShowM(false)} />

      <div className="Container">
        {
          <div className="mt-4">
            <PageIntro title="Branches" link={appRoutes.settings} />
            <div className="flex flex-col mt-4 gap-2 md:flex-row md:justify-between md:items-center bg-card p-2 rounded text-sm">
              <p>Manage all the branches in your organization.</p>

              <div className="flex gap-4 items-center">
                <button
                  id="invite-button"
                  className="py-1 px-2 bg-caramel rounded text-sm text-white font-medium"
                  onClick={() => setShowM(true)}
                >
                  Add Branch
                </button>
              </div>
            </div>
            <BranchesViewContainer />
          </div>
        }
      </div>
    </DashboardLayout>
  );
};

export default Branches;
