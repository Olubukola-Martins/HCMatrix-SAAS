import React from "react";
import DashboardLayout from "../../../../../Layout/DashboardLayout";

import { appRoutes } from "AppRoutes";
import { PageIntro } from "Layout/Components/PageIntro";
import PageSubHeader from "Layout/Components/PageSubHeader";
import { CreateBasicWorkflow } from "./CreateBasicWorkflow";

const CreateWorklow = () => {
  return (
    <DashboardLayout>
      <div className="Container">
        {
          // TO DO : Refactor to also accomodate for advanced workflow
          <div className="mt-4">
            <PageIntro
              title="Create Workflow"
              link={appRoutes.workflowSettings}
            />

            <PageSubHeader description="Create a workflow to handle your organizations approval process" />

            <div className="mt-6">
              <CreateBasicWorkflow />
            </div>
          </div>
        }
      </div>
    </DashboardLayout>
  );
};

export default CreateWorklow;
