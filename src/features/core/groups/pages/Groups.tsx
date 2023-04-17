import { PageIntro } from "components/layout/PageIntro";
import PageSubHeader from "components/layout/PageSubHeader";
import { appRoutes } from "config/router/paths";
import { useState } from "react";
import { AddGroupModal } from "../components/AddGroupModal";
import GroupsViewContainer from "../components/GroupsViewContainer";

const Groups = () => {
  const [showM, setShowM] = useState(false);

  return (
    <>
      <AddGroupModal open={showM} handleClose={() => setShowM(false)} />

      <div className="Container">
        <div className="mt-4">
          <PageIntro title="Groups" link={appRoutes.settings} />
          <PageSubHeader
            description="Create and manage custom groups to connect people across different departments."
            actions={[{ name: "Add Group", handleClick: () => setShowM(true) }]}
          />
          <GroupsViewContainer />
        </div>
      </div>
    </>
  );
};

export default Groups;
