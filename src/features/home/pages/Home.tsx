import { Select, Skeleton } from "antd";
import { AdminHome } from "../components/AdminHome";
import { EmployeeHome } from "../components/EmployeeHome";
import { useEffect, useLayoutEffect, useState } from "react";
import useMostRecentApiAuth from "hooks/useMostRecentApiAuth";
import ErrorBoundary from "components/errorHandlers/ErrorBoundary";
import { ErrorWrapper } from "components/errorHandlers/ErrorWrapper";

type TView = "owner" | "employee";
function Home() {
  const {
    user,
    currentCompanyEmployeeDetails: employee,
    error,
    isLoading,
    isError,
    isSuccess,
  } = useMostRecentApiAuth();
  const [view, setView] = useState<TView>("employee");
  useLayoutEffect(() => {
    setView(employee?.isOwner ? "employee" : "owner");
  }, [employee]);

  return (
    <ErrorBoundary>
      <Skeleton loading={isLoading} active paragraph={{ rows: 45 }}>
        {/* TODO: For every error wrapper, ensure to display error message from server, like below */}
        <ErrorWrapper
          isError={isError}
          message={
            error?.response.data.message ?? error?.response.data.error.message
          }
        >
          {isSuccess && (
            <div className="flex flex-col gap-4">
              <>
                {employee?.isOwner && (
                  <div className="Container flex justify-end mt-4">
                    <Select
                      options={[
                        { value: "owner", label: "Owner" },
                        { value: "employee", label: "Employee" },
                      ]}
                      size="small"
                      value={view}
                      onSelect={(val: TView) => setView(val)}
                    />
                  </div>
                )}
                {view === "owner" && <AdminHome user={user} />}
                {view === "employee" && <EmployeeHome employee={employee} />}
              </>
            </div>
          )}
        </ErrorWrapper>
      </Skeleton>
    </ErrorBoundary>
  );
}

export default Home;
