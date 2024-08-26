import { DatePicker, Select, Skeleton } from "antd";
import { TPayrollGraphAnalyticsItemType } from "features/payroll/types/payroll";
import dayjs from "dayjs";
import { IDivProps } from "types/html";
import { TPayrollWalletDashboardAnalytics } from "features/payroll/types/wallet";
import { BarChart, LineChart } from "components/charts";

const CHART_ITEMS: TPayrollGraphAnalyticsItemType[] = [
  "bar-chart",
  "line-chart",

];

type IProps = Pick<IDivProps, "className">&{
  setChartItem: React.Dispatch<React.SetStateAction<TPayrollGraphAnalyticsItemType>>,
  setYear: React.Dispatch<React.SetStateAction<string>>,
  year:string, 
  chartItem:TPayrollGraphAnalyticsItemType,
  isLoading?:boolean
  data?: TPayrollWalletDashboardAnalytics['graphData']
};

const WalletOverviewBalanceGraph: React.FC<IProps> = ({
  className = "flex flex-col gap-4",
  year, 
  setYear, 
  chartItem, 
  setChartItem,
  data, 
  isLoading
}) => {
 




  return (
    <div className={className}>
      {/* header */}
      <div className="flex justify-between items-center">
        <h4 className="text-lg font-semibold">Wallet Balance</h4>

        <div className="flex gap-2 text-sm">
          <div>
            <Select
              value={chartItem}
              onSelect={(val: TPayrollGraphAnalyticsItemType) =>
                setChartItem(val)
              }
              options={CHART_ITEMS.map((item) => ({
                value: item,
                label: (
                  <span className="capitalize">
                    {item.split("-").join(" ")}
                  </span>
                ),
              }))}
              placeholder={`Select Component`}
            />
          </div>
          <div>
            <DatePicker
              value={dayjs(year)}
              picker="year"
              className="w-full"
              placeholder="Select Year"
              onChange={(val) => setYear(val.format("YYYY"))}
            />
          </div>
        </div>
      </div>
   <Skeleton loading={isLoading} active paragraph={{rows: 15}}>
   {chartItem === "bar-chart" && (
          <BarChart
          data={data ? Object.values(data) : []}
          labels={data ? Object.keys(data) : []}
            dataEntityLabel="Amount"
            bgColors={"#ff6647"}
          />
        )}
   {chartItem === "line-chart" && (
          <LineChart
          data={data ? Object.values(data) : []}
          labels={data ? Object.keys(data) : []}
            dataEntityLabel="Amount"
            bgColors={"#ff6647"}
          />
        )}
   </Skeleton>
    </div>
  );
};

export default WalletOverviewBalanceGraph;
