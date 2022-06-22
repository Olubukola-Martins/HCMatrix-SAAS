import React from "react";
import useLocalStorage from "use-local-storage";
import TopBar from "./Components/TopBar";
import SideBar from "./Components/SideBar";
import SubTopBar from "./Components/SubTopBar";

const DashboardLayout = ({ children }) => {
  const [theme, setTheme] = useLocalStorage("theme" ? "dark" : "light");
  const [colorTheme, setColorThem] = useLocalStorage("");

  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  const switchGreenColor = () => {
    const newTheme = colorTheme === "light" ? "orange" : "green";
    setColorThem(newTheme);
  };

  const switchOrangeColor = () => {
    const newTheme = colorTheme === "light" ? "green" : "orange";
    setColorThem(newTheme);
  };

  const switchYellowColor = () => {
    const newTheme = colorTheme === "default";
    setColorThem(newTheme);
  };

  return (
    <div className="mode_color" data-theme={theme} color-theme={colorTheme}>
      <TopBar switchTheme={switchTheme} theme={theme} />
      {/* <SubTopBar/> */}
      <div className="flex w-full relative">
        <div className="w-28 fixed z-40">
          <SideBar green={switchGreenColor} orange={switchOrangeColor} yellow={switchYellowColor}/>
        </div>

        <div className="flex-1 lg:ml-24">
          <div>
            <SubTopBar />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
