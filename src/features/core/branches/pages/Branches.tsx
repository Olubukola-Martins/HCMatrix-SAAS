import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import { useState } from "react";
import { AddBranchModal } from "../components/AddBranchModal";
import BranchesViewContainer from "../components/BranchesViewContainer";
import { ImportBranchModal } from "../components/ImportBranchModal";
import PageSubHeader from "components/layout/PageSubHeader";

const Branches = () => {
  const [showA, setShowA] = useState(false);
  const [showI, setShowI] = useState(false);

  return (
    <>
      <AddBranchModal open={showA} handleClose={() => setShowA(false)} />
      <ImportBranchModal open={showI} handleClose={() => setShowI(false)} />

      <div className="Container">
        {
          <div className="mt-4">
            <PageIntro title="Branches" link={appRoutes.settings} />

            <PageSubHeader
              description="Manage all the branches in your organization."
              actions={[
                { name: "Add Branch", handleClick: () => setShowA(true) },
                { name: "Import Branches", handleClick: () => setShowI(true) },
              ]}
              variant="drop-down"
              dropDownText="Add Branch(es)"
            />

            <BranchesViewContainer />
          </div>
        }
      </div>
    </>
  );
};

export default Branches;
