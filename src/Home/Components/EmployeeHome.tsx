import { Link } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";
import SelfBox from "../../Self_Service/Components/SelfBox";
import Onboarding from "../../Self_Service/Assets/Images/Onboarding.svg";
import loan from "../../Self_Service/Assets/Images/loan.svg";
import leave from "../../Self_Service/Assets/Images/leave.svg";
import health from "../../Self_Service/Assets/Images/health.svg";
import payslip from "../../Self_Service/Assets/Images/payslip.svg";
import { Celebrations } from "./Celebrations/Celebrations";

export const EmployeeHome = ({ user }: any) => {
  console.log(user);

  return (
    <DashboardLayout>
      <div className="Container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-5">
          <div className="col-span-2">
            <div className="bg-mainBg shadow border rounded-md px-5 pt-4 pb-6">
              <h5 className="font-semibold text-accent text-lg">
                Welcome {user.fullName} 🖐
              </h5>
              <div className="flex items-center gap-3 mt-3">
                <span className="flex items-center gap-2 text-xs text-accent">
                  <i className="ri-calendar-todo-line"></i>
                  <span>Feb 15, 2022</span>
                </span>
                <span className="flex items-center gap-2 text-xs text-green-700">
                  <i className="ri-time-line"></i>
                  <span>12:14:59 PM</span>
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-2">
                <div>
                  <ul className="flex flex-col gap-2 text-xs text-accent">
                    <li>ID Number: Line manager</li>
                    <li>Line manager: {user.id}</li>
                    <li>Email: {user.email}</li>
                    <li>phone: +1-9034-463- 80</li>
                  </ul>
                  <p className="text-xs mt-3 pb-5 leading-5 text-accent text-justify">
                    As ultra influential young entrepreneur - Shelby Leimgruber
                    has succeeded in multiple business facets.
                  </p>
                  <Link to="/" className="transparentButton text-caramel">
                    View profile
                  </Link>
                </div>
                <div className="">
                  <img
                    src="https://res.cloudinary.com/ddvaelej7/image/upload/v1667472471/welcome1_yu9jto.svg"
                    alt="user"
                    className="md:-mt-16"
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 text-center mt-5">
              <Link to="#!" className="dashboardLink shadow border">
                <span className="text-caramel font-semibold text-lg">View</span>
                <h6 className="text-xs font-semibold">Company Handbook</h6>
              </Link>
              <Link
                to="/company-organogram"
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
                  <Link to="/" className="underline text-caramel text-sm">
                    View {">"}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="shadow px-2 py-3 rounded mb-5 border">
              <h2 className="font-semibold pb-3">9:00 am</h2>
              <button className="button w-full">Clock - In</button>
            </div>
            <div className="shadow px-2 py-3 rounded border  flex flex-col gap-2">
              <div className="flex justify-between border-b pb-2 font-medium">
                <h3>Recent Requests </h3>
                <span>Status</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <div>
                  <h3>Recent Requests </h3>
                  <span className="text-xs">HP EliteBook</span>
                </div>
                <div>
                  <button className="px-2 py-1 border rounded text-green-600">
                    Approved
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <div>
                  <h3>Reimbursement</h3>
                  <span className="text-xs">Bolt Fare</span>
                </div>
                <div>
                  <button className="px-2 py-1 border rounded text-red-600">
                    Rejected
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <div>
                  <h3>Recent Requests </h3>
                  <span className="text-xs">Data Allowance</span>
                </div>
                <div>
                  <button className="px-2 py-1 border rounded text-yellow-400">
                    Pending
                  </button>
                </div>
              </div>
              <Link to="/" className="underline text-caramel text-center">
                View All
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
          <div className="col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <SelfBox
                title="Onboarding"
                icon={Onboarding}
                link="/self-service/onboarding"
              />
              <SelfBox title="Loan" icon={loan} link="/self-service/loan" />
              <SelfBox title="Leave" icon={leave} link="/self-service/leave" />
              <SelfBox
                title="Health access"
                icon={health}
                link="/self-service/health-access"
              />
              <SelfBox
                title="My Payslip"
                icon={payslip}
                link="/payroll/employee-payslip"
              />
              <Link
                to="/self-service/home"
                className="bg-card p-2 rounded-lg shadow cursor-pointer group text-accent"
              >
                <div className="bg-mainBg transition ease-in-out duration-300 py-2 px-3 rounded-lg  group-hover:border-b-2 group-hover:border-caramel group-hover:shadow-md">
                  <div className="flex items-center justify-between">
                    <button
                      className="transparentButton"
                      style={{ color: "var(--caramel)" }}
                    >
                      More
                    </button>
                    <i className="ri-more-fill text-lg"></i>
                  </div>
                  <p className="text-xs md:text-sm py-3">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>
              </Link>
            </div>
          </div>

          <div className="shadow px-2 py-3 rounded border">
            <Celebrations />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
