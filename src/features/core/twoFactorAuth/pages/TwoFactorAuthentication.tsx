import { BackgroundCurves } from "features/self-service/components/BackgroundCurves";
import twoFA from "../assets/images/enableAuth.svg";
import { AppButton } from "components/button/AppButton";
import { useState } from "react";
import { DisableTwoFA } from "../components/DisableTwoFA";
import { GenerateBackupCodes } from "../components/GenerateBackupCodes";
import { EnterBackupCodes } from "../components/EnterBackupCodes";
import { TAction } from "../types";
import { EnableTwoFA } from "../components/EnableTwoFA";
import { useGetTwoFA } from "../hooks/useGetTwoFA";
import { Skeleton } from "antd";
import { VerifyTwoFA } from "../components/VerifyTwoFA";
import { ListBackupCodes } from "../components/ListBackupCodes";

const TwoFactorAuthentication = () => {
  const { isLoading, data: checkOtpData, isError } = useGetTwoFA();
  const [image, setImage] = useState<string>();
  const [backupCodes, setBackupCodes] = useState<string[]>();
  const [action, setAction] = useState<TAction>();
  const clearAction = () => {
    setAction(undefined);
  };

  return (
    <>
      <VerifyTwoFA
        open={action === "setup-2fa"}
        handleClose={() => clearAction()}
        image={image}
        setAction={setAction}
      />
      <ListBackupCodes
        open={action === "list-backup-codes"}
        handleClose={() => clearAction()}
        backupCodes={backupCodes}
        setAction={setAction}
      />
      <DisableTwoFA
        setAction={setAction}
        open={action === "disable-2fa"}
        handleClose={() => clearAction()}
      />

      <GenerateBackupCodes
        open={action === "g-backup-codes"}
        handleClose={() => clearAction()}
        setAction={setAction}
        setBackupCodes={setBackupCodes}
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

          <Skeleton loading={isLoading} active={true} className="mt-20">
            <div className="flex justify-center mt-3 text-center">
              <div>
                <div className="flex justify-center mb-3">
                  <img src={twoFA} alt="authentication" loading="lazy" />
                </div>

                {isError ? (
                  <EnableTwoFA setAction={setAction} setImage={setImage} />
                ) : checkOtpData?.isDisabled === false &&
                  checkOtpData?.isVerified === true ? (
                  <div className="text-sm">
                    <p>
                      Your account is already protected with Two-Factor
                      <br className="md:flex hidden" />
                      Authentication (2FA). This extra layer of security helps
                      <br className="md:flex hidden" /> keep your account safe
                      from unauthorized access.
                    </p>
                    <p className="pt-3">
                      If you lose access to your authentication device, use any
                      of
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
                ) : null}
              </div>
            </div>
          </Skeleton>
        </div>
      </div>
    </>
  );
};

export default TwoFactorAuthentication;
