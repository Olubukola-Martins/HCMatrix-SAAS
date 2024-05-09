import { Dropdown, Menu } from "antd";
import React from "react";

export type TGridItem = {
  id: number;
  title: string;
  subTitle?: string;
  itemCount?: number;
  actions?: {
    name: string;
    handleAction: (id?: number) => void;
  }[];
};

export const GridItem: React.FC<TGridItem> = ({
  id,
  title,
  actions,
  itemCount,
  subTitle,
}) => {
  return (
    <>
      <div className="border px-4 py-2 rounded-lg grid grid-cols-1 gap-4 border-caramel">
        <div className="flex justify-between">
          <h6 className="text-xl font-thin capitalize">{title}</h6>
          {actions && actions.length > 0 && (
            <Dropdown
              overlay={
                <Menu>
                  {actions?.map((item) => (
                    <Menu.Item
                      key={item.name}
                      onClick={() => item.handleAction(id)}
                      className="capitalize"
                    >
                      {item.name}
                    </Menu.Item>
                  ))}
                </Menu>
              }
              trigger={["click"]}
            >
              <i className="fa-solid fa-ellipsis cursor-pointer"></i>
            </Dropdown>
          )}
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm">{subTitle}</p>
          <div className="rounded-full bg-caramel h-6 w-6 flex items-center justify-center ">
            <span className="text-sm">{itemCount}</span>
          </div>
        </div>
      </div>
    </>
  );
};
