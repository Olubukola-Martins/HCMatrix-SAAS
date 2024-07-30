import { TAction } from "../types";
import { AppButton } from "components/button/AppButton";

interface IProps {
  setAction: (action: TAction) => void;
}
export const TwoFactorNotEnabled = ({ setAction }: IProps) => {
  return (
    <div className="text-sm">
      <p>
        Your account is already protected with Two-Factor
        <br className="md:flex hidden" />
        Authentication (2FA). This extra layer of security helps
        <br className="md:flex hidden" /> keep your account safe from
        unauthorized access.
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
  );
};
