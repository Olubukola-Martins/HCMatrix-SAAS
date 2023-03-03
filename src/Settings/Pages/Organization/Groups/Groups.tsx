import { appRoutes } from "AppRoutes";

import { PageIntro } from "Layout/Components/PageIntro";
import PageSubHeader from "Layout/Components/PageSubHeader";
import DashboardLayout from "Layout/DashboardLayout";
import { useState } from "react";
import { AddGroupModal } from "Settings/Components/Organization/Groups/AddGroupModal";
import GroupsViewContainer from "Settings/Components/Organization/Groups/GroupsViewContainer";

const Groups = () => {
  const [showM, setShowM] = useState(false);

  return (
    <DashboardLayout>
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
    </DashboardLayout>
  );
};

export default Groups;
