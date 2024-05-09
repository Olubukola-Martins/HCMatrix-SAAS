import React from "react";
import useLocalStorage from "use-local-storage";

const Themes: React.FC<{ children: React.ReactNode; isBg?: boolean }> = ({
  children,
  isBg = true,
}) => {
  // TODO: Find out more about this, and refactor code
  const [theme] = useLocalStorage("theme" ? "dark" : "light", "light");
  const [colorTheme] = useLocalStorage("", "");
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
