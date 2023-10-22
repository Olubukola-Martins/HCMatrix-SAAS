import Themes from "components/Themes";
import React from "react";
import { BeatLoader } from "react-spinners";

export type TBtnVariant = "default" | "transparent" | "style-with-class";

export type IAppBtnProps = {
  isLoading?: boolean;
  label?: string;
  type?: "submit" | "reset" | "button";
  handleClick?: () => void;
  additionalClassNames?: string[];
  disabled?: boolean;
  variant?: TBtnVariant;
};

// TODO: Refactor to use the generateBtnVariantClassName from dropdown btn
export const AppButton: React.FunctionComponent<IAppBtnProps> = ({
  disabled = false,
  isLoading = false,
  label = "submit",
  type = "button",
  variant = "default",
  handleClick,
  additionalClassNames = ["button"],
}) => {
  if (variant === "style-with-class") {
    return (
      <Themes>
        <button
          className={`${[...additionalClassNames]?.join(" ")} capitalize`}
          type={type}
          onClick={() => handleClick?.()}
          disabled={disabled}
          // style={{ color: "var(--neutral)" }}
        >
          {isLoading ? <BeatLoader color="#aaa" /> : label}
        </button>
      </Themes>
    );
  }
  if (variant === "transparent") {
    return (
      <Themes>
        <button
          className={`${[...additionalClassNames, "transparentButton"]?.join(
            " "
          )} capitalize`}
          type={type}
          onClick={() => handleClick?.()}
          disabled={disabled}
          style={{ color: "var(--neutral)" }}
        >
          {isLoading ? <BeatLoader color="#aaa" /> : label}
        </button>
      </Themes>
    );
  }
  return (
    <Themes>
      <button
        className={`${additionalClassNames?.join(" ")} capitalize`}
        type={type}
        onClick={() => handleClick?.()}
        disabled={disabled}
      >
        {isLoading ? <BeatLoader color="#fff" /> : label}
      </button>
    </Themes>
  );
};
