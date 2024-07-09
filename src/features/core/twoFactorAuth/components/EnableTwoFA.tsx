import { AppButton } from "components/button/AppButton";
import React from "react";
import { TAction } from "../types";

interface IProps {
    setAction: (action: TAction) => void;
}

export const EnableTwoFA = ({setAction}: IProps) => {
  return (
    <div>
      <p className="pb-5">
        2FA adds an extra layer of security by requiring a second{" "}
        <br className="md:flex hidden" /> form of verification in addition to
        your password.
      </p>
      <AppButton
        label="Enable 2FA"
        handleClick={() => setAction("setup-2fa")}
      />
    </div>
  );
};
