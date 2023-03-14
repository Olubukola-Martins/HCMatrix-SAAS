import React from "react";
import { BeatLoader } from "react-spinners";

interface IProps {
  isLoading?: boolean;
  label?: string;
  type?: "submit" | "reset" | "button";
  handleClick?: () => void;
}

const Button: React.FunctionComponent<IProps> = ({
  isLoading = false,
  label = "submit",
  type = "button",
  handleClick,
}) => {
  return (
    <button className="button capitalize" type={type} onClick={handleClick}>
      {isLoading ? <BeatLoader color="#fff" /> : label}
    </button>
  );
};

export default Button;
