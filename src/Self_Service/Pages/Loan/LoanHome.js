import { Popover } from "@mui/material";
import React, { useState } from "react";
import DashboardLayout from "../../../Layout/DashboardLayout";
import Themes from "../../../Themes/Themes";
import SelfServiceSubNav from "../../Components/SelfServiceSubNav";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Link } from "react-router-dom";

const LoanHome = () => {
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
    <DashboardLayout>
      <SelfServiceSubNav />
      <div>
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="relative right-0 left-0 top-0 -mt-7"
        >
          <path
            fill="var(--card)"
            fill-opacity="1"
            d="M0,160L20,165.3C40,171,80,181,120,165.3C160,149,200,107,240,122.7C280,139,320,213,360,224C400,235,440,181,480,160C520,139,560,149,600,181.3C640,213,680,267,720,266.7C760,267,800,213,840,176C880,139,920,117,960,122.7C1000,128,1040,160,1080,176C1120,192,1160,192,1200,197.3C1240,203,1280,213,1320,234.7C1360,256,1400,288,1420,304L1440,320L1440,0L1420,0C1400,0,1360,0,1320,0C1280,0,1240,0,1200,0C1160,0,1120,0,1080,0C1040,0,1000,0,960,0C920,0,880,0,840,0C800,0,760,0,720,0C680,0,640,0,600,0C560,0,520,0,480,0C440,0,400,0,360,0C320,0,280,0,240,0C200,0,160,0,120,0C80,0,40,0,20,0L0,0Z"
          ></path>
        </svg> */}

        <div className="Container">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 font-extrabold ">
              <i className="ri-arrow-left-s-line text-lg cursor-pointer hover:text-caramel"></i>
              <h2 className="text-xl md:text-2xl text-accent">Loan</h2>
            </div>
            <Link to="/self-service/loan-policies" className="button">Set Loan Policies</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-6">
            <Link
              to="/self-service/loan-request"
              className="border rounded-md p-2 shadow-sm bg-card text-white hover:shadow-md cursor-pointer"
            >
              <div className="rounded-md bg-caramel shadow p-3 border">
                <p className="text-sm font-medium py-3">Total loan Requests</p>
                <h2 className="font-semibold text-lg">0</h2>
              </div>
            </Link>
            {[
              "Pending Loan Requests",
              "Approved Loan Requests",
              "Rejected Loan Requests",
            ].map((item) => (
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
              <div className="flex gap-3">
                <div className="bg-card py-2 rounded px-3 flex items-center gap-3">
                  <h4 className="text-caramel cursor-pointer">Total Request</h4>
                  <div className="border-r-2 border-gray-400 h-full" />
                  <h4>Pending Request</h4>
                  <div className="border-r-2 border-gray-400 h-full" />
                  <h4>Approved Request</h4>
                  <div className="border-r-2 border-gray-400 h-full" />
                  <h4>Rejected Request</h4>
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
                      <span className="text-xs">Loan Type: car Loan</span>
                      <span className="text-xs">Amount: N0</span>
                    </div>
                    <i
                      onClick={handleClick}
                      className="ri-more-fill text-lg"
                    ></i>
                  </div>

                  <div className={requestStyle}>
                    <div className="flex flex-col gap-1">
                      <h5 className="group-hover:text-caramel font-medium">
                        Godswill Omenuko
                      </h5>
                      <span className="text-xs">ID: 00000</span>
                      <span className="text-xs">Loan Type: car Loan</span>
                      <span className="text-xs">Amount: N0</span>
                    </div>
                    <i
                      onClick={handleClick}
                      className="ri-more-fill text-lg"
                    ></i>
                  </div>

                  <div className={requestStyle}>
                    <div className="flex flex-col gap-1">
                      <h5 className="group-hover:text-caramel font-medium">
                        Godswill Omenuko
                      </h5>
                      <span className="text-xs">ID: 00000</span>
                      <span className="text-xs">Loan Type: car Loan</span>
                      <span className="text-xs">Amount: N0</span>
                    </div>
                    <i
                      onClick={handleClick}
                      className="ri-more-fill text-lg"
                    ></i>
                  </div>
                </div>
                <h2 className="text-caramel text-right px-3 text-sm font-semibold cursor-pointer hover:text-accent pb-2 pt-1">
                  See All
                </h2>
              </div>
            </div>
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
    </DashboardLayout>
  );
};

export default LoanHome;
