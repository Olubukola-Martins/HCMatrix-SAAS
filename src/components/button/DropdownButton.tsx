import { Dropdown, Menu } from "antd";
import { ItemType } from "antd/lib/menu/hooks/useItems";
import React from "react";
import { TBtnVariant } from "./AppButton";

interface IProps {
  items: ItemType[];
  label: string;
  variant?: TBtnVariant;
  btnClassName?: string;
}

export const generateBtnVariantClassName = (
  variant: TBtnVariant,
  className?: string
): string => {
  let classNameGenerated = "";
  switch (variant) {
    case "default":
      classNameGenerated = "button";
      break;
    case "transparent":
      classNameGenerated = "transparentButton";
      break;
    case "style-with-class":
      classNameGenerated = className ?? "";
      break;

    default:
      break;
  }
  return classNameGenerated;
};

// TODO: Rename to AppDropdown Btn
const DropdownButton: React.FC<IProps> = ({
  items,
  label,
  variant = "default",
  btnClassName,
}) => {
  return (
    <Dropdown overlay={<Menu items={items} />} trigger={["click"]}>
      <button
        className={`${generateBtnVariantClassName(
          variant,
          btnClassName
        )} flex items-center gap-2`}
      >
        <span>{label}</span> <i className="fa-solid fa-chevron-down"></i>
      </button>
    </Dropdown>
  );
};

export default DropdownButton;
