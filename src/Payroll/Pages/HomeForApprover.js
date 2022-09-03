import React, { useState } from "react";
import DashboardLayout from "../../Layout/DashboardLayout";
import PayrollCycle from "../Assets/Images/payrollCycle.svg";
import Group from "../Assets/Images/group.svg";
import DollarBox from "../Assets/Images/dollarBox.svg";
import PayrollReview from "../Assets/Images/payrollReview.svg";
import { LineChart } from "../Components/LineChart";
import { BarChart } from "../Components/BarChart";
import { ScatterChart } from "../Components/ScatterChart";
import { PieChart } from "../Components/PieChart";
import { WaterFallChart } from "../Components/WaterFallChart";
import { AreaGraph } from "../Components/AreaGraph";
import { Histogram } from "../Components/Histogram";
import { AnimatePresence, motion } from "framer-motion";
import { SpiderChart } from "../Components/SpiderChart";

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "November",
  "December",
];

const Home = () => {
  const chartData = [
    {
      name: "net income",
      data: {
        labels,
        datasets: [
          {
            label: "Net Income",
            data: [18, 19, 20, 28, 10, 29, 7, 0, 35, 27, 12, 20, 30],
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
        ],
      },
    },
    {
      name: "gross income",
      data: {
        labels,
        datasets: [
          {
            label: "Gross Income",
            data: [1, 2, 5, 8, 10, 9, 7, 0, 5, 1, 12, 2, 30],
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
        ],
      },
    },
    {
      name: "Employee Tax",
      data: {
        labels,
        datasets: [
          {
            label: "Employee Tax",
            data: [1, 2, 5, 48, 10, 49, 20, 0, 5, 1, 12, 2, 30],
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
        ],
      },
    },
    {
      name: "Pension",
      data: {
        labels,
        datasets: [
          {
            label: "Pension",
            data: [1, 2, 5, 8, 10, 9, 7, 0, 5, 1, 12, 2, 30].reverse(),
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
        ],
      },
    },
    {
      name: "Total Deductions",
      data: {
        labels,
        datasets: [
          {
            label: "Total Deductions",
            data: [31, 52, 35, 48, 10, 9, 7, 0, 5, 11, 12, 2, 30],
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
        ],
      },
    },
    {
      name: "Total Allowances",
      data: {
        labels,
        datasets: [
          {
            label: "Total Allowances",
            data: [1, 21, 5, 8, 40, 9, 7, 0, 5, 1, 32, 2, 30],
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
        ],
      },
    },
  ];
  const pendingItems = [
    { content: "Complete company profile", done: true },
    { content: "Create cost center/branch", done: true },
    { content: "Add Employees", done: true },
    { content: "Create paygrades", done: true },
    { content: "Create groups", done: false },
    { content: "Create/Select Approval Workflow  ", done: false },
    { content: "Set-up Salary Type/ scheme ", done: false },
    { content: "Create Attendance/Time Track Team", done: false },
    { content: "Create/Select Department", done: false },
    { content: "Select	Payroll Frequency", done: false },
    { content: "Create Wallet", done: false },
    { content: "Run Payroll", done: false },
  ];
  const chartFilters = [
    { id: "1", name: "Net Income" },
    { id: "2", name: "Gross Income" },
    { id: "3", name: "Pension" },
    { id: "4", name: "Employees Taxes" },
    { id: "5", name: "Total Deductions" },
    { id: "6", name: "Total Allowances" },
  ];
  const [currentChart, setCurrentChart] = useState("line-chart");
  const [active, setActive] = useState("gross income");
  const [showItems, setShowItems] = useState(false);
  return (
    <DashboardLayout>
      <div className="Container mt-4 pb-8 text-accent">
        <div className="flex justify-between items-center mb-6">
          <span className="font-bold text-xl">Payroll</span>
          <button className="button">Run Payroll</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-4 gap-y-12">
          {/* payroll history */}

          <div className="border border-caramel rounded-xl flex flex-col gap-2 w-full  p-3 bg-slate-100">
            <div className="bg-white rounded-xl p-2 flex flex-col gap-4 flex-1">
              <div className="flex items-center gap-2">
                <div className="bg-caramel p-2 rounded-full min-h-min min-w-min">
                  <img src={DollarBox} alt="bg" className="h-6 w-6" />
                </div>{" "}
                <h4 className="font-light text-sm">Payroll History</h4>
              </div>
              {/* price */}
              <span className="block font-bold text-xl">N0.00</span>
              <span className="block text-xs">
                Compared to N0.00 last month{" "}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm">View</span>
              <i className="ri-arrow-right-s-line text-xl" title="view"></i>
            </div>
          </div>
          {/* employees */}

          <div className="border border-caramel rounded-xl flex flex-col gap-2 w-full  p-3 bg-slate-100">
            <div className="bg-white rounded-xl p-2 flex flex-col gap-4 flex-1">
              <div className="flex items-center gap-2">
                <div className="bg-caramel p-2 rounded-full min-h-min min-w-min">
                  <img src={Group} alt="bg" className="h-6 w-6" />
                </div>{" "}
                <h4 className="font-light text-sm">Employees</h4>
              </div>
              {/* price */}
              <span className="block font-bold text-xl">N0.00</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm">View</span>
              <i className="ri-arrow-right-s-line text-xl" title="view"></i>
            </div>
          </div>

          {/* approval */}

          <div className="border border-caramel rounded-xl flex flex-col gap-2 w-full  p-3 bg-slate-100">
            <div className="bg-white rounded-xl p-2 flex flex-col gap-4 flex-1">
              <div className="flex items-center gap-2">
                <div className="bg-caramel p-2 rounded-full min-h-min min-w-min">
                  <img src={PayrollReview} alt="bg" className="h-6 w-6" />
                </div>{" "}
                <h4 className="font-light text-sm">Review Payroll</h4>
              </div>
              {/* price */}
              <div className="flex items-center justify-between">
                <span className="block  text-lg">May 2022</span>
                <span className="block font-bold text-lg">N 0.00</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm">Click here to review payroll</span>
            </div>
          </div>

          {/* approval */}

          <div className="border border-caramel rounded-xl flex flex-col gap-2 w-full  p-3 bg-slate-100">
            <div className="bg-caramel rounded-xl p-2 flex flex-col gap-4 flex-1 text-white">
              <div className="flex items-center gap-2">
                <div className="bg-white rounded-full h-8 w-8 text-caramel flex justify-center items-center">
                  <i className="ri-check-double-line p-2 text-lg "></i>
                </div>{" "}
                <h4 className="font-light text-sm">Review Payroll</h4>
              </div>
              {/* price */}
              <div className="flex items-center justify-between">
                <span className="block  text-lg">May 2022</span>
                <span className="block font-bold text-lg">N 0.00</span>
              </div>
              <span className="text-sm font-light flex-1 block mt-6">
                Click here to approve payroll
              </span>
            </div>

            <div className="flex items-center justify-between"></div>
          </div>
          <AnimatePresence exitBeforeEnter>
            {/* pending set up */}

            {/* Payroll graph & charts  */}
            <motion.div
              layout
              transition={{
                layout: {
                  duration: showItems ? 0.1 : 0.5,
                  ease: showItems ? "easeIn" : "easeOut",
                },
              }}
              className={`flex flex-col lg:col-span-4 gap-4 w-full `}
            >
              {/* top */}
              <div className="flex justify-between items-center">
                <h4 className="text-lg">Payroll Graphs and Charts</h4>

                <div className="flex gap-2 text-sm">
                  <div className="flex gap-2 lg:items-center flex-col lg:flex-row">
                    <div className="flex-1  self-start">
                      <select
                        className="w-full  border rounded px-2 py-2 border-black"
                        name="filterInfo"
                        component="select"
                        placeholder="Bar Chart"
                        onChange={(e) => setCurrentChart(e.target.value)}
                      >
                        <option value="line-chart" selected>
                          Line Chart
                        </option>
                        <option value="bar-chart">Bar Chart</option>
                        {/* <option value="combo-chart">Combo Chart</option> */}
                        <option value="scatter-chart">Scatter Chart</option>
                        <option value="waterfall-chart">Waterfall Chart</option>
                        <option value="pie-chart">Pie Chart</option>
                        <option value="histogram">Histogram</option>
                        {/* <option value="gauge-chart">Gauge Chart</option> */}
                        <option value="area-graph">Area Graph</option>
                        <option value="spider-chart">Spider Chart</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-2 lg:items-center flex-col lg:flex-row">
                    <div className="flex-1  self-start">
                      <input
                        className="w-32 border rounded px-2 py-2 border-black"
                        name="date"
                        type="text"
                        placeholder="23-09-2022"
                        onFocus={(e) => (e.target.type = "date")}
                        onBlur={(e) => (e.target.type = "text")}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* nav */}
              <div className="flex rounded-md overflow-hidden">
                {chartData.map((item) => (
                  <div
                    onClick={() => setActive(item.name)}
                    className={`border border-r flex-1 h-12 hover:text-caramel flex capitalize items-center justify-center cursor-pointer bg-slate-100 text-xs ${
                      active === item.name ? "text-caramel" : "text-gray-800"
                    }`}
                  >
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>

              {/* the chart goes here */}
              <div className="h-72">
                {currentChart === "line-chart" && (
                  <LineChart
                    data={chartData.find((item) => item.name === active).data}
                  />
                )}
                {currentChart === "bar-chart" && (
                  <BarChart
                    data={chartData.find((item) => item.name === active).data}
                  />
                )}
                {currentChart === "scatter-chart" && (
                  <ScatterChart
                    data={chartData.find((item) => item.name === active).data}
                  />
                )}
                {currentChart === "pie-chart" && (
                  <PieChart
                    data={chartData.find((item) => item.name === active).data}
                  />
                )}
                {currentChart === "area-graph" && (
                  <AreaGraph
                    data={chartData.find((item) => item.name === active).data}
                  />
                )}
                {currentChart === "waterfall-chart" && (
                  <WaterFallChart
                    data={chartData.find((item) => item.name === active).data}
                  />
                )}
                {currentChart === "histogram" && (
                  <Histogram
                    data={chartData.find((item) => item.name === active).data}
                  />
                )}
                {currentChart === "spider-chart" && (
                  <SpiderChart
                    data={chartData.find((item) => item.name === active).data}
                  />
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
