import { useState } from "react";
import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import { useFetchSingleEmployee } from "../../hooks/useFetchSingleEmployee";
import { EditMyProfile } from "./EditMyProfile";
import { Resignation } from "./Resignation";
import { EmployeeOverviewCard } from "./EmployeeOverviewCard";
import { getEmployeeFullName } from "../../utils/getEmployeeFullName";
import { EmployeeTabs } from "./EmployeeTabs";
import { ErrorWrapper } from "components/errorHandlers/ErrorWrapper";

export const EmployeeProfileContainer = ({
  employeeId,
}: {
  employeeId: number;
}) => {
  // TO DO: ADD a 404 or errr boundary when employee exists
  const {
    data: employee,
    isFetching,
    isError,
  } = useFetchSingleEmployee({
    employeeId: employeeId ? +employeeId : 0,
  });
  const [action, setAction] = useState<
    "edit-user" | "resign-user" | "suspend-user" | "activate-user"
  >();
  const clearAction = () => {
    setAction(undefined);
  };

  return (
    <>
      <div className="Container mt-3">
        <PageIntro title="Employee Profile" link={appRoutes.employeeSettings} />
        <ErrorWrapper isError={isError} backLink={appRoutes.employeeSettings}>
          <div>
            <EditMyProfile
              open={action === "edit-user"}
              employee={employee}
              handleClose={clearAction}
            />
            <Resignation
              open={action === "resign-user"}
              handleClose={clearAction}
            />
            <div className="bg-card p-1 md:p-5 mt-5  flex flex-col gap-5">
              <EmployeeOverviewCard
                {...{
                  data: {
                    fullName: getEmployeeFullName(employee),
                    designation: employee?.designation?.name,
                    department: employee?.designation?.department.name,
                    empuid: employee?.empUid,
                    email: employee?.email,
                    phone: employee?.personalInformation?.phoneNumber,
                    address:
                      employee?.personalInformation?.address?.streetAddress,
                    avatarUrl: employee?.avatarUrl,
                    role: employee?.role?.name,
                  },
                  isLoading: isFetching,
                  handleEdit: () => {
                    setAction("edit-user");
                  },
                  handleResignation: () => {
                    setAction("resign-user");
                  },
                  handleSuspension: () => {
                    setAction("suspend-user");
                  },
                  handleActivate: () => {
                    setAction("activate-user");
                  },
                }}
              />
              <EmployeeTabs isLoading={isFetching} employee={employee} />
            </div>
          </div>
        </ErrorWrapper>
      </div>
    </>
  );
};
