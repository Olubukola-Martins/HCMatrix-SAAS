import React, { useState } from "react";
import { TSingleProject } from "../types";
import { ProjectOverview } from "./ProjectOverview";
import { ProjectMembersTableContainer } from "./management/ProjectMembersTableContainer";
import dayjs from "dayjs";
import { EditProject } from "./EditProject";
import { AddMemberToProject } from "./management/AddMemberToProject";
import DeleteProject from "./DeleteProject";

interface IProps {
  project?: TSingleProject;
}

type TAction = "add-member" | "edit-project" | "delete-project";
export const ProjectDetailsContainer: React.FC<IProps> = ({ project }) => {
  const [action, setAction] = useState<TAction>();
  const handleAction = (props: { action: TAction }) => {
    const { action } = props;
    setAction(action);
  };
  const clearAction = () => {
    setAction(undefined);
  };
  return (
    <>
      {project && (
        <EditProject
          open={action === "edit-project"}
          project={project}
          handleClose={clearAction}
        />
      )}
      {project && (
        <DeleteProject
          open={action === "delete-project"}
          project={project}
          handleClose={clearAction}
        />
      )}
      {project && (
        <AddMemberToProject
          open={action === "add-member"}
          project={project}
          handleClose={clearAction}
        />
      )}
      <div className="flex flex-col gap-4">
        <ProjectOverview
          {...{
            data: {
              startDate: dayjs(project?.startDate).format("YYYY-MM-DD"),
              endDate: dayjs(project?.endDate).format("YYYY-MM-DD"),
              createdAt: dayjs(project?.createdAt).format("YYYY-MM-DD"),
              updatedAt: dayjs(project?.updatedAt).format("YYYY-MM-DD"),
              description: project?.description,
              status: project?.status,
            },
            handleAddMember: () => handleAction({ action: "add-member" }),
            handleEdit: () => handleAction({ action: "edit-project" }),
            handleDelete: () => handleAction({ action: "delete-project" }),
          }}
        />
        <ProjectMembersTableContainer projectId={project?.id} />
      </div>
    </>
  );
};
