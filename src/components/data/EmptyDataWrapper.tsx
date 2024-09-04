import { Empty } from "antd";
import React from "react";
import { IDivProps } from "types/html";

export const EmptyDataWrapper: React.FC<{
  isEmpty: boolean;
  children: React.ReactNode;
  emptyProps?: typeof Empty.defaultProps;

}& Pick<IDivProps, 'className'>> = ({ isEmpty, children, emptyProps = { description: "No Data" }, className }) => {
  return <>{isEmpty ? <Empty className={className}  {...emptyProps} /> : children}</>;
};
