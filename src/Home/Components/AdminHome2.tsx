import React, { useState } from "react";
import { useAuthUser } from "react-auth-kit";
import DashboardLayout from "../../Layout/DashboardLayout";
import { settingNavItems } from "../../Settings/Data";
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
          <div className="md:col-span-3 shadow rounded-lg px-3 py-2">First</div>
          <div className="border shadow rounded-lg px-3 py-2 md:col-span-1">
            Second
          </div>
          <div className="bg-card rounded-lg md:col-span-2 px-3 py-2 text-accent w-full">
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
      </div>
    </DashboardLayout>
  );
};
