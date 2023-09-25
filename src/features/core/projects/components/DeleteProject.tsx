import React from "react";
import { IModalProps } from "types";

import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import DeleteEntityModal from "components/entity/DeleteEntityModal";
import { TSingleProject } from "../types";
import { useDeleteProject } from "../hooks/useDeleteProject";
import { QUERY_KEY_FOR_PROJECTS } from "../hooks/useGetProjects";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "config/router/paths";

interface IProps extends IModalProps {
  project: TSingleProject;
}
const DeleteProject: React.FC<IProps> = ({ open, handleClose, project }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isLoading } = useDeleteProject();

  const handleDelete = () => {
    mutate(
      {
        projectId: project.id,
      },
      {
        onError: (err: any) => {
          openNotification({
            state: "error",
            title: "Error Occurred",
            duration: 2,
            description:
              err?.response.data.message ?? err?.response.data.error.message,
          });
        },
        onSuccess: (res: any) => {
          openNotification({
            state: "success",

            title: "Success",
            description: res.data.message,
            // duration: 0.4,
          });

          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_PROJECTS],
            // exact: true,
          });
          handleClose();
          navigate(appRoutes.projectSettings);
        },
      }
    );
  };
  return (
    <DeleteEntityModal
      title="Delete Project"
      entity={{ type: "project", name: project.name }}
      handleClose={handleClose}
      open={open}
      handleDelete={{ fn: handleDelete, isLoading: isLoading }}
    />
  );
};

export default DeleteProject;
