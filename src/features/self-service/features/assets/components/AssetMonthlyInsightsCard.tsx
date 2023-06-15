import { Select, Skeleton } from "antd";
import { LineChart } from "components/charts/LineChart";
import { ChartSwitcher } from "components/controls/ChartSwitcher";
import { MONTH_CHART_LABELS } from "constants/general";
import { useGetAssetAnalytics } from "../hooks/useGetAssetAnalytics";
import { useState } from "react";

const items = ["Total Assets Cost", "Total Assets Issued Out"];
export const AssetMonthlyInsightsCard = () => {
  const [year, setYear] = useState<string>();

  const { data, isLoading } = useGetAssetAnalytics({ year });
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
            value={year}
            placeholder="Year"
            onSelect={(val: string) => setYear(val)}
            options={["2023", "2022", "2021"].map((item) => ({
              label: item,
              value: item,
            }))}
          />
        </div>
      </div>
      <Skeleton active paragraph={{ rows: 9 }} loading={isLoading}>
        <LineChart
          data={data ? Object.values(data?.totalAssetsCost.costsByMonth) : []}
          // labels={MONTH_CHART_LABELS}
          labels={data ? Object.keys(data?.totalAssetsCost.costsByMonth) : []}
          dataEntityLabel="assets"
          bgColors={"#ff6647"}
        />
      </Skeleton>
    </div>
  );
};
