import { Button } from "antd";
import MoonIcon from "assets/svg-components/MoonIcon/MoonIcon";
import { UI_MODE_SETTINGS } from "config/enviroment";
import useHandleColorTheme from "hooks/theme/useHandleColorTheme";
import { IoIosSunny } from "react-icons/io";

const ModeSwitcher = () => {
  const { mode, handleModeSwitch } = useHandleColorTheme();
  if (UI_MODE_SETTINGS.ALLOW_UI_DARK_MODE === false) {
    return null;
  }
  return (
    <>
      {mode === "light" ? (
        <Button
          type="text"
          icon={<MoonIcon className="h-4 w-4 md:h-6 md:w-6" />}
          onClick={() => handleModeSwitch("dark")}
        />
      ) : null}
      {mode === "dark" ? (
        <Button
          type="text"
          icon={<IoIosSunny className="h-4 w-4 md:h-6 md:w-6" />}
          onClick={() => handleModeSwitch("light")}
        />
      ) : null}
    </>
  );
};

export default ModeSwitcher;
