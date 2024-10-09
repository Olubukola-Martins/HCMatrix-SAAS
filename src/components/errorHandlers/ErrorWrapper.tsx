import React, { useEffect } from "react";
import ErrorImage from "../../assets/images/err.png";
import { AppButton } from "components/button/AppButton";
import { Link, useNavigate } from "react-router-dom";
import { useSignOut } from "react-auth-kit";
import { appRoutes } from "config/router/paths";
import { LOCAL_STORAGE_AUTH_KEY } from "constants/localStorageKeys";

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
  const navigate = useNavigate();
  const logout = useSignOut();

  useEffect(() => {
    if (message.toLowerCase().indexOf("token") !== -1) {
      //Done so that in the event that a token expires the user is automatically logged out!
      logout();
      navigate(appRoutes.login, { replace: true });
    }
  }, [message, navigate]);
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
