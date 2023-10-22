import { Tooltip } from "antd";
import Themes from "components/Themes";
import React, { ReactNode } from "react";

const AppTooltip: React.FC<{
  children: ReactNode;
  tooltipProps: { title: string; showArrow?: boolean };
}> = ({ children, tooltipProps }) => {
  const { title, showArrow = false } = tooltipProps;
  return (
    <Themes isBg={false}>
      <div className="flex gap-2 items-start">
        <div>{children}</div>
        <Tooltip showArrow={showArrow} title={title}>
          <i className="ri-information-fill text-sm pt-0.5" />
        </Tooltip>
      </div>
    </Themes>
  );
};

export default AppTooltip;
