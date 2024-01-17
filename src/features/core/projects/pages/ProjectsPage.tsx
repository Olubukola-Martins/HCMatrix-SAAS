import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import React from "react";
import { ProjectsContainer } from "../components/ProjectsContainer";

const ProjectsPage = () => {
  return (
    <div>
      <div className="Container ">
        <PageIntro title="Project Management" link={appRoutes.settings} />
        <ProjectsContainer />
      </div>
    </div>
  );
};

export default ProjectsPage;
