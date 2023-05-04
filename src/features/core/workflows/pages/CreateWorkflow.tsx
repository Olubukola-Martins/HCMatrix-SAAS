import { PageIntro } from "components/layout/PageIntro";
import PageSubHeader from "components/layout/PageSubHeader";
import { appRoutes } from "config/router/paths";
import { CreateBasicWorkflow } from "../components/CreateBasicWorkflow";
import { CreateAdvancedWorkflow } from "../components/CreateAdvancedWorkflow";
import { Tabs } from "antd";

const tabItems = [
  {
    label: "Basic Workflow",
    children: <CreateBasicWorkflow />,
    key: "Basic Workflow",
  },
  {
    label: "Advanced Workflow",
    children: <CreateAdvancedWorkflow />,
    key: "Advanced Workflow",
  },
];

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

            <div className="mt-6">
              <Tabs items={tabItems} type="card" centered />
            </div>
          </div>
        }
      </div>
    </>
  );
};

export default CreateWorklow;
