import { DatePicker, Select } from "antd";
import { ChartSwitcher } from "components/controls/ChartSwitcher";
import React from "react";

const CHART_ITEMS = [
  "bar-chart",
  "scatter-chart",
  "waterfall-chart",
  "pie-chart",
  "histogram",
  "area-graph",
  "spider-chart",
];

const PAYROLL_ITEMS = [
  "Net Income",
  "Gross income",
  "Tax",
  "Pension",
  "Total Deductions",
  "Total Allowances",
];
const PayrollOverviewChart = () => {
  const handlePayrollItemSelection = (val: string) => {};
  return (
    <div className="flex flex-col gap-4">
      {/* header */}
      <div className="flex justify-between items-center">
        <h4 className="text-lg">Payroll Graphs and Charts</h4>

        <div className="flex gap-2 text-sm">
          <div>
            <Select
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
              picker="year"
              className="w-full"
              placeholder="Select Year"
            />
          </div>
        </div>
      </div>
      {/* payroll Item controller */}
      <ChartSwitcher
        items={PAYROLL_ITEMS}
        handleClick={(key) => handlePayrollItemSelection(key)}
      />
      <div className="h-72"></div>
    </div>
  );
};

export default PayrollOverviewChart;
