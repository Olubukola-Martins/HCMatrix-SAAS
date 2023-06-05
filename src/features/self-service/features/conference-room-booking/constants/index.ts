import { TCRBookingStatus } from "../hooks/useFetchAllConferenceRoomBookings";

const CR_BOOKING_STATUSES: TCRBookingStatus[] = [
  "pending",
  "rejected",
  "approved",
];

export const CR_BOOKING_STATUS_OPTIONS: {
  label: string;
  value: TCRBookingStatus;
}[] = CR_BOOKING_STATUSES.map((item) => ({
  value: item,
  label: item,
}));
