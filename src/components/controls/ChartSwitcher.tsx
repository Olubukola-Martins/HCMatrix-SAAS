import React, { useEffect, useState } from "react";

export const ChartSwitcher: React.FC<{
  defaultItem?: string;
  items: string[];
  handleClick: (val: string) => void;
}> = ({ items, handleClick, defaultItem }) => {
  const [selected, setSelected] = useState<string>();
  useEffect(() => {
    setSelected(defaultItem);
  }, [defaultItem]);
  return (
    <div className="flex px-2 bg-card justify-between shadow-sm rounded-md">
      {/* TODO: add seperator between items */}
      {items.map((item, i) => (
        <div
          key={i}
          className={`${
            i !== items.length - 1 && "border-none border-slate-600"
          } px-4 py-3 flex items-center`}
        >
          <span
            className={`${
              item === selected && "text-caramel"
            } hover:text-caramel text-sm cursor-pointer capitalize text-center`}
            onClick={() => {
              setSelected(item);
              handleClick(item);
            }}
          >
            {item}
          </span>
        </div>
      ))}
    </div>
  );
};
