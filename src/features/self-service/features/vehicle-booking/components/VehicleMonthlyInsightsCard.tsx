import { Select } from "antd";
import { LineChart } from "components/charts/LineChart";
import { MONTH_CHART_LABELS } from "constants/general";

export const VehicleMonthlyInsightsCard = () => {
  return (
    <div className="col-span-3 bg-mainBg border mt-4 rounded-lg text-sm shadow p-3">
      <div className="flex  justify-between">
        <div>
          <h4>Total Vehicles</h4>
          <span className="font-semibold text-lg">0</span>
        </div>
        <div>
          <Select
            placeholder="Last 12 months"
            options={["last 12 months", "2022", "2021"].map((item) => ({
              label: item,
              value: item,
            }))}
          />
        </div>
      </div>
      <LineChart
        data={Array(12).fill(12)}
        labels={MONTH_CHART_LABELS}
        dataEntityLabel="vehicles"
        bgColors={"#aaa"}
      />
    </div>
  );
};
