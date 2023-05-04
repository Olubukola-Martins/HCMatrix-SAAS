import DashboardLayout from "../../../../../Layout/DashboardLayout";

import { appRoutes } from "AppRoutes";
import { PageIntro } from "Layout/Components/PageIntro";
import PageSubHeader from "Layout/Components/PageSubHeader";
import { EditBasicWorkflow } from "./EditBasicWorkflow";
import { useParams } from "react-router-dom";

const EditWorkflow = () => {
  const { id } = useParams();
  return (
    <DashboardLayout>
      <div className="Container">
        {
          // TO DO : Refactor to also accomodate for advanced workflow
          <div className="mt-4">
            <PageIntro
              title="Edit Workflow"
              link={appRoutes.workflowSettings}
            />

            <PageSubHeader description="Edit this workflow to handle your organizations approval process" />

            <div className="mt-6">
              {id ? (
                <EditBasicWorkflow id={+id} />
              ) : (
                <div className="flex items-center justify-center">
                  {" "}
                  Not Found
                </div>
              )}
            </div>
          </div>
        }
      </div>
    </DashboardLayout>
  );
};

export default EditWorkflow;
