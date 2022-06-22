import React from "react";
import logo from "../Images/logo.png";

const TopBar = ({ switchTheme, theme }) => {
  return (
    <div className="bg-caramel w-full py-2 sticky top-0 z-50">
      <div className="Container flex items-center justify-between">
        <img src={logo} alt="logo" className="h-10" />
      

        <div className="flex gap-4 items-center">
            <div className="flex items-center gap-2">
          <div class="relative w-full">
            <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              className="bg-white border border-white text-sm rounded-2xl focus:outline-none block w-full pl-10 py-1 pr-24"
              placeholder="Search..."
            />
          </div>
          <i className="ri-equalizer-fill cursor-pointer h-8 w-10 rounded-full bg-white flex items-center justify-center text-caramel"></i>
        </div>
          {theme === "light" ? (
            <i
              onClick={switchTheme}
              class="fas fa-moon text-lg cursor-pointer text-black"
            ></i>
          ) : (
            <i
              onClick={switchTheme}
              class="fas fa-sun text-lg cursor-pointer text-white"
            ></i>
          )}
          <i class="ri-notification-3-line text-xl cursor-pointer text-white"></i>

          <img
            src="https://res.cloudinary.com/ddvaelej7/image/upload/v1655735373/samples/Ellipse_4_j0womm.png"
            alt=""
            className="h-8"
          />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
