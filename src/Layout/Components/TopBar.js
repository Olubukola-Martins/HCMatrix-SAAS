import React, { useState } from "react";
import logo from "../Images/logo.png";
import Popover from "@mui/material/Popover";
import sun from "../Images/sun.svg";
import { Link } from "react-router-dom";

const TopBar = ({
  switchTheme,
  theme,
  green,
  yellow,
  orange,
  blue,
  purple,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <>
      <div className="bg-caramel w-full py-2 sticky top-0 z-50">
        <div className="Container flex items-center justify-between">
          <Link to="/">  <img src={logo} alt="logo" className="md:h-10 h-7" /></Link>

          <div className="flex gap-4 items-center">
            <i className="fa-solid fa-magnifying-glass lg:hidden cursor-pointer text-base text-white"></i>
            <div className="lg:flex items-center gap-2 hidden mr-10">
              <div className="relative w-full">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  className="bg-white border border-white text-sm rounded-2xl focus:outline-none block w-full pl-10 py-1 md:pr-16 lg:pr-24 text-accent"
                  placeholder="Search..."
                />
              </div>
              <i className="ri-equalizer-fill cursor-pointer h-8 w-10 rounded-full bg-white flex items-center justify-center text-caramel"></i>
            </div>
            {theme === "light" ? (
              <i
                onClick={switchTheme}
                className="fas fa-moon text-lg cursor-pointer text-black"
                title="Dark mode"
              ></i>
            ) : (
              <img
                src={sun}
                alt="sun"
                onClick={switchTheme}
                className="cursor-pointer h-5"
                title="Light mode"
              />
            )}

            <i
              onClick={handleClick}
              className="ri-settings-3-line text-xl text-white cursor-pointer"
              title="Settings"
            ></i>
            <i
              className="ri-notification-3-line text-xl cursor-pointer text-white"
              title="Notifications"
            ></i>
            <img
              src="https://res.cloudinary.com/ddvaelej7/image/upload/v1655735373/samples/Ellipse_4_j0womm.png"
              alt=""
              className="h-6 md:h-8"
            />
          </div>
        </div>
      </div>
      {/* settings popup */}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <div className="flex items-center gap-4 py-9 px-2 rounded">
          <div
            className="h-4 w-4 rounded-full cursor-pointer"
            style={{ background: "#ff6647" }}
            onClick={yellow}
          />
          <div
            className="h-4 w-4 rounded-full cursor-pointer"
            style={{ background: "#01966b" }}
            onClick={green}
          />
          <div
            className="h-4 w-4 rounded-full cursor-pointer"
            style={{ background: "#d69a00" }}
            onClick={orange}
          />
          <div
            className="h-4 w-4 rounded-full cursor-pointer"
            style={{ background: "#349CE4" }}
            onClick={blue}
          />
          <div
            className="h-4 w-4 rounded-full cursor-pointer"
            style={{ background: "#6E55FF" }}
            onClick={purple}
          />
        </div>
      </Popover>
    </>
  );
};

export default TopBar;
