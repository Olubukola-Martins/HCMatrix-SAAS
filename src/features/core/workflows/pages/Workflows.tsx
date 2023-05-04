import { useNavigate } from "react-router-dom";

import { PageIntro } from "components/layout/PageIntro";
import PageSubHeader from "components/layout/PageSubHeader";
import { appRoutes } from "config/router/paths";
import { WorkflowsViewContainer } from "../components/WorkflowsViewContainer";

const Workflows = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="Container">
        {
          <div className="mt-4">
            <PageIntro title="Workflows" link={appRoutes.settings} />

            <PageSubHeader
              description="Manage all the approval processes within your organization with workflows."
              actions={[
                {
                  name: "Create workflow",
                  handleClick: () => navigate(appRoutes.createWorkflow),
                },
              ]}
            />
            <WorkflowsViewContainer />
          </div>
        }
      </div>
    </>
  );
};

export default Workflows;
