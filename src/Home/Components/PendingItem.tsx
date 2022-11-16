import React from "react";
import ProgressBar from "./ProgressBar";
import { motion } from "framer-motion";
import { Link, To } from "react-router-dom";

interface Iprops {
  handleClick: Function;
  openId: string;
  item: any;
}

const PendingItem = ({ handleClick, item, openId }: Iprops) => {
  return (
    <div>
      <div className="cursor-pointer" onClick={() => handleClick(item.title)}>
        <span>{item.title}</span>
        <div className="setUp_progress2 general_setup">
          <div className="setUp_progress-bar2" />
        </div>
      </div>
      <motion.div
        className={`other overflow-y-hidden flex flex-col justify-center pl-2  border-0  ${
          openId === item.title ? "border-b" : ""
        } border-slate-400`}
        initial={{ height: 0 }}
        animate={{
          height: openId === item.title ? item.items.length * 43 : "0",
        }}
      >
        {item.items.map(
          (child: {
            link: To;
            name:
              | boolean
              | React.ReactElement<
                  any,
                  string | React.JSXElementConstructor<any>
                >
              | React.ReactFragment
              | React.Key
              | null
              | undefined;
          }) => (
            <Link
              to={child.link}
              // key={child.name}
              className="item flex gap-6 text-xs mb-2 items-center"
            >
              <span>{child.name}</span>
              <ProgressBar width="25%" />
            </Link>
          )
        )}
      </motion.div>
    </div>
  );
};
export default PendingItem;
