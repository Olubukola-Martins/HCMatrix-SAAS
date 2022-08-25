import React, { useState } from "react";
import DashboardLayout from "../../Layout/DashboardLayout";
import PayrollCycle from "../Assets/Images/payrollCycle.svg";
import Group from "../Assets/Images/group.svg";
import DollarBox from "../Assets/Images/dollarBox.svg";
import { LineChart } from "../Components/LineChart";

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
  const [active, setActive] = useState("gross income");
  const [showItems, setShowItems] = useState(false);
  return (
    <DashboardLayout>
      <div className="Container mt-4 pb-8 text-accent">
        <div className="flex justify-between items-center mb-6">
          <span className="font-bold text-xl">Payroll</span>
          <button className="button">Run Payroll</button>
        </div>

        <div className="grid grid-cols-4 gap-x-4 gap-y-8">
          {/* payroll history */}

          <div className="border border-caramel rounded-lg flex flex-col gap-2 w-full  p-3 bg-slate-100">
            <div className="bg-white rounded-lg p-2 flex flex-col gap-4 flex-1">
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

          <div className="border border-caramel rounded-lg flex flex-col gap-2 w-full  p-3 bg-slate-100">
            <div className="bg-white rounded-lg p-2 flex flex-col gap-4 flex-1">
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
          {/* payroll cycle */}

          <div className="border border-caramel rounded-lg flex flex-col gap-2 w-full  p-3 bg-slate-100">
            <div className="bg-white rounded-lg p-2 flex flex-col gap-4 flex-1">
              <div className="flex items-center gap-2">
                <div className="bg-caramel p-2 rounded-full min-h-min min-w-min">
                  <img src={PayrollCycle} alt="bg" className="h-6 w-6" />
                </div>{" "}
                <h4 className="font-light text-sm">Payroll Cycle</h4>
              </div>
              {/* price */}
              <span className="block font-bold text-xl">May 2022</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm">View</span>
              <i className="ri-arrow-right-s-line text-xl" title="view"></i>
            </div>
          </div>
          {/* pending set up */}

          <div
            className={`cursor-pointer ${
              showItems && "row-span-3"
            } border border-caramel rounded-lg flex flex-col gap-2 w-full  p-3 bg-slate-100`}
            onClick={() => setShowItems((val) => !val)}
          >
            <div className="rounded-lg p-2 flex flex-col gap-8">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-base">Pending Setup</h4>
                <i className="ri-arrow-down-s-line text-xl" title="view"></i>
              </div>
              <div className="flex flex-col gap-3">
                <div className="setUp_progress2 general_setup">
                  <div className="setUp_progress-bar2" />
                </div>
                <span className="text-sm font-light">3/10 complete</span>
              </div>
              {/* items */}
              <div className="flex flex-col gap-4">
                {showItems &&
                  pendingItems.map((item, index) => (
                    <div
                      className="flex gap-4 items-center text-xs"
                      key={item.content}
                    >
                      <div
                        className={`min-h-min min-w-min ${
                          item.done ? "bg-caramel" : "bg-gray-400"
                        } flex items-center justify-center  rounded-full text-white p-1 h-4 w-4`}
                      >
                        <span className="block ">{index + 1}</span>
                      </div>

                      <p>{item.content}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Payroll graph & charts  */}
          <div
            className={`flex flex-col gap-4 w-full ${
              showItems ? "col-span-3" : "col-span-4"
            }`}
          >
            {/* top */}
            <div className="flex justify-between items-center">
              <h4 className="text-lg">Payroll Graphs and Charts</h4>

              <div className="flex gap-2 text-sm">
                <div className="flex gap-2 lg:items-center flex-col lg:flex-row">
                  <div className="flex-1  self-start">
                    <select
                      className="w-full  border rounded px-4 border-black"
                      name="filterInfo"
                      component="select"
                      placeholder="Bar Chart"
                    >
                      <option value="barChart" selected>
                        Bar Chart
                      </option>
                      <option value="pieChart">Pie Chart</option>
                      <option value="orgChart">Histogram</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-2 lg:items-center flex-col lg:flex-row">
                  <div className="flex-1  self-start">
                    <input
                      className="w-full border rounded px-4 border-black"
                      name="date"
                      type="text"
                      placeholder="23 - 09 - 2022"
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
                  className={`border border-r flex-1 h-12 flex capitalize items-center justify-center cursor-pointer bg-slate-100 text-xs ${
                    active === item.name ? "text-caramel" : "text-gray-800"
                  }`}
                >
                  <span>{item.name}</span>
                </div>
              ))}
            </div>

            {/* the chart goes here */}
            <div className="h-72">
              <LineChart
                data={chartData.find((item) => item.name === active).data}
              />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
