import { Select, Skeleton } from "antd";
import { LineChart } from "components/charts/LineChart";
import { ChartSwitcher } from "components/controls/ChartSwitcher";

import { useState } from "react";
import { useGetLoanAnalytics } from "../../hooks/analytics/useGetLoanAnalytics";

const items = ["Total", "Pending", "Approved", "Rejected"];
export const LoanInsightsCard = () => {
  const [year, setYear] = useState<string>();

  const { data, isLoading } = useGetLoanAnalytics({
    type: "all",
    props: { year },
  });
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
          data={data ? Object.values(data?.graphData.countsByMonth) : []}
          labels={data ? Object.keys(data?.graphData.countsByMonth) : []}
          dataEntityLabel="loans"
          bgColors={"#ff6647"}
        />
      </Skeleton>
    </div>
  );
};
