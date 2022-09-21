import React from "react";
import roundgraph from "../../Assets/Images/roundgraph.svg";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

const AssetOverview = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    // Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {},
  };

  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Nov",
    "Dec",
  ];

  const data = {
    labels,
    datasets: [
      {
        // label: "Dataset 1",
        data: [1, 2, 5, 8, 10, 9, 7, 0, 5, 1, 12, 2, 30],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  const requestStyle =
    "flex items-center justify-between cursor-pointer group border-b pb-2";

  return (
    <div>
      <div className="flex items-center gap-3 justify-end">
        <button className="button">Add Asset</button>
        <button
          className="transparentButton"
          style={{ color: "var(--caramel)" }}
        >
          Add Asset Type
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        <div className="col-span-3">
          <Line options={options} data={data} />
        </div>
        <div className="bg-mainBg border mt-4 rounded-lg text-sm shadow">
          <div className="flex items-center justify-between px-3 py-3 border-b">
            <p className="font-medium">Recent Requests </p>
            <span className="text-xs">Status</span>
          </div>
          <div className="flex flex-col gap-3 px-3 py-2">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className={requestStyle}>
                <h5 className="group-hover:text-caramel font-medium">
                  HP EliteBook
                </h5>
                <span className="text-xs">14 Sep,2022</span>
              </div>
            ))}
          </div>
          <h2 className="text-caramel pr-3 text-sm font-semibold cursor-pointer underline text-right hover:text-accent pb-2 pt-1">
            See All
          </h2>
        </div>
      </div>

      <h3 className="pt-10 pb-6 font-semibold">Asset Type</h3>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="border rounded-md p-2 shadow-sm bg-card"
              >
                <div className="rounded-md bg-mainBg shadow p-3 border">
                  <p className="text-sm py-2">Furniture & Fittings</p>
                  <h2 className="font-semibold">0</h2>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border rounded-md p-2 shadow">
          <p>Asset by Status</p>
          <div className="flex justify-center">
            <img src={roundgraph} alt="graph" className="h-36" />
          </div>

          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-caramel" />
              <span className="text-sm">0 Assigned</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded"
                style={{ background: "#FFA600" }}
              />
              <span className="text-sm">0 Unassigned</span>
            </div>
          </div>
          <div className="flex justify-between mt-1">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded"
                style={{ background: "#FFF0F0" }}
              />
              <span className="text-sm">0 Under Repair</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-card" />
              <span className="text-sm">0 Condemned</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetOverview;
