import { BackgroundCurves } from "features/self-service/components/BackgroundCurves";
import twoFA from "../assets/images/enableAuth.svg";
import { AppButton } from "components/button/AppButton";
import { useState } from "react";
import { DisableTwoFA } from "../components/DisableTwoFA";
import { GenerateBackupCodes } from "../components/GenerateBackupCodes";
import { EnterBackupCodes } from "../components/EnterBackupCodes";

type TAction = "disable-2fa" | "g-backup-codes" | "use-backup-codes";
const TwoFactorAuthentication = () => {
  const [useCheckTwoFA, setUseCheckTwoFA] = useState<boolean>(true);
  const [action, setAction] = useState<TAction>();

  const clearAction = () => {
    setAction(undefined);
  };

  return (
    <>
      <DisableTwoFA
        setAction={setAction}
        open={action === "disable-2fa"}
        handleClose={() => clearAction()}
      />

      <GenerateBackupCodes
        open={action === "g-backup-codes"}
        handleClose={() => clearAction()}
      />

      <EnterBackupCodes
        open={action === "use-backup-codes"}
        handleClose={() => clearAction()}
      />

      <div className="relative mb-10">
        <BackgroundCurves />
        <div className="absolute top-4 Container mt-8 w-full">
          <h2 className="font-extrabold text-xl md:text-2xl text-accent">
            Two-Factor Authentication (2FA)
          </h2>

          <div className="flex justify-center mt-3 text-center">
            <div>
              <div className="flex justify-center mb-3">
                <img src={twoFA} alt="authentication" />
              </div>

              {useCheckTwoFA ? (
                <div className="text-sm">
                  <p>
                    Your account is already protected with Two-Factor
                    <br className="md:flex hidden" />
                    Authentication (2FA). This extra layer of security helps
                    <br className="md:flex hidden" /> keep your account safe
                    from unauthorized access.
                  </p>
                  <p className="pt-3">
                    If you lose access to your authentication device, use any of
                    <br className="md:flex hidden" />
                    your backup codes to login to your account.
                  </p>

                  <div className="flex items-center justify-between mt-7">
                    <AppButton
                      label="Generate Backup codes"
                      variant="transparent"
                      handleClick={() => setAction("g-backup-codes")}
                    />
                    <AppButton
                      label="Disable 2FA"
                      handleClick={() => setAction("disable-2fa")}
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <p className="pb-5">
                    2FA adds an extra layer of security by requiring a second{" "}
                    <br className="md:flex hidden" /> form of verification in
                    addition to your password.
                  </p>
                  <AppButton label="Enable 2FA" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TwoFactorAuthentication;
