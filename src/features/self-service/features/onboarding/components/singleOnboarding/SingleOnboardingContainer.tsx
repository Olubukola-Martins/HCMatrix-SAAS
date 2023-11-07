import React, { useState } from "react";
import { TOnboarding } from "../../types";
import { Skeleton } from "antd";
import { ResumptionInformation } from "./ResumptionInformation";
import { NewOnboardingTask } from "./NewOnboardingTask";
import OnboardingTasks from "./OnboardingTasks";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";
import PageSubHeader from "components/layout/PageSubHeader";
import {
  canUserAccessComponent,
  useGetUserPermissions,
} from "components/permission-restriction/PermissionRestrictor";
import { MarkSingleOnboardingAsCompleted } from "../MarkSingleOnboardingAsCompleted";

interface IProps {
  data?: TOnboarding;
  loading?: boolean;
}

type TAction = "new-task" | "mark-as-completed";

const SingleOnboardingContainer: React.FC<IProps> = ({ data, loading }) => {
  const [action, setAction] = useState<TAction>();
  const { userPermissions } = useGetUserPermissions();
  return (
    <>
      <NewOnboardingTask
        handleClose={() => setAction(undefined)}
        open={action === "new-task"}
        onboardingId={data?.id}
      />
      {data && (
        <MarkSingleOnboardingAsCompleted
          handleClose={() => setAction(undefined)}
          open={action === "mark-as-completed"}
          onboarding={data}
        />
      )}
      <Skeleton loading={loading} active paragraph={{ rows: 12 }}>
        <div className="flex flex-col gap-6">
          <PageSubHeader
            description={""}
            hideBackground
            actions={[
              {
                handleClick: () => setAction("mark-as-completed"),
                name: "Mark as completed",
                hidden:
                  !canUserAccessComponent({
                    requiredPermissions: ["manage-employee-onboarding"],
                    userPermissions,
                  }) && data?.status !== "completed",
              },
            ]}
          />
          <>
            <div className="bg-card px-5 py-7 rounded-md mt-7 text-accent">
              <div className="bg-mainBg rounded-md px-2 md:px-4 py-4 shadow-sm">
                <h3 className="font-semibold text-lg pb-2">
                  {getEmployeeFullName(data?.employee)}
                </h3>
                <h6 className="text-sm font-medium">
                  {data?.employee.designation?.name}
                </h6>
              </div>
              <ResumptionInformation
                handleAddTask={() => setAction("new-task")}
                handleCloseTask={() => setAction(undefined)}
                onboarding={data}
              />
            </div>
            <OnboardingTasks data={data?.tasks} />
          </>
        </div>
      </Skeleton>
    </>
  );
};

export default SingleOnboardingContainer;
