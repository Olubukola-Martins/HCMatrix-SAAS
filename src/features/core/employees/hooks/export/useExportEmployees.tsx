import { useMutation } from "react-query";
import { getEmployees } from "../useFetchEmployees";
import { EMPLOYEE_EXPORT_COLUMNS } from "../../components/list/employeeTableColumns";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TNotificationState, openNotification } from "utils/notifications";
import { exportEntityAsFile } from "utils/exportHelpers";

type TResponse = {
  state: TNotificationState;
  message: string;
};

type TProps = Omit<Parameters<typeof getEmployees>[0], "companyId" | "token">;

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
    const data = await getEmployees({ ...props, ...auth });
    if (data.total === 0) {
      return {
        message: "No data was found to export",
        state: "info",
      };
    }
    const employeeRows = EMPLOYEE_EXPORT_COLUMNS(data.data);
    exportEntityAsFile({
      fileName,
      entityRows: employeeRows,
      workSheetName: "Employees",
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
export const useExportEmployees = ({
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
