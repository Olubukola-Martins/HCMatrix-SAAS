import React from "react";
import { AppButton, IAppBtnProps } from "./AppButton";

interface IProps {
  data: IAppBtnProps[];
}

export const AppButtonList: React.FC<IProps> = ({ data }) => {
  return (
    <div className="flex gap-3">
      {data.map((item, i) => (
        <AppButton key={i} {...item} />
      ))}
    </div>
  );
};
