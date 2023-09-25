import React from "react";
import { TasksContainer } from "../components/TasksContainer";
import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import SelfServiceSubNav from "features/self-service/components/SelfServiceSubNav";

const TasksPage = () => {
  return (
    <>
      <SelfServiceSubNav />

      <div className="Container ">
        <PageIntro title="Tasks" link={appRoutes.selfServiceHome} />
        <TasksContainer />
      </div>
    </>
  );
};

export default TasksPage;
