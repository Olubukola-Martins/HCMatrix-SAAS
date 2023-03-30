import React from "react";
import { BeatLoader } from "react-spinners";

interface IProps {
  isLoading?: boolean;
  label?: string;
  type?: "submit" | "reset" | "button";
  handleClick?: () => void;
  additionalClassNames?: string[];
}

const Button: React.FunctionComponent<IProps> = ({
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
    >
      {isLoading ? <BeatLoader color="#fff" /> : label}
    </button>
  );
};

export default Button;
