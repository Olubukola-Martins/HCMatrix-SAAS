import React from "react";
import { BeatLoader } from "react-spinners";

interface IProps {
  isLoading?: boolean;
  label?: string;
  type?: "submit" | "reset" | "button";
  handleClick?: () => void;
  additionalClassNames?: string[];
  disabled?: boolean;
}

export const AppButton: React.FunctionComponent<IProps> = ({
  disabled = false,
  isLoading = false,
  label = "submit",
  type = "button",
  handleClick,
  additionalClassNames = ["button"],
}) => {
  return (
    <button
      className={`${additionalClassNames?.join(" ")} capitalize`}
      type={type}
      onClick={() => handleClick?.()}
      disabled={disabled}
    >
      {isLoading ? <BeatLoader color="#fff" /> : label}
    </button>
  );
};
