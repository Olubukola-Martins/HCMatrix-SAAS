import LiveClock from "components/clock/LiveClock";
import { SoftClockIn } from "features/timeAndAttendance/components/SoftClockIn";
import { SoftClockOut } from "features/timeAndAttendance/components/SoftClockOut";
import { useClockingAndBreakStatus } from "features/timeAndAttendance/hooks/useClockingAndBreakStatus";

const ClockInOrOut = () => {
  const { data } = useClockingAndBreakStatus();
  return (
    <div className="shadow px-2 py-3 rounded  border">
      <h2 className="font-semibold pb-3">
        <LiveClock format="hh:mm:ss A" />
        {/* TODO: Implement 12 hr format when accounted from company settings */}
      </h2>

      {data?.clocking.clockIn !== null && data?.clocking.clockOut === null ? (
        <SoftClockOut componentType="button" />
      ) : (
        <SoftClockIn componentType="button" />
      )}
    </div>
  );
};

export default ClockInOrOut;
