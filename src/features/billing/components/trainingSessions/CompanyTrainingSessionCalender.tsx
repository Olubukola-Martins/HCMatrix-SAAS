import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import ErrorBoundary from "components/errorHandlers/ErrorBoundary";
import Skeleton from "antd/lib/skeleton/Skeleton";
import { ErrorWrapper } from "components/errorHandlers/ErrorWrapper";
import "../../styles/big-calender-override.css";

const localizer = momentLocalizer(moment);
const CompanyTrainingSessionCalender = () => {
  // TODO: Get event list from api
  return (
    <ErrorBoundary>
      <Skeleton loading={false} active paragraph={{ rows: 45 }}>
        <ErrorWrapper
          isError={false}
          message={`error?.response?.data?.message ??
              error?.response?.data?.error?.message`}
        >
          <Calendar
            localizer={localizer}
            events={[
              {
                start: moment("2024-01-11T12:00:00"),
                end: moment("2024-01-11T14:00:00"),
                title: "Training Session 1",
              },
              {
                start: moment("2024-01-11T15:00:00"),
                end: moment("2024-01-11T16:00:00"),
                title: "Training Session 2",
              },
              {
                start: moment("2024-01-24T15:00:00"),
                end: moment("2024-01-27T16:00:00"),
                title: "Training Session 3",
              },
            ]}
            style={{ height: 500 }}
          />
        </ErrorWrapper>
      </Skeleton>
    </ErrorBoundary>
  );
};

export default CompanyTrainingSessionCalender;
