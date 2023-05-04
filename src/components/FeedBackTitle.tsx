import React from "react";
import { Link } from "react-router-dom";

export enum EInitialSetUp {
  SET_UP_ROLES = "Set up roles",
  SET_UP_DEPTS = "Set up departments",
  SET_UP_DESGS = "Set up designations",
  ADD_EMPLOYEES = "Add employees",
}

export type TSetupStep = {
  text: EInitialSetUp;
  link: string;
  completed: boolean;
  hint: string;
};
interface IProps {
  item: TSetupStep;
  handleClick: () => void;
}

const FeedBackTitle = ({ handleClick, item }: IProps) => {
  return (
    <Link
      to={item.link}
      onClick={handleClick}
      className="flex justify-between hover:text-caramel  w-full text-sm"
    >
      <div className="flex-1">
        <p className={`block `} title={item.hint}>
          {item.text}
        </p>
      </div>
      <div>
        <i className="ri-arrow-right-s-line text-lg cursor-pointer"></i>
      </div>
    </Link>
  );
};

export default FeedBackTitle;
