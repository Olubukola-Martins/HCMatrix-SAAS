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
import { motion } from "framer-motion";
import { settingNavItems } from "../../Settings/Data";

const ProgressBar = ({ width }) => {
  return (
    <div className="setUp_progress2" style={{ width: "100%", marginTop: "0" }}>
      <div className="setUp_progress-bar2" style={{ width, height: "6px" }} />
    </div>
  );
};
const PendingItem = ({ handleClick, item, openId }) => {
  return (
    <div>
      <div className="cursor-pointer" onClick={() => handleClick(item.title)}>
        <span>{item.title}(1/4)</span>
        <div className="setUp_progress2 general_setup">
          <div className="setUp_progress-bar2" />
        </div>
      </div>
      <motion.div
        className={`other overflow-y-hidden flex flex-col justify-center pl-2  border-0  ${
          openId === item.title ? "border-b" : ""
        } border-slate-400`}
        initial={{ height: 0 }}
        animate={{
          height: openId === item.title ? item.items.length * 43 : "0",
        }}
      >
        {item.items.map((child) => (
          <Link
            to={child.link}
            key={child.name}
            className="item flex gap-6 text-xs mb-2 items-center"
          >
            <span>{child.name}</span>
            <ProgressBar width={"25%"} />
          </Link>
        ))}
      </motion.div>
    </div>
  );
};

const Home = () => {
  const [openId, setOpenId] = useState("");
  const handleClick = (val) => {
    setOpenId((preVal) => (preVal === val ? "" : val));
  };
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center lg:px-10 mt-5">
              <div>
                <Link to="#!" className="text-caramel font-semibold text-lg">
                  View
                </Link>
                <h6 className="text-xs font-semibold">Company Handbook</h6>
              </div>
              <div>
                <Link to="#!" className="text-caramel font-semibold text-lg">
                  View
                </Link>
                <h6 className="text-xs font-semibold">Company organogram</h6>
              </div>
              <div>
                <Link to="#!" className="text-caramel font-semibold text-lg">
                  View
                </Link>
                <h6 className="text-xs font-semibold">HMO ID Details</h6>
              </div>
              <div>
                <Link to="#!" className="text-caramel font-semibold text-lg">
                  NI34
                </Link>
                <h6 className="text-xs font-semibold">ID Number</h6>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl px-5 py-4 text-accent w-full">
            <h5 className="font-semibold">Pending Setup</h5>
            <div className="flex flex-col gap-5 text-sm mt-4">
              {settingNavItems.map((item) => (
                <PendingItem
                  key={item.title}
                  handleClick={handleClick}
                  openId={openId}
                  item={item}
                />
              ))}

              {/* <div>
              // THE TEMPLATE
                <div className = 'cursor-pointer' onClick={() => handleClick('company')}>
                  <span>General Setup(1/4)</span>
                  <div className="setUp_progress2 general_setup">
                    <div className="setUp_progress-bar2" />
                  </div>
                </div>
                <motion.div className={`other overflow-y-hidden flex flex-col justify-center pl-2 border ${ openId === 'company' ?'border-b' : ''} border-slate-400`} initial = {{height:0}} animate = {{height: openId === 'company' ?'100px' : '0'}}>
                  <div className="item flex gap-6 text-xs mb-2 items-center">
                    <span>Company</span>
                    <ProgressBar width={'25%'}/>
                  </div>
                  <div className="item flex gap-6 text-xs mb-2 items-center">
                    <span>Domain</span>
                    <ProgressBar width={'25%'}/>
                  </div>
                  <div className="item flex gap-6 text-xs mb-2 items-center">
                    <span>Rebranding</span>
                    <ProgressBar width={'25%'}/>
                  </div>

                </motion.div>
              </div> */}
              {/* <div>
                <span>Organization(1/7)</span>
                <div className="setUp_progress2 video_setup">
                  <div className="setUp_progress-bar2" />
                </div>
              </div>
              <div>
                <span>User Access Control(1/4)</span>
                <div className="setUp_progress2 user-access">
                  <div className="setUp_progress-bar2" />
                </div>
              </div>
              <div>
                <span>Data Administration(1/4)</span>
                <div className="setUp_progress2 employee-profile">
                  <div className="setUp_progress-bar2" />
                </div>
              </div>
              <div>
                <span>Automation(1/4)</span>
                <div className="setUp_progress2 video">
                  <div className="setUp_progress-bar2" />
                </div>
              </div> */}
              <div className="grid grid-cols-2 gap-x-2 gap-y-3 text-xs font-medium mt-3">
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
                  <span className="text-caramel">Contact Support</span>
                </div>
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
