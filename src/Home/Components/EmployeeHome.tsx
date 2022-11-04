import React from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";
import SelfBox from "../../Self_Service/Components/SelfBox";
import Onboarding from "../../Self_Service/Assets/Images/Onboarding.svg";
import loan from "../../Self_Service/Assets/Images/loan.svg";
import leave from "../../Self_Service/Assets/Images/leave.svg";
import health from "../../Self_Service/Assets/Images/health.svg";
import payslip from "../../Self_Service/Assets/Images/payslip.svg";
import attendance from "../../Self_Service/Assets/Images/attendance.svg";
import vehicle from "../../Self_Service/Assets/Images/vehicle.svg";
import requisition from "../../Self_Service/Assets/Images/requisition.svg";
import { Tabs } from "antd";
import { Birthdays } from "./Celebrations/Birthdays";
import { WorkAnniversary } from "./Celebrations/WorkAnniversary";
import { Holidays } from "./Celebrations/Holidays";

export const EmployeeHome = () => {
  return (
    <DashboardLayout>
      <div className="Container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-5">
          <div className="col-span-2">
            <div className="bg-mainBg shadow border rounded-md px-5 pt-4 pb-6">
              <h5 className="font-semibold text-accent text-lg">
                Welcome Godswill Smile 🖐
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
                    <li>Line manager: 000000</li>
                    <li>Email: Gworld@gmail.com</li>
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
                    View {'>'}
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
              <SelfBox title="Onboarding" icon={Onboarding} link="onboarding" />
              <SelfBox title="Loan" icon={loan} link="loan" />
              <SelfBox title="Leave" icon={leave} link="leave" />
              <SelfBox title="Health access" icon={health} link="#" />
              <SelfBox title="My Payslip" icon={payslip} link="#" />
              <div className="bg-card p-2 rounded-lg shadow cursor-pointer group text-accent">
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
              </div>
            </div>
          </div>

          <div className="shadow px-2 py-3 rounded border">
            <h3 className="pb-1 font-medium">Celebrations & Holidays</h3>
            <Tabs defaultActiveKey="1">
              <Tabs.TabPane tab="Birthdays" key="1">
                <Birthdays />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Work Anniversaries" key="2">
                <WorkAnniversary />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Holidays" key="3">
                <Holidays />
              </Tabs.TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
