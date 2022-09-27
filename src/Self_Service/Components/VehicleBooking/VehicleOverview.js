import React, { useState } from "react";
import roundgraph from "../../Assets/Images/roundGraph.svg";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Popover } from "@mui/material";
import Themes from "../../../Themes/Themes";

const VehicleOverview = () => {
  // chart start
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

  // chart end==

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const requestStyle =
    "flex items-center justify-between cursor-pointer group border-b pb-2";

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {["Cars", "Buses", "Trucks", "Bikes"].map((item) => (
          <div
            key={item}
            className="border rounded-md p-2 shadow-sm bg-card hover:shadow-md cursor-pointer group"
          >
            <div className="rounded-md bg-mainBg shadow p-3 group-hover:border-b-2 group-hover:border-caramel">
              <p className="text-sm font-medium py-3">{item}</p>
              <h2 className="font-semibold text-lg">0</h2>
            </div>
          </div>
        ))}
      </div>

      {/* second layer */}
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-5 mt-5">
        <div className="col-span-3 bg-mainBg border mt-4 rounded-lg text-sm shadow p-3">
          <div className="flex gap-3 justify-between">
            <div>
              <h4>Total Vehicles</h4>
              <span className="font-semibold text-lg">0</span>
            </div>
            <select
              name=""
              id=""
              className="border px-2 py-2 rounded focus:outline-none bg-mainBg"
            >
              <option value="">Last 12 months</option>
              <option value="Last 3 months">Last 3 months</option>
            </select>
          </div>
          <Line options={options} data={data} />
        </div>

        <div>
          <div className="bg-mainBg border mt-4 rounded-lg text-sm shadow">
            <div className="text-left px-3 py-3 border-b">
              <p className="font-medium">Recent Requests </p>
            </div>
            <div className="flex flex-col gap-3 px-3 py-2">
              <div className={requestStyle}>
                <div className="flex flex-col gap-1">
                  <h5 className="group-hover:text-caramel font-medium">
                    Godswill Omenuko
                  </h5>
                  <span className="text-xs">ID: 00000</span>
                  <span className="text-xs">Vehicle Name: Toyota Camry</span>
                  <span className="text-xs">Duration: 2hrs</span>
                </div>
                <i onClick={handleClick} className="ri-more-fill text-lg"></i>
              </div>

              <div className={requestStyle}>
                <div className="flex flex-col gap-1">
                  <h5 className="group-hover:text-caramel font-medium">
                    Godswill Omenuko
                  </h5>
                  <span className="text-xs">ID: 00000</span>
                  <span className="text-xs">Vehicle Name: Toyota Camry</span>
                  <span className="text-xs">Duration: 2hrs</span>
                </div>
                <i onClick={handleClick} className="ri-more-fill text-lg"></i>
              </div>

              <div className={requestStyle}>
                <div className="flex flex-col gap-1">
                  <h5 className="group-hover:text-caramel font-medium">
                    Godswill Omenuko
                  </h5>
                  <span className="text-xs">ID: 00000</span>
                  <span className="text-xs">Vehicle Name: Toyota Camry</span>
                  <span className="text-xs">Duration: 2hrs</span>
                </div>
                <i onClick={handleClick} className="ri-more-fill text-lg"></i>
              </div>
            </div>
            <h2 className="text-caramel text-right px-3 text-sm font-semibold cursor-pointer hover:text-accent pb-2 pt-1">
              See All
            </h2>
          </div>
        </div>
      </div>

      {/* Third layer */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-28 mt-7">
        <div>
          <div className="border rounded-md px-4 py-2 shadow">
            <p>Vehicle by Status</p>
            <div className="flex justify-center my-6">
              <img
                src="https://res.cloudinary.com/ddvaelej7/image/upload/v1664283938/roundgraph_b5k7n8.svg"
                alt="graph"
                className="h-28"
              />
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
                  style={{ background: "#FFDBD3" }}
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

        <div>
          <div className="border rounded-md px-4 py-2 shadow">
            <p>Reminders</p>
            <div className="flex justify-center my-6">
              <img src={roundgraph} alt="graph" className="h-28" />
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
                  style={{ background: "#FFDBD3" }}
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

        <div className="bg-mainBg border rounded-lg text-sm shadow">
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

      {/* Requests popover */}
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "top",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "top",
        }}
      >
        <Themes>
          <div className="py-3 px-4 text-sm font-medium rounded-md flex flex-col">
            <span className="cursor-pointer hover:text-caramel">Accept</span>
            <span className="cursor-pointer hover:text-caramel py-1">
              Reject
            </span>
            <span className="cursor-pointer hover:text-caramel">View</span>
          </div>
        </Themes>
      </Popover>
    </div>
  );
};

export default VehicleOverview;
