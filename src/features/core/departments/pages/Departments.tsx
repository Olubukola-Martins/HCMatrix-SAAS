import { PageIntro } from "components/layout/PageIntro";
import PageSubHeader from "components/layout/PageSubHeader";
import { appRoutes } from "config/router/paths";
import { useState } from "react";
import DepartmentsViewContainer from "../components/DepartmentsViewContainer";
import { SaveDepartment } from "../components/SaveDepartment";
import { TCreateDepProps } from "../types";
import { ImportDepartment } from "../components/ImportDepartment";
import { QUERY_KEY_FOR_DEPARTMENTS } from "../hooks/useFetchDepartments";
import { openNotification } from "utils/notifications";
import { useCreateDepartment } from "../hooks/useCreateDepartment";
import { useQueryClient } from "react-query";

type TAction = "import" | "add";

const Departments = () => {
  const queryClient = useQueryClient();

  const [action, setAction] = useState<TAction>();
  const { mutate, isLoading, isSuccess } = useCreateDepartment();
  const handleAdd = (data: TCreateDepProps) => {
    mutate(
      {
        ...data,
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
          setAction(undefined);
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_DEPARTMENTS],
            // exact: true,
          });
        },
      }
    );
  };

  return (
    <>
      <SaveDepartment
        open={action === "add"}
        action="add"
        title="Add Department"
        onSubmit={{ fn: handleAdd, isLoading, isSuccess }}
        handleClose={() => setAction(undefined)}
      />
      <ImportDepartment
        open={action === "import"}
        handleClose={() => setAction(undefined)}
      />

      <div className="Container">
        {
          <div className="mt-4">
            <PageIntro title="Departments" link={appRoutes.settings} />

            <PageSubHeader
              description="Manage all the department details and the departments settings
            in your organization."
              actions={[
                { name: "Add Department", handleClick: () => setAction("add") },
                {
                  name: "Bulk Import",
                  handleClick: () => setAction("import"),
                  btnVariant: "transparent",
                },
              ]}
            />
            <DepartmentsViewContainer />
          </div>
        }
      </div>
    </>
  );
};

export default Departments;
