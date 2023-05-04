import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import { useState } from "react";
import { AddDelegation } from "../components/AddDelegation";
import DelegationsViewContainer from "../components/DelegationsViewContainer";

const Delegations = () => {
  const [addDelegationModal, setAddDelegationModal] = useState(false);
  return (
    <>
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
    </>
  );
};

export default Delegations;
