import React from "react";
import { useGetSingleProject } from "../hooks/useGetSingleProject";
import { useParams } from "react-router-dom";
import { appRoutes } from "config/router/paths";
import { PageIntro } from "components/layout/PageIntro";
import { ProjectDetailsContainer } from "../components/ProjectDetailsContainer";
import { Skeleton } from "antd";
import { ErrorWrapper } from "components/errorHandlers/ErrorWrapper";

const SingleProjectPage = () => {
  const params = useParams();
  const projectId = +(params.id as string);
  const { data, isFetching, isError } = useGetSingleProject({
    id: projectId,
  });
  return (
    <div>
      <div className="Container flex flex-col gap-4">
        <Skeleton loading={isFetching} paragraph={{ rows: 27 }}>
          <ErrorWrapper
            isError={isError}
            backLink={appRoutes.projectSettings}
            message="Project not found!"
          >
            <PageIntro
              title={data?.name ?? "Project Not Found"}
              link={appRoutes.projectSettings}
            />
            <ProjectDetailsContainer project={data} />
          </ErrorWrapper>
        </Skeleton>
      </div>
    </div>
  );
};

export default SingleProjectPage;
