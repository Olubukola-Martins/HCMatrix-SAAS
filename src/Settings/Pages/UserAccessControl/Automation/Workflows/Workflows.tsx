import { appRoutes } from "AppRoutes";
import { PageIntro } from "Layout/Components/PageIntro";
import PageSubHeader from "Layout/Components/PageSubHeader";
import DashboardLayout from "Layout/DashboardLayout";
import { useNavigate } from "react-router-dom";

import { WorkflowsViewContainer } from "./components/WorkflowsViewContainer";

const Workflows = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
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
    </DashboardLayout>
  );
};

export default Workflows;
