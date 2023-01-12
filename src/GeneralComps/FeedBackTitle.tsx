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
    <div className="flex justify-between  text-sm">
      <Link to={item.link} onClick={handleClick}>
        <p
          className={`block hover:text-caramel ${
            item.completed ? "text-caramel line-through" : "font-semibold"
          }`}
          title={item.hint}
        >
          {item.text}
        </p>
      </Link>
    </div>
  );
};

export default FeedBackTitle;
