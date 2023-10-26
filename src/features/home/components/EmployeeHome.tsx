import { Link } from "react-router-dom";
import Onboarding from "features/self-service/assets/images/Onboarding.svg";
import loan from "features/self-service/assets/images/loan.svg";
import leave from "features/self-service/assets/images/leave.svg";
import health from "features/self-service/assets/images/health.svg";
import payslip from "features/self-service/assets/images/payslip.svg";
import SelfBox from "features/self-service/components/SelfBox";
import { Celebrations } from "./Celebrations";
import { appRoutes } from "config/router/paths";
import { TEmployee } from "features/core/employees/types";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";
import { SelfBoxListContainer } from "features/self-service/pages/SelfServiceHome";
import MyRecentRequestsCard from "./cards/MyRecentRequestsCard";
import moment from "moment";
import LiveClock from "components/clock/LiveClock";
import ClockInOrOut from "./ClockInOrOut";

export const EmployeeHome: React.FC<{
  employee?: Pick<
    TEmployee,
    | "id"
    | "email"
    | "empUid"
    | "firstName"
    | "lastName"
    | "personalInformation"
    | "jobInformation"
    | "designation"
  >;
}> = ({ employee }) => {
  return (
    <>
      <div className="Container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-5">
          <div className="col-span-2">
            <div className="bg-mainBg shadow border rounded-md px-5 pt-4 pb-6">
              <h5 className="font-semibold text-accent text-lg">
                Welcome {getEmployeeFullName(employee)} 🖐
              </h5>
              <div className="flex items-center gap-3 mt-3">
                <span className="flex items-center gap-2 text-xs text-accent">
                  <i className="ri-calendar-todo-line"></i>
                  <span>{moment().format("DD MMMM YYYY")}</span>
                </span>
                <span className="flex items-center gap-2 text-xs text-green-700">
                  <i className="ri-time-line"></i>
                  <span>
                    <LiveClock format="HH:mm:ss" />
                  </span>
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-2">
                <div>
                  <ul className="flex flex-col gap-2 text-xs text-accent">
                    <li>ID Number: {employee?.empUid}</li>
                    <li>
                      Line manager:{" "}
                      {getEmployeeFullName(
                        employee?.jobInformation?.lineManager
                      )}
                    </li>
                    <li>
                      Designation:{" "}
                      <span className="capitalize">
                        {employee?.designation?.name}
                      </span>
                    </li>
                    <li>Email: {employee?.email}</li>
                    <li>Phone: {employee?.personalInformation?.phoneNumber}</li>
                  </ul>

                  <div className="mt-6 pb-2">
                    <Link
                      to={appRoutes.userProfileSettings}
                      className="transparentButton text-caramel "
                    >
                      View profile
                    </Link>
                  </div>
                </div>
                <div className="">
                  <img
                    src="https://res.cloudinary.com/ddvaelej7/image/upload/v1667472471/welcome1_yu9jto.svg"
                    alt="employee"
                    className="md:-mt-16"
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 text-center mt-5">
              <Link to="#!" className="dashboardLink shadow border">
                <span className="text-caramel font-semibold text-lg">
                  Download
                </span>
                <h6 className="text-xs font-semibold">Company Handbook</h6>
              </Link>
              <Link
                to={appRoutes.companyOrganogram}
                className="dashboardLink shadow border"
              >
                <span className="text-caramel font-semibold text-lg">View</span>
                <h6 className="text-xs font-semibold">Company organogram</h6>
              </Link>
              <div className="dashboardLink shadow border px-2">
                <p className="font-semibold text-left pb-1">
                  Assets Held by You
                </p>
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">0</h2>
                  <Link
                    to={appRoutes.selfServiceAssets}
                    className="underline text-caramel text-sm"
                  >
                    View {">"}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <ClockInOrOut />
            <MyRecentRequestsCard />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
          <div className="col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <SelfBoxListContainer />
            </div>
          </div>

          <div>
            <div className="shadow px-2 py-3 rounded border">
              <Celebrations />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
