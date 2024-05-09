import { PageIntro } from "components/layout/PageIntro";
import { useState } from "react";
import DesignationsViewContainer from "../components/DesignationsViewContainer";
import { useQueryClient } from "react-query";
import { useCreateDesignation } from "../hooks/useCreateDesignation";
import { ICreateDegProps } from "../types";
import { openNotification } from "utils/notifications";
import { QUERY_KEY_FOR_DESIGNATIONS } from "../hooks/useFetchDesignations";
import { SaveDesignation } from "../components/SaveDesignation";
import { ImportDesignation } from "../components/ImportDesignation";
import PageSubHeader from "components/layout/PageSubHeader";
import { appRoutes } from "config/router/paths";

type TAction = "import" | "add";

const Designations = () => {
  const queryClient = useQueryClient();

  const [action, setAction] = useState<TAction>();
  const { mutate, isLoading, isSuccess } = useCreateDesignation();
  const handleAdd = (data: ICreateDegProps) => {
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
            queryKey: [QUERY_KEY_FOR_DESIGNATIONS],
            // exact: true,
          });
        },
      }
    );
  };

  return (
    <>
      <SaveDesignation
        open={action === "add"}
        action="add"
        title="Add Designation"
        onSubmit={{ fn: handleAdd, isLoading, isSuccess }}
        handleClose={() => setAction(undefined)}
      />
      <ImportDesignation
        open={action === "import"}
        handleClose={() => setAction(undefined)}
      />
      <div className="Container">
        {
          <div className="mt-4">
            <PageIntro title="Job Designations" link={appRoutes.settings} />

            <PageSubHeader
              description="Manage all designations in your organization."
              actions={[
                {
                  name: "Add Designation",
                  handleClick: () => setAction("add"),
                },
                {
                  name: "Bulk Import",
                  handleClick: () => setAction("import"),
                  btnVariant: "transparent",
                },
              ]}
            />
            <DesignationsViewContainer />
          </div>
        }
      </div>
    </>
  );
};

export default Designations;
