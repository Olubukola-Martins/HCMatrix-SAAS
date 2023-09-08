import { useApiAuth } from "hooks/useApiAuth";
import { useEffect } from "react";
import { useApplyDefaultSettings } from "./useApplyDefaultSettings";
import { openNotification } from "utils/notifications";
import { useCheckDefaultSettings } from "./useCheckDefaultSettings";

export const useDefaultSettingsCall = () => {
  const { token, companyId } = useApiAuth();
  const { data } = useCheckDefaultSettings();
  const { mutate } = useApplyDefaultSettings();
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
            duration: 5.0,
          });
        },
      }
    );
  };

  useEffect(() => {
    if (!data) {
      activateDefaultSettings();
    }
  }, []);

  return;
};
