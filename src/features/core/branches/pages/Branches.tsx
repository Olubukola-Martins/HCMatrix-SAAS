import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import { useState } from "react";
import BranchesViewContainer from "../components/BranchesViewContainer";
import PageSubHeader from "components/layout/PageSubHeader";
import { SaveBranch } from "../components/SaveBranch";
import { TCreateBranchProps } from "../types";
import { useCreateBranch } from "../hooks/useCreateBranch";
import { openNotification } from "utils/notifications";
import { QUERY_KEY_FOR_BRANCHES } from "../hooks/useFetchBranches";
import { useQueryClient } from "react-query";
import { ImportBranch } from "../components/ImportBranch";

type TAction = "import" | "add";

const Branches = () => {
  const queryClient = useQueryClient();

  const [action, setAction] = useState<TAction>();
  const { mutate, isLoading, isSuccess } = useCreateBranch();
  const handleAddBranch = (data: TCreateBranchProps) => {
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
            queryKey: [QUERY_KEY_FOR_BRANCHES],
            // exact: true,
          });
        },
      }
    );
  };

  return (
    <>
      <SaveBranch
        open={action === "add"}
        action="add"
        title="Add Branch"
        onSubmit={{ fn: handleAddBranch, isLoading, isSuccess }}
        handleClose={() => setAction(undefined)}
      />
      <ImportBranch
        open={action === "import"}
        handleClose={() => setAction(undefined)}
      />

      <div className="Container">
        {
          <div className="mt-4">
            <PageIntro title="Branches" link={appRoutes.settings} />

            <PageSubHeader
              description="Manage all the branches in your organization."
              actions={[
                { name: "Add Branch", handleClick: () => setAction("add") },
                {
                  name: "Bulk Import",
                  handleClick: () => setAction("import"),
                  btnVariant: "transparent",
                },
              ]}
            />

            <BranchesViewContainer />
          </div>
        }
      </div>
    </>
  );
};

export default Branches;
