import { useMutation } from "react-query";
import { getEmployees } from "../useFetchEmployees";
import * as XLSX from "xlsx";
import { EMPLOYEE_EXPORT_COLUMNS } from "../../components/list/employeeTableColumns";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TNotificationState, openNotification } from "utils/notifications";

type TResponse = void | {
  state: TNotificationState;
  message: string;
};

type TProps = Omit<Parameters<typeof getEmployees>[0], "companyId" | "token">;
const DEFAULT_EXPORT_FILE_NAME = "employees.xlsx";
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
    const primaryWorksheet = XLSX.utils.json_to_sheet(employeeRows) as any;
    /* calculate column width */
    primaryWorksheet["!cols"] = Object.keys(employeeRows[0]).map((key) => ({
      wch: employeeRows.reduce(
        (w, r: { [key: string]: string | number }) =>
          Math.max(w, Math.max(`${r[key]}`?.length, key.length)),
        12
      ),
    }));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, primaryWorksheet, "Employees");
    XLSX.writeFile(workbook, fileName ?? DEFAULT_EXPORT_FILE_NAME);
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
    (props: TProps, fileName?: string) =>
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

          title: res?.state.toUpperCase() ?? "",
          description: res?.message,
        });
        handleSuccess?.();
      },
    }
  );
};
