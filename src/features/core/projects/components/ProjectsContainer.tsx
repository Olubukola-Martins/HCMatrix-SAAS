import PageSubHeader from "components/layout/PageSubHeader";
import React, { useState } from "react";
import { ProjectsTableContainer } from "./ProjectsTableContainer";
import AddProject from "./AddProject";

export const ProjectsContainer = () => {
  const [showM, setShowM] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <AddProject open={showM} handleClose={() => setShowM(false)} />

      <PageSubHeader
        description={`You can now create and manage your projects.`}
        actions={[{ name: "Add Project", handleClick: () => setShowM(true) }]}
      />
      <ProjectsTableContainer />
    </div>
  );
};
