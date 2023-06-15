import { Select } from "antd";
import { LineChart } from "components/charts/LineChart";
import { ChartSwitcher } from "components/controls/ChartSwitcher";
import { MONTH_CHART_LABELS } from "constants/general";

const items = ["Total Assets Cost", "Total Assets Issued Out"];
export const AssetMonthlyInsightsCard = () => {
  return (
    <div className="col-span-3 bg-mainBg border flex flex-col gap-4 rounded-lg text-sm shadow p-3">
      <div className="flex justify-between">
        <ChartSwitcher
          items={items}
          handleClick={(key) => {
            // TO DO: HANDLE SWITCH LOGIC HERE
            console.log(key);
          }}
        />
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
        dataEntityLabel="assets"
        bgColors={"#aaa"}
      />
    </div>
  );
};
