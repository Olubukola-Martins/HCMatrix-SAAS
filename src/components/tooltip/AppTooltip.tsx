import { Tooltip } from "antd";
import Themes from "components/Themes";
import React, { ReactNode } from "react";

const AppTooltip: React.FC<{
  children: ReactNode;
  tooltipProps: { title: React.ReactNode; showArrow?: boolean };
}> = ({ children, tooltipProps }) => {
  const { title, showArrow = true } = tooltipProps;
  return (
    <Themes isBg={false}>
      <div className="flex gap-2 items-start">
        <div>{children}</div>
        <Tooltip
          showArrow={showArrow}
          title={title}
          trigger={["hover", "click"]}
          overlayInnerStyle={{
            background: "var(--card)",
            color: "black",
            padding: "10px",
          }}
        >
          <i className="ri-information-fill text-sm pt-0.5 text-caramel" />
        </Tooltip>
      </div>
    </Themes>
  );
};

export default AppTooltip;
