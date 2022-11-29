import { Tabs } from "antd";
import { useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { Link } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";
import { settingNavItems } from "../../Settings/Data";
import { Celebrations } from "./Celebrations/Celebrations";
import PendingItem from "./PendingItem";

export const AdminHome2 = () => {
  const auth = useAuthUser();
  const authDetails = auth();
  const user = authDetails?.user;
  const [openId, setOpenId] = useState("");
  const handlePendingClick = (val: string) => {
    setOpenId((preVal) => (preVal === val ? "" : val));
  };

  return (
    <DashboardLayout>
      <div className="Container">
        <div className="flex items-center justify-between mt-2">
          <h1 className="text-xl md:text-2xl font-black">
            Welcome {user.fullName}
          </h1>
          <button className="transparentButton">Upload Handbook</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5 mt-6">
          <div className="md:col-span-3 shadow rounded-lg p-3">
            <div className="flex items-center justify-between">
              <h4 className="text-base text-gray-500">Total Employee</h4>
              <h2 className="font-semibold text-base md:text-lg">400 People</h2>
            </div>
            <div className="py-16">Round graph here</div>
            <div className="flex items-center justify-between">
              <button className="transparentButton flex items-center gap-2">
                <div className="rounded-full h-3 w-3 bg-green-700" />
                <span>82% Male</span>
              </button>
              <button className="transparentButton flex items-center gap-2">
                <div className="rounded-full h-3 w-3 bg-orange-500" />
                <span>16% Female</span>
              </button>
              <button className="transparentButton flex items-center gap-2">
                <div className="rounded-full h-3 w-3 bg-gray-400" />
                <span>0% Other</span>
              </button>
            </div>
          </div>
          <div className="border shadow rounded-lg p-3 md:col-span-1 flex flex-col gap-3 text-center">
            <h3 className="text-base text-gray-500">Attendance</h3>
            <span className="font-medium text-xl">0</span>
            <hr />
            <h3 className="text-base text-gray-500">Late</h3>
            <span className="font-medium text-xl">0</span>
            <hr />
            <h3 className="text-base text-gray-500">Absent</h3>
            <span className="font-medium text-xl">0</span>
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
          <div className="col-span-2">Graph</div>
          <div>
            <div className="bg-mainBg shadow border rounded-lg p-3 mb-6 font-medium">
              <h5 className="">Assets Held by You</h5>
              <div className="flex items-center justify-between mt-2">
                <span>0</span>
                <Link to="/" className="text-caramel">
                  View {">"}
                </Link>
              </div>
            </div>
            <div className="bg-mainBg shadow border rounded-lg p-3">
              <h3 className="text-base font-medium pb-2">Pending Approval</h3>
              <hr />
              <p className="text-center py-5 text-gray-500">
                You have No Pending <br /> Approval
              </p>
            </div>
          </div>
          <div className="col-span-2 bg-mainBg shadow border rounded-lg p-3">
            <h3 className="text-base">Who is out?</h3>

            <Tabs defaultActiveKey="1">
              <Tabs.TabPane tab="Leave (0)" key="1">
                <h4>No One is Currently on Leave</h4>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Remote Work (0)" key="2">
                <h4>No Remote Worker</h4>
              </Tabs.TabPane>
            </Tabs>
          </div>
          <div className="bg-mainBg shadow border rounded-lg p-3">
            <Celebrations />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
