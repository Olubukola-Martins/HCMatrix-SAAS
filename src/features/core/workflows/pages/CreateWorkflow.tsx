import { PageIntro } from "components/layout/PageIntro";
import PageSubHeader from "components/layout/PageSubHeader";
import { appRoutes } from "config/router/paths";
import { CreateBasicWorkflow } from "../components/CreateBasicWorkflow";

const CreateWorklow = () => {
  return (
    <>
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
    </>
  );
};

export default CreateWorklow;
