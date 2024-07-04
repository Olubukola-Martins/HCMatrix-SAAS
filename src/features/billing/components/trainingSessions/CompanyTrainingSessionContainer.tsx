import React from "react";
import CompanyTrainingSessionCalender from "./CompanyTrainingSessionCalender";
import { TTrainingSessionBookingStatus } from "features/billing/types/addOns/trainingSession";
import { DatePicker } from "antd";
import { SelectTrainingBookingStatus } from "./booking/SelectTrainingBookingStatus";
import { Dayjs } from "dayjs";

const CompanyTrainingSessionContainer = () => {
  const [duration, setDuration] =
    React.useState<[Dayjs | null, Dayjs | null]>();
  const [status, setStatus] = React.useState<TTrainingSessionBookingStatus>();
  return (
    <div className="flex flex-col gap-4">
      <p className=" font-light">
        Schedule your training session and cancel them by clicking on the event
        on the calender.
      </p>
      <div className="flex gap-4 justify-end">
        <DatePicker.RangePicker
          allowClear
          value={duration}
          onChange={(vals) =>
            vals &&
            Array.isArray(vals) &&
            vals?.length === 2 &&
            setDuration([vals?.[0], vals?.[1]])
          }
        />
        <SelectTrainingBookingStatus
          onSelect={setStatus}
          onClear={() => setStatus(undefined)}
        />
      </div>
      <div>
        <CompanyTrainingSessionCalender
          filter={{
            startDate: duration?.[0]?.toISOString(),
            endDate: duration?.[1]?.toISOString(),
            status,
          }}
        />
      </div>
    </div>
  );
};

export default CompanyTrainingSessionContainer;
