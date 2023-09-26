import React, { useState } from "react";
import { IModalProps } from "types";
import EntityFormModal from "components/entity/EntityFormModal";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { QUERY_KEY_FOR_EMPLOYEE_IN_PROJECT } from "../../hooks/management/useGetEmployeesInProject";
import { useAddEmployeeToProject } from "../../hooks/management/useAddEmployeeToProject";
import { TSingleProject } from "../../types";

interface IProps extends IModalProps {
  project: TSingleProject;
}

export const AddMemberToProject: React.FC<IProps> = ({
  open,
  handleClose,
  project,
}) => {
  const { mutate, isLoading } = useAddEmployeeToProject();
  const [resetForm, setResetForm] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const handleSubmit = (data: any) => {
    mutate(
      {
        projectId: project.id,
        body: {
          employeeId: data.employeeId,
        },
      },
      {
        onError: (err: any) => {
          openNotification({
            state: "error",
            title: "Error Occurred",
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

          setResetForm(true);
          handleClose();
        },
      }
    );
  };
  return (
    <>
      <EntityFormModal
        resetForm={resetForm}
        handleSubmit={handleSubmit}
        loading={isLoading}
        open={open}
        handleClose={handleClose}
        title={`Add member to ${project.name} project`}
        formFields={[
          {
            label: "Employee",
            name: "employeeId",

            render: {
              component: "employee-form-input",
            },
          },
        ]}
      />
    </>
  );
};
