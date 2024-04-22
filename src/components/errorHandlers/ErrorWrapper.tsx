import React from "react";
import ErrorImage from "../../assets/images/err.png";
import { AppButton } from "components/button/AppButton";
import { Link } from "react-router-dom";

interface IProps {
  children: React.ReactNode;
  message?: string;
  isError?: boolean;
  onBack?: () => void;
  backLink?: string;
  errImage?: React.ReactNode;
}

export const ErrorWrapper: React.FC<IProps> = ({
  message = "Something went wrong!",
  isError = false,
  children,
  onBack,
  backLink,
  errImage = (
    <img src={ErrorImage} alt="error" className="object-contain h-72" />
  ),
}) => {
  return (
    <>
      {isError && (
        <div className="flex items-center flex-col gap-6">
          <div className="py-12">{errImage}</div>
          <h1 className="text-xl ">{message}</h1>
          {onBack && <AppButton label="Go back" handleClick={() => onBack()} />}
          {backLink && (
            <Link to={backLink}>
              <AppButton label="Go back" />
            </Link>
          )}
        </div>
      )}
      {!isError && <>{children}</>}
    </>
  );
};
