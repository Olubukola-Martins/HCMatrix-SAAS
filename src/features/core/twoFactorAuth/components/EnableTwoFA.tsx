import { AppButton } from "components/button/AppButton";
import { TAction } from "../types";
import { Dispatch, SetStateAction } from "react";
import { useQueryClient } from "react-query";
import { openNotification } from "utils/notifications";
import { useEnable2FA } from "../hooks/useEnable2FA";
import { QUERY_KEY_FOR_CHECK_OTP } from "../hooks/useGetTwoFA";

interface IProps {
  setAction: (action: TAction) => void;
  setImage: Dispatch<SetStateAction<string | undefined>>;
}

export const EnableTwoFA = ({ setAction, setImage }: IProps) => {
  const { mutate, isLoading } = useEnable2FA();

  const queryClient = useQueryClient();

  const handleSubmit = () => {
    mutate(
      {},
      {
        onError: (err: any) => {
          openNotification({
            state: "error",
            title: "Error Occurred",
            description:
              err?.response.data.message ?? err?.response.data.error.message,
          });
        },
        onSuccess: (res) => {
          openNotification({
            state: "success",
            title: "Success",
            description: res.data.message,
          });
          setAction("setup-2fa");
          setImage(res.data.data.qrCode);
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_CHECK_OTP],
          });
        },
      }
    );
  };

  return (
    <div>
      <p className="pb-5">
        2FA adds an extra layer of security by requiring a second{" "}
        <br className="md:flex hidden" /> form of verification in addition to
        your password.
      </p>
      <AppButton
        isLoading={isLoading}
        label="Enable 2FA"
        handleClick={() => handleSubmit()}
      />
    </div>
  );
};
