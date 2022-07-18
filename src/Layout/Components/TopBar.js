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
          <Link to="/">
            <img src={logo} alt="logo" className="md:h-10 h-7" />
          </Link>

          <div className="flex gap-4 items-center">
            <select className="rounded pl-2 pr-10 py-2 focus:outline-none text-sm font-medium cursor-pointer bg-mainBg">
              <option value="">Switch Company</option>
              <option value="">Snapnet Ltd</option>
              <option value="">New Era Nig</option>
              <option value="">Pwan Homes</option>
            </select>

            <i className="fa-solid fa-magnifying-glass cursor-pointer text-base text-white"></i>

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

            <Link to="/settings">
              {" "}
              <i
                className="ri-settings-3-line text-xl text-white cursor-pointer"
                title="Settings"
              ></i>
            </Link>
            <i
              onClick={handleClick}
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
