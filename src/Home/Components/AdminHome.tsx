import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";
import HomeCard from "../Components/HomeCard";
import birthDay from "../Assets/Images/birthday.svg";
import task from "../Assets/Images/task.svg";
import goals from "../Assets/Images/goals.svg";
import holiday from "../Assets/Images/holiday.svg";
import interviews from "../Assets/Images/interviews.svg";
import timesheets from "../Assets/Images/timesheets.svg";
import attendance from "../Assets/Images/attendance.svg";
import files from "../Assets/Images/files.svg";
import { settingNavItems } from "../../Settings/Data";
import PendingItem from "../Components/PendingItem";
import { Dropdown } from "antd";
// import CustomizeDashboardModal from "../Components/CustomizeDashboardModal";

export const AdminHome = () => {
  const [openId, setOpenId] = useState("");
  // const [openCustomModal, setOpenCustomModal] = useState(false);
  const handlePendingClick = (val: string) => {
    setOpenId((preVal) => (preVal === val ? "" : val));
  };

  return (
    <DashboardLayout>
      <div className="Container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-2">
          <div className="bg-card col-span-2 rounded-xl px-5 py-4">
            <h5 className="font-semibold text-accent">
              Welcome Jaleel Habibah 🖐
            </h5>
            <div className="flex items-center gap-3 mt-2">
              <span className="flex items-center gap-2 text-xs text-accent">
                <i className="ri-calendar-todo-line"></i>
                <span>Feb 15, 2022</span>
              </span>
              <span className="flex items-center gap-2 text-xs text-green-700">
                <i className="ri-time-line"></i>
                <span>12:14:59 PM</span>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
              <div>
                <h1 className="text-xl md:text-2xl font-black pb-4">
                  Jaleel Habibah
                </h1>
                <ul className="flex flex-col gap-2 text-xs text-accent">
                  <li>Line manager: Godswill Laser</li>
                  <li>Email: Gworld@gmail.com</li>
                  <li>phone: +1-9034-463- 80</li>
                  <li>location: Houston, TX</li>
                </ul>
                <p className="text-xs pt-7 leading-5 text-accent text-justify">
                  As ultra influential young entrepreneur - Shelby Leimgruber
                  has succeeded in multiple business facets. From worldwide
                  travel and modeling to negotiating brand deals with high net
                  worth clientele. After
                </p>
              </div>
              <div className="flex justify-center">
                <img
                  src="https://res.cloudinary.com/ddvaelej7/image/upload/v1655827312/samples/Image_r0ikln.png"
                  alt="user"
                />
              </div>
            </div>
          
          </div>
          <div className="bg-card rounded-xl px-5 py-4 text-accent">
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
        {/* HOME CARD */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          <HomeCard
            title="Birthdays"
            image={birthDay}
            desc="No Birthday today"
          />
        </div>
      </div>
    </DashboardLayout>
  );
};
