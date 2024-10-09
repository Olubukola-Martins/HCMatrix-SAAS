import { UI_MODE_SETTINGS } from "config/enviroment";
import React, { createContext, useEffect, useState } from "react";
import { EThemePrimaryColor, TThemeMode } from "types";

const LOCAL_STORAGE_KEY_FOR_THEME = "theme";
const LOCAL_STORAGE_KEY_FOR_MODE = "mode";
interface IProps {
  children: React.ReactNode;
}
interface IThemeContextProps {
  color: EThemePrimaryColor;
  mode: TThemeMode;
  handleThemeSwitch: (color: EThemePrimaryColor) => void;
  handleModeSwitch: (color: TThemeMode) => void;
}
export const ThemeContext = createContext<IThemeContextProps>({
  color: EThemePrimaryColor.DEFAULT,
  mode: "light",
  handleThemeSwitch: () => {},
  handleModeSwitch: () => {},
});
const ThemeContextProvider = ({ children }: IProps) => {
  const [mode, setMode] = useState<TThemeMode>("light");
  const [primary, setPrimary] = useState<EThemePrimaryColor>(
    EThemePrimaryColor.DEFAULT
  );

  useEffect(() => {
    if (
      localStorage.getItem(LOCAL_STORAGE_KEY_FOR_THEME) === null &&
      localStorage.getItem(LOCAL_STORAGE_KEY_FOR_MODE) === null
    ) {
      // color

      handleThemeSwitch(EThemePrimaryColor.DEFAULT);
      // color --end

      // mode
      // check sytem prefernece
      if (UI_MODE_SETTINGS.ALLOW_UI_DARK_MODE) {
        const mq = window.matchMedia("(prefers-color-scheme: dark)");

        if (mq.matches) {
          handleModeSwitch("dark");
        } else {
          handleModeSwitch("light");
        }
      } else {
        handleModeSwitch("light");
      }

      // mode --end

      return;
    }

    // color
    localStorage.getItem(LOCAL_STORAGE_KEY_FOR_THEME) &&
      setPrimary(
        localStorage.getItem(LOCAL_STORAGE_KEY_FOR_THEME) as EThemePrimaryColor
      );
    // mode
    localStorage.getItem(LOCAL_STORAGE_KEY_FOR_MODE) &&
      setMode(localStorage.getItem(LOCAL_STORAGE_KEY_FOR_MODE) as TThemeMode);
  }, []);
  const handleThemeSwitch = (color: EThemePrimaryColor) => {
    setPrimary(color);
    localStorage.setItem(LOCAL_STORAGE_KEY_FOR_THEME, color);
  };
  const handleModeSwitch = (mode: TThemeMode) => {
    setMode(mode);
    localStorage.setItem(LOCAL_STORAGE_KEY_FOR_MODE, mode);
  };
  return (
    <ThemeContext.Provider
      value={{ color: primary, handleThemeSwitch, mode, handleModeSwitch }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
