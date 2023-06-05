import React from "react";

const listStyle =
  "flex items-center justify-between cursor-pointer group border-b pb-2 px-3";

export const EntityInfoCard: React.FC<{
  data: { name: string; value: string; collapse?: boolean }[];
}> = ({ data }) => {
  return (
    <div className="bg-mainBg border rounded-lg text-sm shadow py-4 flex flex-col gap-3">
      {data.map((item, i) =>
        item.collapse ? (
          <div className="px-3" key={i}>
            <h5 className="font-medium pb-2 capitalize">{item.name}</h5>
            <p>{item.value}</p>
          </div>
        ) : (
          <div className={listStyle} key={i}>
            <h5 className="group-hover:text-caramel font-medium">
              {item.name}
            </h5>
            <span className="text-sm">{item.value}</span>
          </div>
        )
      )}
    </div>
  );
};
