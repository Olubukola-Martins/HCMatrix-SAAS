import React, { useState } from "react";
import { PageIntro } from "../../../../Layout/Components/PageIntro";
import DashboardLayout from "../../../../Layout/DashboardLayout";

import { AddDelegation } from "./AddDelegation";
import { appRoutes } from "AppRoutes";
import DelegationsViewContainer from "./DelegationsViewContainer";

const Delegation = () => {
  const [addDelegationModal, setAddDelegationModal] = useState(false);
  return (
    <DashboardLayout>
      <AddDelegation
        open={addDelegationModal}
        handleClose={() => setAddDelegationModal(false)}
      />
      <div className="Container">
        <div className="mt-4">
          <PageIntro title="Delegations" link={appRoutes.settings} />
          <div className="flex justify-end mb-5 mt-2">
            <button
              className="button"
              onClick={() => setAddDelegationModal(true)}
            >
              Add delegation
            </button>
          </div>
        </div>
        <DelegationsViewContainer />
      </div>
    </DashboardLayout>
  );
};

export default Delegation;
