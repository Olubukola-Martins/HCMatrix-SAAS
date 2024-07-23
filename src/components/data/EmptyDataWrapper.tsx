import { Empty } from "antd";
import React from "react";

export const EmptyDataWrapper: React.FC<{
  isEmpty: boolean;
  children: React.ReactNode;
  emptyProps?: typeof Empty.defaultProps;
}> = ({ isEmpty, children, emptyProps = { description: "No Data" } }) => {
  return <>{isEmpty ? <Empty {...emptyProps} /> : children}</>;
};
