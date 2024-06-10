import React from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs, { Dayjs } from "dayjs";
import "react-big-calendar/lib/css/react-big-calendar.css";
import ErrorBoundary from "components/errorHandlers/ErrorBoundary";
import Skeleton from "antd/lib/skeleton/Skeleton";
import { ErrorWrapper } from "components/errorHandlers/ErrorWrapper";
import "../../styles/big-calender-override.css";
import { CancelCompanyTrainingSession } from "./CancelCompanyTrainingSession";
import { useGetTrainingBookings } from "features/billing/hooks/addOns/trainingSession/booking/useGetTrainingBookings";
import { truncateString } from "utils/dataHelpers/truncateString";
import { TTrainingSessionBooking } from "features/billing/types/addOns/trainingSession";

const localizer = dayjsLocalizer(dayjs);
const CompanyTrainingSessionCalender: React.FC<{
  filter?: Partial<
    Pick<TTrainingSessionBooking, "startDate" | "endDate" | "status">
  >;
}> = ({ filter }) => {
  const {
    data: bookings,
    isLoading,
    error,
    isError,
  } = useGetTrainingBookings({ props: filter });
  const [action, setAction] = React.useState<"cancel-training-session">();
  const [selectedEvent, setSelectedEvent] = React.useState<{
    id: number;
    title: string;
    start: Dayjs;
    end: Dayjs;
  }>();
  return (
    <ErrorBoundary>
      <Skeleton loading={isLoading} active paragraph={{ rows: 45 }}>
        <ErrorWrapper
          isError={isError}
          message={
            error?.response?.data?.message ??
            error?.response?.data?.error?.message
          }
        >
          {selectedEvent ? (
            <CancelCompanyTrainingSession
              open={action === "cancel-training-session"}
              handleClose={() => setAction(undefined)}
              booking={{
                endDate: selectedEvent?.end?.toISOString(),
                startDate: selectedEvent?.start?.toISOString(),
                id: selectedEvent?.id,
              }}
            />
          ) : null}
          <Calendar
            localizer={localizer}
            events={bookings?.data.map((item) => ({
              id: item.id,
              start: dayjs(item.startDate),
              end: dayjs(item.endDate),
              title: truncateString(item.reason ?? ""),
            }))}
            onSelectEvent={(event) => {
              setSelectedEvent(event);
              setAction("cancel-training-session");
            }}
            style={{ height: 500 }}
          />
        </ErrorWrapper>
      </Skeleton>
    </ErrorBoundary>
  );
};

export default CompanyTrainingSessionCalender;
