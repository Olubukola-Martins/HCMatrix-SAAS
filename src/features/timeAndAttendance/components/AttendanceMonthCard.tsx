import { LineChart } from "components/charts/LineChart";
import { ChartSwitcher } from "components/controls/ChartSwitcher";
import { MONTH_CHART_LABELS } from "constants/general";

const items = ["Days", "Week", "Month"];
export const AttendanceMonthCard = () => {
  return (
    <div className="col-span-3 bg-mainBg border flex flex-col gap-4 mt-4 rounded-lg text-sm shadow p-3">
      <ChartSwitcher
        items={items}
        handleClick={(key) => {
          // TO DO: HANDLE SWITCH LOGIC HERE
          console.log(key);
        }}
      />

      <LineChart
        data={Array(12).fill(12)}
        labels={MONTH_CHART_LABELS}
        dataEntityLabel=""
        bgColors={"#aaa"}
      />
    </div>
  );
};
