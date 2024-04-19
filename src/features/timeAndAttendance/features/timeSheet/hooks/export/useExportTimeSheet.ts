import { useMutation } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TNotificationState, openNotification } from "utils/notifications";
import { exportEntityAsFile } from "utils/exportHelpers";

import { getTimeSheet } from "../useGetTimeSheet";
import { TIME_SHEET_EXPORT_COLUMNS } from "../../components/columns";

type TResponse = {
  state: TNotificationState;
  message: string;
};

type TProps = Omit<Parameters<typeof getTimeSheet>[0], "auth">;

const generateExport = async ({
  auth,
  props,
  fileName,
}: {
  auth: ICurrentCompany;
  props: TProps;
  fileName?: string;
}): Promise<TResponse> => {
  try {
    const data = await getTimeSheet({ auth, ...props });
    if (data.total === 0) {
      return {
        message: "No data was found to export",
        state: "info",
      };
    }
    const dataRows = TIME_SHEET_EXPORT_COLUMNS(data.data);
    exportEntityAsFile({
      fileName,
      entityRows: dataRows,
      workSheetName: "Timesheet",
    });

    return {
      state: "success",
      message: "Data exported successfully!",
    };
  } catch (error) {
    return {
      state: "error",
      message: "Error processing export!",
    };
  }
};
export const useExportTimeSheet = ({
  handleSuccess,
}: { handleSuccess?: () => void } = {}) => {
  const { token, companyId } = useApiAuth();

  return useMutation(
    ({ props, fileName }: { props: TProps; fileName?: string }) =>
      generateExport({
        auth: {
          token,
          companyId,
        },
        props,
        fileName,
      }),
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
          state: res?.state,

          title: res?.state ?? "",
          description: res?.message,
        });
        handleSuccess?.();
      },
    }
  );
};
