import { PageIntro } from "components/layout/PageIntro";
import PageSubHeader from "components/layout/PageSubHeader";
import { appRoutes } from "config/router/paths";
import { useParams } from "react-router-dom";
import { EditBasicWorkflow } from "../components/EditBasicWorkflow";
import { useFetchSingleWorkflow } from "../hooks/useFetchSingleWorkflow";
import { Skeleton } from "antd";
import { TSingleWorkflow } from "../types";
import { EditAdvancedWorkflow } from "../components/EditAdvancedWorkflow";

const EditWorkflow = () => {
  const { id } = useParams();
  const { data, isError, error, isFetching } = useFetchSingleWorkflow({
    id: +(id as unknown as string),
  });

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
              <Skeleton active loading={isFetching} paragraph={{ rows: 40 }}>
                {data && !isError ? (
                  <DisplayEditWorkflowForm data={data} />
                ) : (
                  <div className="flex items-center justify-center">
                    {" "}
                    {error?.message}
                  </div>
                )}
              </Skeleton>
            </div>
          </div>
        }
      </div>
    </>
  );
};

const DisplayEditWorkflowForm = ({ data }: { data: TSingleWorkflow }) => {
  if (data.type === "advanced") {
    return <EditAdvancedWorkflow data={data} />;
  }
  return <EditBasicWorkflow data={data} />;
};

export default EditWorkflow;
