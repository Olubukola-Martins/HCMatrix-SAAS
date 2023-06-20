import React from "react";
import { SimpleCard } from "components/cards/SimpleCard";
import { TVehicleInUse } from "../types";
import { QUERY_KEY_FOR_VEHICLE_BOOKING_ANALYTICS_FOR_EMPLOYEE } from "../hooks/useGetVehicleEmployeeBookingAnalytics";
import { useQueryClient } from "react-query";
import { useEditVehicle } from "../hooks/useEditVehicle";
import { openNotification } from "utils/notifications";
import { TVehicleType } from "../hooks/useCreateVehicle";

interface IProps {
  data?: TVehicleInUse;
}

export const VehicleAssignedToEmployee: React.FC<IProps> = ({ data }) => {
  const title = data
    ? `Vehicle in Use: ${data?.color ? data.color : ""} ${data.model} ${
        data.brand
      }  ${data.type} `
    : "No Vehicle is currently assigned to you!";
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useEditVehicle();

  const handleReturnVehicle = () => {
    if (data) {
      mutate(
        {
          data: {
            type: data?.type as unknown as TVehicleType,
            brand: data?.brand,
            model: data?.model,
            plateNumber: data?.plateNumber,
            imageUrl: data?.imageUrl,
            color: data?.color,
            description: data?.description,
            purchaseDate: data?.purchaseDate,
            dateAssigned: null,
            cost: +data?.cost,
            status: "unassigned",
            assigneeId: null,
            documentUrls: data?.documentUrls ?? [],
          },
          id: data.id,
        },
        {
          onError: (err: any) => {
            openNotification({
              state: "error",
              title: "Error Occurred",
              description:
                err?.response.data.message ?? err?.response.data.error.message,
            });
          },
          onSuccess: (res: any) => {
            openNotification({
              state: "success",

              title: "Success",
              description: res.data.message,
              // duration: 0.4,
            });

            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY_FOR_VEHICLE_BOOKING_ANALYTICS_FOR_EMPLOYEE],
              // exact: true,
            });
          },
        }
      );
    }
  };
  return (
    <SimpleCard
      title={title}
      highlight={`${data?.plateNumber ?? ""}`}
      center
      loading={isLoading}
      action={
        data
          ? {
              label: "Return",
              variant: "style-with-class",
              handleClick: () => handleReturnVehicle(),
              additionalClassNames: [
                "border",
                "border-green-400",
                " hover:border-slate-800 hover:text-slate-800",
                "rounded",
                "font-medium",
                "bg-transparent",
                "transition",
                "ease-in-out",
                "duration-500",
                "text-sm text-green-400",
                "tracking-wider",
                "px-3 py-1",
              ],
            }
          : undefined
      }
    />
  );
};
