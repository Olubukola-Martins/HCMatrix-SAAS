import { PageIntro } from "components/layout/PageIntro";
import PageSubHeader from "components/layout/PageSubHeader";
import { appRoutes } from "config/router/paths";
import { useParams } from "react-router-dom";
import { EditBasicWorkflow } from "../components/EditBasicWorkflow";

const EditWorkflow = () => {
  const { id } = useParams();
  return (
    <>
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
    </>
  );
};

export default EditWorkflow;
