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

  const switchBlueColor = () => {
    const newTheme = colorTheme === "light" ? "orange" : "blue";
    setColorThem(newTheme);
  };

  const switchPurpleColor = () => {
    const newTheme = colorTheme === "light" ? "blue" : "purple";
    setColorThem(newTheme);
  };

  const switchYellowColor = () => {
    const newTheme = colorTheme === "default";
    setColorThem(newTheme);
  };

  // Material UI dark and light mode

  return (
    <div className="mode_color" data-theme={theme} color-theme={colorTheme}>
      <TopBar
        switchTheme={switchTheme}
        theme={theme}
        green={switchGreenColor}
        orange={switchOrangeColor}
        yellow={switchYellowColor}
        blue={switchBlueColor}
        purple={switchPurpleColor}
      />
      <div className="flex w-full relative">
        <div className="w-32 fixed z-40 lg:flex hidden">
          <SideBar />
        </div>

        <div className="flex-1 lg:ml-24">
          <div className="w-full md:top-14 top-10 sticky z-40">
            <SubTopBar />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
