import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { AppButton } from "components/button/AppButton";
import React, { useState } from "react";
import { TVehicleBooking } from "../../hooks/useFetchVehicleBookings";
import { usePagination } from "hooks/usePagination";
import moment from "moment";
import { AddVehicleBooking } from "../AddVehicleBooking";
import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";
import { ViewVehicleBooking } from "../ViewVehicleBooking";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";
import { useGetVehicleBookings4AuthEmployee } from "../../hooks/booking/useGetVehicleBookings4AuthEmployee";
import { CancelVehicleBooking } from "./CancelVehicleBooking";
import ViewApprovalStages from "features/core/workflows/components/approval-request/ViewApprovalStages";

type TAction = "add" | "view" | "cancel" | "view-approval-stages";
export const EmployeeVehicleBookingHistory: React.FC<{
  title?: string;
}> = ({ title }) => {
  const { pagination, onChange } = usePagination();

  const { data, isFetching } = useGetVehicleBookings4AuthEmployee({
    pagination,
  });
  const [showM, setShowM] = useState<TAction>();
  const [booking, setBooking] = useState<TVehicleBooking>();
  const handleAction = (action: TAction, item?: TVehicleBooking) => {
    setBooking(item);
    setShowM(action);
  };
  const columns: ColumnsType<TVehicleBooking> = [
    {
      title: "Booking Date",
      dataIndex: "Booking Date",
      key: "Booking Date",
      render: (_, item) => moment(item.date).format("YYYY-MM-DD"),
    },
    {
      title: "Employee",
      dataIndex: "Employee",
      key: "Employee",
      render: (_, item) => (
        <span className="capitalize">{getEmployeeFullName(item.employee)}</span>
      ),
    },
    {
      title: "Vehicle Brand",
      dataIndex: "brand",
      key: "brand",
      render: (_, item) => item.vehicle.brand,
    },
    {
      title: "Plate No",
      dataIndex: "Plate No",
      key: "Plate No",
      render: (_, item) => item.vehicle.plateNumber,
    },
    {
      title: "Vehicle Type",
      dataIndex: "Vehicle Type",
      key: "Vehicle Type",
      render: (_, item) => item.vehicle.type,
    },

    {
      title: "Status",
      dataIndex: "Status",
      key: "Status",
      render: (_, item) => (
        <span
          className={`capitalize`}
          style={{ color: getAppropriateColorForStatus(item.status) }}
        >
          {item.status}
        </span>
      ),
    },
    {
      title: "Duration(hrs)",
      dataIndex: "duration",
      key: "duration",
      render: (_, item) => item.duration,
    },
    {
      title: "Destination",
      dataIndex: "destination",
      key: "destination",
      ellipsis: true,
      render: (_, item) => item.destination,
    },

    {
      title: "Action",
      key: "Action",
      render: (_, item) => (
        <div className="flex justify-end gap-3">
          <AppButton
            label="View"
            handleClick={() => handleAction("view", item)}
            variant="default"
          />
          <AppButton
            variant="transparent"
            label="View Stages"
            handleClick={() => handleAction("view-approval-stages", item)}
          />
          <AppButton
            variant="style-with-class"
            label="Cancel"
            disabled={item.status !== "pending"}
            additionalClassNames={[
              "neutralButton",
              "disabled:cursor-not-allowed",
              "disabled:bg-slate-200",
              "disabled:border-none",
            ]}
            handleClick={() => handleAction("cancel", item)}
          />
        </div>
      ),
    },
  ];
  const onClose = () => {
    setShowM(undefined);
    setBooking(undefined);
  };
  return (
    <>
      <AddVehicleBooking open={showM === "add"} handleClose={onClose} />
      <CancelVehicleBooking
        open={showM === "cancel"}
        data={booking}
        handleClose={onClose}
      />
      {booking && (
        <ViewVehicleBooking
          open={showM === "view"}
          handleClose={onClose}
          bookingId={booking.id}
        />
      )}
      {booking && (
        <ViewApprovalStages
          handleClose={onClose}
          open={showM === "view-approval-stages"}
          id={booking?.id}
          type="vehicle"
        />
      )}
      <div className="flex flex-col gap-2">
        <h4 className="text-lg font-light">{title}</h4>
        <div className="flex items-center gap-3 justify-between">
          <i className="ri-download-2-line text-lg"></i>
          <div className="my-5 flex justify-end gap-3">
            <AppButton
              label="Book Vehicle"
              handleClick={() => setShowM("add")}
            />
          </div>
        </div>
        <Table
          columns={columns}
          size="small"
          dataSource={data?.data}
          loading={isFetching}
          pagination={{ ...pagination, total: data?.total }}
          onChange={onChange}
        />
      </div>
    </>
  );
};
