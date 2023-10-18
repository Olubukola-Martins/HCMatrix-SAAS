import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { AppButton } from "components/button/AppButton";
import React, { useState } from "react";
import {
  TVehicleBooking,
  useFetchVehicleBookings,
} from "../../hooks/useFetchVehicleBookings";
import { useApiAuth } from "hooks/useApiAuth";
import { usePagination } from "hooks/usePagination";
import moment from "moment";
import { AddVehicleBooking } from "../AddVehicleBooking";
import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";
import { ViewVehicleBooking } from "../ViewVehicleBooking";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";
import { useGetVehicleBookings4AuthEmployee } from "../../hooks/booking/useGetVehicleBookings4AuthEmployee";

export const EmployeeVehicleBookingHistory: React.FC<{
  title?: string;
}> = ({ title }) => {
  const { pagination, onChange } = usePagination();

  const { data, isFetching } = useGetVehicleBookings4AuthEmployee({
    pagination,
  });
  const [showM, setShowM] = useState(false);
  const [bookingId, setBookingId] = useState<number>();
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
      width: 100,
      fixed: "right",
      render: (_, item) => (
        <AppButton
          variant="transparent"
          label="View"
          handleClick={() => setBookingId(item.id)}
        />
      ),
    },
  ];

  return (
    <>
      <AddVehicleBooking open={showM} handleClose={() => setShowM(false)} />
      {bookingId && (
        <ViewVehicleBooking
          open={!!bookingId}
          handleClose={() => setBookingId(undefined)}
          bookingId={bookingId}
        />
      )}
      <div className="flex flex-col gap-2">
        <h4 className="text-lg font-light">{title}</h4>
        <div className="flex items-center gap-3 justify-between">
          <i className="ri-download-2-line text-lg"></i>
          <div className="my-5 flex justify-end gap-3">
            <AppButton
              label="Book Vehicle"
              handleClick={() => setShowM(true)}
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
