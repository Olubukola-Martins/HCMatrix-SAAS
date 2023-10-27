import { Tabs } from "antd";
import { useContext, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { Link } from "react-router-dom";
import "../style/style.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { IAuthDets } from "features/authentication/types";
import { useFetchEmployees } from "features/core/employees/hooks/useFetchEmployees";
import { settingNavItems } from "features/settings/constants/settingNavItems";
import { GlobalContext, EGlobalOps } from "stateManagers/GlobalContextProvider";
import { pluralOrSingular } from "utils/dataHelpers/pluralOrSingular";
import EmployeeInfoChart from "features/core/employees/components/EmployeeInfoChart";
import { Celebrations } from "./Celebrations";
import { PendingItem } from "./PendingItem";
import { appRoutes } from "config/router/paths";
import { DoughnutChart } from "components/charts/DoughnutChart";
import { LeaveWhoIsOut } from "./whoIsOut/LeaveWhoIsOut";
import { RemoteWhoIsOut } from "./whoIsOut/RemoteWhoIsOut";

export const AdminHome = () => {
  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;

  const token = authDetails.userToken;
  const user = authDetails?.user;
  const [openId, setOpenId] = useState("");

  const handlePendingClick = (val: string) => {
    setOpenId((preVal) => (preVal === val ? "" : val));
  };

  ChartJS.register(ArcElement, Tooltip, Legend);

  const data = {
    // labels: ["Male", "Female", "Other"],
    datasets: [
      {
        label: "# of Votes",
        data: [10, 20, 3],
        backgroundColor: ["#01966B", "#F97316", "#ccc"],
        borderColor: ["#01966B", "#F97316", "#ccc"],
        borderWidth: 1,
        height: 5,
      },
    ],

    maintainAspectRatio: false,
  };
  const globalCtx = useContext(GlobalContext);
  const { isSuccess: isEmpSuccess, data: empData } = useFetchEmployees({
    pagination: {
      limit: 100, //temp suppose to allow search
      offset: 0,
    },
  });
  const { dispatch: globalDispatch } = globalCtx;
  const handleGetStarted = () => {
    globalDispatch({ type: EGlobalOps.setShowInitialSetup, payload: true });
  };
  return (
    <>
      <div className="Container">
        <div className="flex items-center justify-between mt-2">
          <h1 className="text-xl md:text-2xl font-black">
            Welcome {user.fullName} ,
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5 mt-6">
          <div className="md:col-span-3">
            <div className="shadow rounded-lg p-3">
              <div className="flex items-center justify-between">
                <h4 className="text-base text-gray-500">Total Employee</h4>
                <h2 className="font-semibold text-base md:text-lg">
                  {isEmpSuccess &&
                    `${pluralOrSingular({
                      amount: empData.total,
                      singular: "employee",
                      plural: "employees",
                    })}`}
                </h2>
              </div>
              <div className="flex justify-center">
                <div
                  style={{ height: "200px", width: "200px" }}
                  className="mt-4 mb-5"
                >
                  <DoughnutChart
                    data={[200, 400, 500]}
                    labels={[]}
                    dataEntityLabel="Employees"
                    bgColors={["#01966B", "#F97316", "#ccc"]}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <button className="transparentButton flex items-center gap-2">
                  <div className="rounded-full h-3 w-3 bg-green-700" />
                  <span>{Math.floor((10 / 33) * 100)}% Male</span>
                </button>
                <button className="transparentButton flex items-center gap-2">
                  <div
                    className="rounded-full h-3 w-3"
                    style={{ background: "#F97316" }}
                  />
                  <span>{Math.floor((20 / 33) * 100)}% Female</span>
                </button>
                <button className="transparentButton flex items-center gap-2">
                  <div className="rounded-full h-3 w-3 bg-gray-400" />
                  <span>{Math.floor((3 / 33) * 100)}% Other</span>
                </button>
              </div>
            </div>
          </div>
          <div className="md:col-span-1">
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
          <div className="bg-card rounded-lg md:col-span-2 p-3 text-accent w-full">
            <h5 className="font-semibold">Pending Setup</h5>
            <div className="flex flex-col gap-5 text-sm mt-4">
              {settingNavItems
                .filter((item) => item.category === "basic")
                .map((item) => (
                  <PendingItem
                    key={item.title}
                    handleClick={handlePendingClick}
                    openId={openId}
                    item={item}
                  />
                ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 mt-7 gap-y-7 gap-x-5">
          <div className="col-span-2 bg-mainBg shadow border rounded-lg p-3 relative h-80">
            <div className="absolute top-36 left-0">
              <button
                className="button flex gap-2 align-center"
                onClick={handleGetStarted}
              >
                <i className="ri-checkbox-circle-fill" />
                <span>Get Started</span>
              </button>
            </div>
            <EmployeeInfoChart />
          </div>
          <div className="flex flex-col gap-6">
            <div className="bg-mainBg shadow border rounded-lg p-3 font-medium">
              <h5 className="">Assets Held by You</h5>
              <div className="flex items-center justify-between mt-2">
                <span>0</span>
                <Link to="/" className="text-caramel">
                  View {">"}
                </Link>
              </div>
            </div>
            <div className="bg-mainBg shadow border rounded-lg p-3 flex-1">
              <h3 className="text-base font-medium pb-2">Pending Approval</h3>
              <hr />
              <p className="text-center py-5 text-gray-500">
                You have No Pending <br /> Approval
              </p>
            </div>
          </div>

          <div className="col-span-2 bg-mainBg shadow border rounded-lg p-3">
            <h3 className="text-base">Who is out?</h3>

            <Tabs
              defaultActiveKey="1"
              items={[
                {
                  key: "1",
                  label: "Leave (0)",
                  children: <LeaveWhoIsOut />,
                },
                {
                  key: "2",
                  label: "Remote Work (0)",
                  children: <RemoteWhoIsOut />,
                },
              ]}
            />
          </div>
          <div className="bg-mainBg shadow border rounded-lg p-3">
            <Celebrations />
          </div>
        </div>
      </div>
    </>
  );
};
