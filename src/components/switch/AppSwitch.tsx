import { Switch } from "antd";
import Themes from "components/Themes";
import React from "react";

const AppSwitch: React.FC<(typeof Switch)["defaultProps"]> = (switchProps) => {
  // TODO: Perform a general refactor for all components to use this
  // TODO: Also consider doing so for tooltip and alsothere should be a AppModal component
  return (
    <Themes isBg={false}>
      <Switch {...{ ...switchProps }} />
    </Themes>
  );
};

export default AppSwitch;
