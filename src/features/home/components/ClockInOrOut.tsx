import LiveClock from "components/clock/LiveClock";
import React from "react";

const ClockInOrOut = () => {
  return (
    <div className="shadow px-2 py-3 rounded  border">
      <h2 className="font-semibold pb-3">
        <LiveClock format="hh:mm:ss A" />
        {/* TODO: Implement 12 hr format when accounted from company settings */}
      </h2>
      <button className="button w-full">Clock - In</button>
    </div>
  );
};

export default ClockInOrOut;
