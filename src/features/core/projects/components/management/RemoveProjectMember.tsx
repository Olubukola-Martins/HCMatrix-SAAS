import React from "react";
import { IModalProps } from "types";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import DeleteEntityModal from "components/entity/DeleteEntityModal";
import { TProjectMember } from "../../types";
import { useRemoveEmployeeFromProject } from "../../hooks/management/useRemoveEmployeeFromProject";
import { QUERY_KEY_FOR_EMPLOYEE_IN_PROJECT } from "../../hooks/management/useGetEmployeesInProject";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";

interface IProps extends IModalProps {
  member: TProjectMember;
}
export const RemoveProjectMember: React.FC<IProps> = ({
  open,
  handleClose,
  member,
}) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useRemoveEmployeeFromProject();

  const handleDelete = () => {
    mutate(
      {
        managementId: member.id,
        projectId: member.projectId,
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
            queryKey: [QUERY_KEY_FOR_EMPLOYEE_IN_PROJECT],
            // exact: true,
          });
          handleClose();
        },
      }
    );
  };
  return (
    <DeleteEntityModal
      title="Delete Project Member"
      entity={{
        type: "as project member",
        name: getEmployeeFullName(member.employee),
      }}
      handleClose={handleClose}
      open={open}
      handleDelete={{ fn: handleDelete, isLoading: isLoading }}
    />
  );
};
