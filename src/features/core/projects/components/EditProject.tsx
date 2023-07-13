import React, { useState } from "react";
import { IModalProps } from "types";
import { TSingleProject } from "../types";
import EntityFormModal from "components/entity/EntityFormModal";
import { useUpdateProject } from "../hooks/useUpdateProject";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { Select } from "antd";
import { PROJECT_STATUS_OPTIONS } from "../constants";
import { QUERY_KEY_FOR_SINGLE_PROJECT } from "../hooks/useGetSingleProject";
import {
  generalValidationRules,
  textInputValidationRules,
} from "utils/formHelpers/validation";

interface IProps extends IModalProps {
  project: TSingleProject;
}

export const EditProject: React.FC<IProps> = ({
  open,
  handleClose,
  project,
}) => {
  const { mutate, isLoading } = useUpdateProject();
  const [resetForm, setResetForm] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const handleSubmit = (data: any) => {
    mutate(
      {
        id: project.id,
        body: {
          name: data.name,
          description: data.description,
          endDate: data.duration[1].toString(),
          startDate: data.duration[0].toString(),
          status: data.status,
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
            queryKey: [QUERY_KEY_FOR_SINGLE_PROJECT],
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
        title={`Edit project`}
        formFields={[
          {
            label: "Name",
            name: "name",
            render: { value: project.name, component: "text" },
            validationRules: textInputValidationRules,
          },
          {
            label: "Duration",
            name: "duration",
            render: {
              component: "date-range-picker",
              value: [project.startDate, project.endDate],
            },
            validationRules: generalValidationRules,
          },
          {
            label: "Status",
            name: "status",
            validationRules: generalValidationRules,

            render: {
              value: project.status,
              component: (
                <Select
                  options={PROJECT_STATUS_OPTIONS.filter(
                    (item) => item.value !== "pending"
                  )}
                />
              ),
            },
          },

          {
            label: "Description",
            name: "description",
            render: { value: project.description, component: "text-area" },
            validationRules: textInputValidationRules,
          },
        ]}
      />
    </>
  );
};
