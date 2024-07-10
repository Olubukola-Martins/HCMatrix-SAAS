import { AppButton } from "components/button/AppButton";
import { TAction } from "../types";
import { useSetup2FA } from "../hooks/useSetup2FA";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { openNotification } from "utils/notifications";

interface IProps {
  setAction: (action: TAction) => void;
}

export const EnableTwoFA = ({ setAction }: IProps) => {
  const { mutate, isLoading } = useSetup2FA();
  const [image, setImage] = useState<string>();
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
            // duration: 0.4,
          });
        //   setAction("display-qrcode");
          setImage(res.data.data);
        //   handleClose();

          queryClient.invalidateQueries({
            queryKey: [],
            // exact: true,
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
