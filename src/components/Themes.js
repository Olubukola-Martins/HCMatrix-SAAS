import React from "react";
import useLocalStorage from "use-local-storage";

const Themes = ({ children, isBg = true }) => {
  const [theme] = useLocalStorage("theme" ? "dark" : "light");
  const [colorTheme] = useLocalStorage("");
  return (
    <div
      className={isBg ? "mode_color" : "mode_color_no_bg"}
      data-theme={theme}
      color-theme={colorTheme}
    >
      {children}
    </div>
  );
};

export default Themes;
