import { DatePicker, Skeleton } from "antd";
import { LineChart } from "components/charts/LineChart";
import { ChartSwitcher } from "components/controls/ChartSwitcher";
import { useState } from "react";
import { APPROVAL_STATUS_OPTIONS } from "constants/statustes";
import { TApprovalStatus } from "types/statuses";
import { useGetGraphData } from "../../hooks/analytics/useGetGraphData";

const items = APPROVAL_STATUS_OPTIONS.map((item) => item.value);
export const LoanInsightsCard = () => {
  const [year, setYear] = useState<string>("2023");
  const [status, setStatus] = useState<TApprovalStatus[]>(items);
  const { data, isLoading } = useGetGraphData({
    props: { year, status },
  });

  return (
    <div className="col-span-3 bg-mainBg border flex flex-col gap-4 rounded-lg text-sm shadow p-3">
      <div className="flex justify-between">
        <ChartSwitcher
          items={["total", ...items]}
          handleClick={(key) => {
            if (key === "total") {
              setStatus(items);
              return;
            }
            setStatus([key as TApprovalStatus]);
          }}
        />
        <div>
          <DatePicker
            picker="year"
            className="w-full"
            placeholder="Select Year"
            onChange={(val) => setYear(val ? val.format("YYYY") : "")}
          />
        </div>
      </div>
      <Skeleton active paragraph={{ rows: 9 }} loading={isLoading}>
        <LineChart
          data={data ? Object.values(data?.countsByMonth) : []}
          labels={data ? Object.keys(data?.countsByMonth) : []}
          dataEntityLabel="loans"
          bgColors={"#ff6647"}
        />
      </Skeleton>
    </div>
  );
};
