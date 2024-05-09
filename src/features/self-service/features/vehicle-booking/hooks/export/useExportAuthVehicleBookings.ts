import { useMutation } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TNotificationState, openNotification } from "utils/notifications";
import { exportEntityAsFile } from "utils/exportHelpers";
import { getVehicleBookingsForAuthEmployee } from "../booking/useGetVehicleBookings4AuthEmployee";
import { EMPLOYEE_VEHICLE_BOOKINGS_EXPORT_COLUMNS } from "../../components/columns/employee-vehicle-booking";

type TResponse = {
  state: TNotificationState;
  message: string;
};

export type TExportAuthVehicleBookingProps = Omit<
  Parameters<typeof getVehicleBookingsForAuthEmployee>[0],
  "auth"
>;

const generateExport = async ({
  auth,
  props,
  fileName,
}: {
  auth: ICurrentCompany;
  props: TExportAuthVehicleBookingProps;
  fileName?: string;
}): Promise<TResponse> => {
  try {
    const data = await getVehicleBookingsForAuthEmployee({ ...props, auth });
    if (data.total === 0) {
      return {
        message: "No data was found to export",
        state: "info",
      };
    }
    const dataRows = EMPLOYEE_VEHICLE_BOOKINGS_EXPORT_COLUMNS(data.data);
    exportEntityAsFile({
      fileName,
      entityRows: dataRows,
      workSheetName: "Vehicle Bookings",
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
export const useExportAuthVehicleBookings = ({
  handleSuccess,
}: { handleSuccess?: () => void } = {}) => {
  const { token, companyId } = useApiAuth();

  return useMutation(
    ({
      props,
      fileName,
    }: {
      props: TExportAuthVehicleBookingProps;
      fileName?: string;
    }) =>
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
