import React from "react";

export const ChartSwitcher: React.FC<{
  items: string[];
  handleClick: (val: string) => void;
}> = ({ items, handleClick }) => {
  return (
    <div className="flex px-2 bg-card justify-between shadow-sm rounded-md">
      {items.map((item, i) => (
        <div
          key={i}
          className={`${
            i !== items.length - 1 && "border-r border-slate-600"
          } px-4 py-2 flex items-center`}
        >
          <span
            className={`${
              item === "Total Assets Cost" && "text-caramel"
            } hover:text-caramel text-sm cursor-pointer`}
            onClick={() => handleClick(item)}
          >
            {item}
          </span>
        </div>
      ))}
    </div>
  );
};
