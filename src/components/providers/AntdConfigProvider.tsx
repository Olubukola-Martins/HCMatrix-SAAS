import { ConfigProvider, ThemeConfig, theme } from "antd";
import useHandleColorTheme from "hooks/theme/useHandleColorTheme";

const AntdConfigProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // TODO: Rename useHandleColorTheme to useTheme
  const { color, mode } = useHandleColorTheme();
  // TODO: Refactor Theme config to be in a constants folder
  const themeConfig: ThemeConfig =
    mode === "dark"
      ? {
          algorithm: theme.darkAlgorithm,
          cssVar: true,

          token: {
            fontFamily: "Sen, sans-serif",
            colorPrimary: color,
          },
        }
      : {
          cssVar: true,

          token: {
            fontFamily: "Sen, sans-serif",
            colorPrimary: color,
          },
          components: {
            Layout: {
              bodyBg: "#fff",
              siderBg: "#F6F7FB",
              headerBg: "#fff",
            },

            // Button: {
            //   colorPrimary: "red",
            //   colorBgBase: "red",
            //   colorBgContainer: "red",
            //   colorFill: "red",
            //   colorBgElevated: "red",
            //   colorPrimaryBg: "red",
            // },
          },
        };

  return (
    <>
      <div color-theme={color} data-theme={mode}>
        <ConfigProvider theme={themeConfig}>{children}</ConfigProvider>
      </div>
    </>
  );
};

export default AntdConfigProvider;
