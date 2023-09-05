import { Modal } from "antd";
import { AppButton } from "components/button/AppButton";
import { useApiAuth } from "hooks/useApiAuth";
import { IModalProps } from "types";
import { useApplyDefaultSettings } from "../hooks/useApplyDefaultSettings";
import { openNotification } from "utils/notifications";

export const ApplyDefaultSettings = ({ handleClose, open }: IModalProps) => {
  const {
    currentCompanyEmployeeDetails: user,
    token,
    companyId,
  } = useApiAuth();
  const { mutate, isLoading } = useApplyDefaultSettings();
  const activateDefaultSettings = () => {
    mutate(
      { token, companyId },
      {
        onError: (err: any) => {
          openNotification({
            title: "Error",
            state: "error",
            description: err.response.data.message,
            duration: 6.0,
          });
        },
        onSuccess: (res: any) => {
          openNotification({
            title: "Success",
            state: "success",
            description: "Default settings activated successfully",
            duration: 6.0,
          });
          handleClose();
        },
      }
    );
  };
  return (
    <Modal
      title="Activate Default Settings"
      footer={null}
      visible={open}
      onCancel={() => handleClose()}
      maskClosable={false}
      closable={false}
    >
      <h4 className="font-semibold text-base">
        Hello {user?.firstName} {user?.lastName},
      </h4>
      <p className="text-sm pt-2">
        Welcome to recruitment module! Please will you like to activate system
        default settings ?
      </p>
      <div className="flex justify-end items-center gap-4 mt-3">
        <AppButton
          handleClick={() => handleClose()}
          label="No"
          variant="transparent"
        />
        <AppButton
          label="Yes"
          isLoading={isLoading}
          handleClick={activateDefaultSettings}
        />
      </div>
    </Modal>
  );
};
