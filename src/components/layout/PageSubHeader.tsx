import { Dropdown, Menu } from "antd";
import React from "react";

// Define a btn component

interface IProps {
  description: string;
  actions?: { name: string; handleClick: Function }[];
  variant?: "drop-down" | "side-by-side";
  dropDownText?: string;
}

const PageSubHeader = ({
  description,
  actions,
  variant = "side-by-side",
  dropDownText,
}: IProps) => {
  return (
    <div className="flex flex-col mt-5 gap-2 md:flex-row md:justify-between md:items-center bg-card p-2 rounded text-sm">
      <p>{description}</p>

      <div className="flex gap-4 items-center">
        {variant === "side-by-side" &&
          actions?.map((item) => (
            <button
              className="py-1 px-2 bg-caramel rounded text-sm text-white font-medium"
              onClick={() => item.handleClick()}
            >
              {item.name}
            </button>
          ))}

        {variant === "drop-down" && (
          <Dropdown
            overlay={
              <Menu>
                {actions?.map((item) => (
                  <Menu.Item onClick={() => item.handleClick()}>
                    {item.name}
                  </Menu.Item>
                ))}
              </Menu>
            }
            trigger={["click"]}
          >
            <button className="py-1 px-2 bg-caramel rounded text-sm text-white font-medium flex items-center gap-2">
              <span>{dropDownText}</span>{" "}
              <i className="fa-solid fa-chevron-down"></i>
            </button>
          </Dropdown>
        )}
      </div>
    </div>
  );
};

export default PageSubHeader;
