import React, { useState } from "react";
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
import Themes from "../../Themes/Themes";
import Menu from "@mui/material/Menu";

// import { motion } from "framer-motion";
import { settingNavItems } from "../../Settings/Data";
import PendingItem from "../Components/PendingItem";
import CustomizeDashboardModal from "../Components/CustomizeDashboardModal";

const Home = () => {
  const [openId, setOpenId] = useState("");

  const handlePendingClick = (val) => {
    setOpenId((preVal) => (preVal === val ? "" : val));
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openCustomModal, setOpenCustomModal] = useState(false);

  return (
    <DashboardLayout>
      <div className="Container pb-20 mt-4">
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center mt-5">
              <Link to="#!" className="dashboardLink">
                <span className="text-caramel font-semibold text-lg">View</span>
                <h6 className="text-xs font-semibold">Company Handbook</h6>
              </Link>
              <Link to="/company-organogram" className="dashboardLink">
                <span className="text-caramel font-semibold text-lg">View</span>
                <h6 className="text-xs font-semibold">Company organogram</h6>
              </Link>
              <Link to="#!" className="dashboardLink">
                <span className="text-caramel font-semibold text-lg">View</span>
                <h6 className="text-xs font-semibold">Personal Information</h6>
              </Link>
              <button
                className="dashboardLink"
                onClick={() => setOpenCustomModal(true)}
              >
                <span className="text-caramel font-semibold text-lg">
                  Customize
                </span>
                <h6 className="text-xs font-semibold">My dashboard</h6>
              </button>
              <CustomizeDashboardModal
                open={openCustomModal}
                handleClose={() => setOpenCustomModal(false)}
              />
            </div>
          </div>
          <div className="bg-card rounded-xl px-5 py-4 text-accent w-full">
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
              {/* <PendingItem
                handleClick={handlePendingClick}
                openId={openId}
                item={{
                  title: "Module Setup",
                  category: "advanced",
                  items: [
                    { name: "Payroll", link: "/settings/company-details" },
                    { name: "Performance", link: "/settings/domains" },
                    { name: "Recruitment", link: "/settings/rebranding" },
                    { name: "Attendance", link: "/settings/from-addresses" },
                  ],
                }}
              /> */}

              <div className="grid grid-cols-2 gap-x-2 gap-y-3 text-xs font-medium mt-3">
                {/* below pending setup */}

                <div className="flex items-center gap-3 cursor-pointer">
                  <i className="ri-settings-2-line text-2xl"></i>
                  <span className="text-caramel">More Settings</span>
                </div>
                <div className="flex items-center gap-3 cursor-pointer">
                  <i className="ri-movie-line text-2xl"></i>
                  <span className="text-caramel">Video Guide</span>
                </div>
                <div className="flex items-center gap-3 cursor-pointer">
                  <i className="ri-layout-grid-line text-2xl"></i>
                  <span className="text-caramel">Set-up Guide</span>
                </div>

                <div className="flex items-center gap-3 cursor-pointer">
                  <i className="ri-customer-service-2-line text-2xl"></i>
                  <span className="text-caramel" onClick={handleClick}>
                    Contact Support
                  </span>
                </div>
                {/* below pending setup */}

                {/* Contact Support menu */}
                <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                  <Themes>
                    <div className="bg-card w-38 px-3 text-xs py-1 text-accent">
                      <h5 className="cursor-pointer group">
                        <i className="ri-whatsapp-fill text-base text-green-500 block"></i>
                        <span className="group-hover:text-caramel">
                          WhatsApp support
                        </span>
                      </h5>

                      <h5 className="my-2 cursor-pointer group">
                        <i className="ri-phone-line text-base block"></i>
                        <a
                          href="tel: +1 (254) 244-0305"
                          className="group-hover:text-caramel"
                        >
                          +1 (254) 244-0305
                        </a>
                      </h5>

                      <h5 className="my-1 cursor-pointer group">
                        <i className="ri-mail-line text-base block"></i>
                        <a
                          href="mailto: support@hcmatrix.com"
                          className="group-hover:text-caramel"
                        >
                          support@hcmatrix.com
                        </a>
                      </h5>
                    </div>
                  </Themes>
                </Menu>
              </div>
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
          <HomeCard
            title="Open Tasks"
            image={task}
            desc="No record found"
            subTitle="0 out of 0 results"
          />

          <HomeCard
            title="Work anniversary"
            image={birthDay}
            desc="No work anniversary today"
          />
          <HomeCard
            title="Goals & objectives"
            image={goals}
            desc="You don't have active goals"
            subTitle="0 out of 0 results"
          />
          <HomeCard
            title="Upcoming holidays"
            image={holiday}
            desc="No record found"
            subTitle="0 out of 0 results"
          />
          <HomeCard
            title="Interviews"
            image={interviews}
            desc="No interviews Scheduled"
          />
          <HomeCard
            title="Timesheets"
            image={timesheets}
            desc="No record found"
            subTitle="0 out of 0 results"
          />
          <HomeCard
            title="Attendance"
            image={attendance}
            desc="No record found"
            subTitle="0 out of 0 results"
          />
          <HomeCard title="Files" image={files} desc="No files found" />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
