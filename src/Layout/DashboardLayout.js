import React from "react";
import useLocalStorage from "use-local-storage";
import TopBar from "./Components/TopBar";
import SideBar from "./Components/SideBar";

const DashboardLayout = ({ children }) => {
  const [theme, setTheme] = useLocalStorage("theme" ? "dark" : "light");

  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };
  return (
    <div className="mode_color" data-theme={theme}>
      <TopBar switchTheme={switchTheme} theme={theme} />
      <div className="flex w-full relative">
        <div className="w-24 fixed ">
          <SideBar />
        </div>

        <div className="flex-1 lg:ml-24">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
