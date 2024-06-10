import { Affix, Skeleton, Tabs } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../style/style.css";
// import { settingNavItems } from "features/settings/constants/settingNavItems";
import { EGlobalOps } from "stateManagers/GlobalContextProvider";
import { pluralOrSingular } from "utils/dataHelpers/pluralOrSingular";
import EmployeeInfoChart from "features/core/employees/components/EmployeeInfoChart";
import { Celebrations } from "./Celebrations";
// import { PendingItem } from "./PendingItem";
import { DoughnutChart } from "components/charts/DoughnutChart";
import { LeaveWhoIsOut } from "./whoIsOut/LeaveWhoIsOut";
import { RemoteWhoIsOut } from "./whoIsOut/RemoteWhoIsOut";
import { useGetCompanyOwnerDashboard } from "features/core/company/hooks/dashboard/useGetCompanyOwnerDashboard";
import ErrorBoundary from "components/errorHandlers/ErrorBoundary";
import { ErrorWrapper } from "components/errorHandlers/ErrorWrapper";
import dayjs, {Dayjs} from "dayjs";
import { appRoutes } from "config/router/paths";
import RecentApprovalRequestsCard from "features/core/workflows/components/approval-request/RecentApprovalRequestsCard";
import { useApiAuth } from "hooks/useApiAuth";
import { TAuthUser } from "features/authentication/types";
import { useGetStartedAnalytics } from "features/core/company/hooks/dashboard/useGetStartedAnalytics";
import {
  DEFAULT_ROLES_CREATED_BY_SYSTEM,
  DEFAULT_DEPARTMENTS_CREATED_BY_SYSTEM,
  DEFAULT_DESIGNATIONS_CREATED_BY_SYSTEM,
  DEFAULT_EMPLOYEES_CREATED_BY_SYSTEM,
} from "constants/general";

export const AdminHome: React.FC<{ user?: TAuthUser["user"] }> = ({ user }) => {
  const { globalDispatch } = useApiAuth();

  const handleGetStarted = () => {
    globalDispatch({ type: EGlobalOps.setShowInitialSetup, payload: true });
  };
  const [year, setYear] = useState<Dayjs | null>(dayjs());

  const { data, isError, isLoading, error } = useGetCompanyOwnerDashboard({
    year: year?.format("YYYY"),
  });

  return (
    <ErrorBoundary>
      <Skeleton loading={isLoading} active paragraph={{ rows: 45 }}>
        <ErrorWrapper
          isError={isError}
          message={
            error?.response.data.message ?? error?.response.data.error.message
          }
        >
          <>
            <div className="Container">
              <div className="flex items-center justify-between mt-2">
                <h1 className="text-xl md:text-2xl font-black">
                  Welcome {user?.fullName} ,
                </h1>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5 mt-6">
                <div className="md:col-span-4">
                  <div className="shadow rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-base text-gray-500">
                        Total Employee
                      </h4>
                      <h2 className="font-semibold text-base md:text-lg">
                        {pluralOrSingular({
                          amount: data?.employee.total ?? 0,
                          singular: "employee",
                          plural: "employees",
                        })}
                      </h2>
                    </div>
                    <div className="flex justify-center">
                      <div
                        style={{ height: "200px", width: "200px" }}
                        className="mt-4 mb-5"
                      >
                        <DoughnutChart
                          data={[
                            data?.employee.male ?? 0,
                            data?.employee.female ?? 0,
                          ]}
                          labels={[]}
                          dataEntityLabel="Employees"
                          bgColors={["#01966B", "#F97316"]}
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <button className="transparentButton flex items-center gap-2">
                        <div className="rounded-full h-3 w-3 bg-[#01966B]" />
                        <span>{data?.employee.male}% Male</span>
                      </button>
                      <button className="transparentButton flex items-center gap-2">
                        <div className="rounded-full h-3 w-3 bg-[#F97316]" />
                        <span>{data?.employee.female}% Female</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <div className="border shadow rounded-lg px-3 py-9 flex flex-col gap-3 text-center">
                    <h3 className="text-base text-gray-500">Attendance</h3>
                    <span className="font-medium text-xl">0</span>
                    <hr />
                    <h3 className="text-base text-gray-500">Late</h3>
                    <span className="font-medium text-xl">0</span>
                    <hr />
                    <h3 className="text-base text-gray-500">Absent</h3>
                    <span className="font-medium text-xl">0</span>
                  </div>
                </div>
                {/* <PendingSetup
                  handlePendingClick={handlePendingClick}
                  openId={openId}
                /> */}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 mt-7 gap-y-7 gap-x-5">
                <div className="col-span-2 bg-mainBg shadow border rounded-lg p-3 relative h-80">
                  <GetStartedBtn handleGetStarted={handleGetStarted} />

                  <EmployeeInfoChart
                    setYear={setYear}
                    year={year}
                    data={data?.employeesBreakdown}
                  />
                </div>
                <div className="flex flex-col gap-6">
                  <div className="bg-mainBg shadow border rounded-lg p-3 font-medium">
                    <h5 className="">Assets Held by You</h5>
                    <div className="flex items-center justify-between mt-2">
                      <span>{data?.assets.totalCount}</span>
                      <Link
                        to={appRoutes.selfServiceAssets}
                        className="text-caramel"
                      >
                        View {">"}
                      </Link>
                    </div>
                  </div>
                  <RecentApprovalRequestsCard
                    title={`Pending Approvals (${data?.pendingApprovals?.totalCount})`}
                    requests={data?.pendingApprovals.result}
                    emptyMessage="You have No Pending Approvals"
                  />
                </div>

                <div className="col-span-2 bg-mainBg shadow border rounded-lg p-3">
                  <h3 className="text-base">Who is out today?</h3>

                  <Tabs
                    defaultActiveKey="1"
                    items={[
                      {
                        key: "1",
                        label: `Leave (${data?.outToday.leave.totalCount})`,
                        children: (
                          <LeaveWhoIsOut data={data?.outToday.leave.result} />
                        ),
                      },
                      {
                        key: "2",
                        label: `Remote Work (${data?.outToday.remoteWork.totalCount})`,
                        children: (
                          <RemoteWhoIsOut
                            data={data?.outToday.remoteWork.result}
                          />
                        ),
                      },
                    ]}
                  />
                </div>
                <div className="bg-mainBg shadow border rounded-lg p-3">
                  <Celebrations data={data?.celebrationsAndHolidays} />
                </div>
              </div>
            </div>
          </>
        </ErrorWrapper>
      </Skeleton>
    </ErrorBoundary>
  );
};

const GetStartedBtn: React.FC<{ handleGetStarted: () => void }> = ({
  handleGetStarted,
}) => {
  const {
    data: getStartedAnalytics,
    isLoading,
    isSuccess,
  } = useGetStartedAnalytics();
  // ensures get started doesnot show if all steps are completed
  if (
    isSuccess &&
    getStartedAnalytics.role > DEFAULT_ROLES_CREATED_BY_SYSTEM &&
    getStartedAnalytics.department > DEFAULT_DEPARTMENTS_CREATED_BY_SYSTEM &&
    getStartedAnalytics.designation > DEFAULT_DESIGNATIONS_CREATED_BY_SYSTEM &&
    getStartedAnalytics.employee > DEFAULT_EMPLOYEES_CREATED_BY_SYSTEM
  ) {
    return null;
  }
  return (
    <Affix offsetBottom={20}>
      <button
        className="button flex gap-2 align-center"
        onClick={handleGetStarted}
      >
        <Skeleton active paragraph={{ rows: 1 }} loading={isLoading}>
          <i className="ri-checkbox-circle-fill" />
          <span>Get Started</span>
        </Skeleton>
      </button>
    </Affix>
  );
};
// const PendingSetup: React.FC<{
//   openId: string;
//   handlePendingClick: (val: string) => void;
// }> = ({ openId, handlePendingClick }) => {
//   return (
//     <div className="bg-card rounded-lg md:col-span-2 p-3 text-accent w-full">
//       <h5 className="font-semibold">Pending Setup</h5>
//       <div className="flex flex-col gap-5 text-sm mt-4">
//         {settingNavItems
//           .filter((item) => item.category === "basic")
//           .map((item) => (
//             <PendingItem
//               key={item.title}
//               handleClick={handlePendingClick}
//               openId={openId}
//               item={item}
//             />
//           ))}
//       </div>
//     </div>
//   );
// };
