import { DatePicker, Skeleton } from "antd";
import { LineChart } from "components/charts/LineChart";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useGetAssetAnalytics } from "../hooks/useGetAssetAnalytics";

export const AssetMonthlyInsightsCard = () => {
  const [year, setYear] = useState<Dayjs | null>(dayjs());

  const { data, isLoading } = useGetAssetAnalytics({
    year: year?.format("YYYY"),
  });
  return (
    <div className="col-span-3 bg-mainBg border flex flex-col gap-4 rounded-lg text-sm shadow p-3">
      <div className="flex justify-between">
        <div>
          {/* TODO: Uncomment when fleshed out */}
          {/* <ChartSwitcher
          items={items}
          handleClick={(key) => {
            // TO DO: HANDLE SWITCH LOGIC HERE
            console.log(key);
          }}
        /> */}
        </div>
        <div>
          <DatePicker
            value={year}
            onChange={(val) => setYear(val)}
            picker="year"
            placeholder="Year"
          />
        </div>
      </div>
      <Skeleton active paragraph={{ rows: 9 }} loading={isLoading}>
        <LineChart
          data={data ? Object.values(data?.totalAssetsCost.costsByMonth) : []}
          labels={data ? Object.keys(data?.totalAssetsCost.costsByMonth) : []}
          dataEntityLabel="assets"
          bgColors={"#ff6647"}
        />
      </Skeleton>
    </div>
  );
};
