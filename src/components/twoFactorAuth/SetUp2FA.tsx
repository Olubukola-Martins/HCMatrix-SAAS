import React, { useState } from "react";
import { IModalProps } from "types";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { useSetup2FA } from "features/core/employees/hooks/twoFactorAuth/useSetup2FA";
import { QUERY_KEY_FOR_EMPLOYEE_2FA } from "features/core/employees/hooks/twoFactorAuth/useGetEmployee2FA";
import ConfirmationModal from "components/modals/ConfirmationModal";
import DisplayModal from "components/modals/DisplayModal";

export const Setup2FA: React.FC<IModalProps> = ({ open, handleClose }) => {
  type TAction = "display-qrcode";
  const [action, setAction] = useState<TAction>();
  const [image, setImage] = useState<string>();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useSetup2FA();

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
          setAction("display-qrcode");
          setImage(res.data.data);
          handleClose();

          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_EMPLOYEE_2FA],
            // exact: true,
          });
        },
      }
    );
  };
  const onClose = () => {
    handleClose();
    setAction(undefined);
    setImage(undefined);
  };
  return (
    <>
      <DisplayModal
        title={`Authenticator QR Code`}
        description={`You can use any authenticator of your choice to scan QR code`}
        handleClose={onClose}
        open={action === "display-qrcode"}
        component={<img src={image} alt={"qrcode"} />}
      />
      <ConfirmationModal
        title={`Set Up 2 Factor Authentication`}
        description={`Are you sure you want to setup 2 factor authentication?`}
        handleClose={onClose}
        open={open}
        handleConfirm={{
          fn: () => handleSubmit(),
          isLoading: isLoading,
        }}
      />
    </>
  );
};
