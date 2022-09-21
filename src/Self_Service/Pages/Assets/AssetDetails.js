import React, { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../../Layout/DashboardLayout";
import SelfServiceSubNav from "../../Components/SelfServiceSubNav";
import placeholder from "../../Assets/Images/placeholder.png";

const AssetDetails = () => {
  const [tap, setTap] = useState("History");
  const listStyle =
    "flex items-center justify-between cursor-pointer group border-b pb-2 px-3";
  return (
    <DashboardLayout>
      <SelfServiceSubNav />
      <div className="Container">
        <div className="flex items-center gap-2">
          <Link to="/self-service/assets/1" className="hover:text-caramel">
            <i className="ri-arrow-left-s-line text-xl"></i>
          </Link>
          <h5 className="font-black text-lg">Asset Details</h5>
        </div>

        <div className="flex md:items-center flex-col md:flex-row justify-start md:justify-between mt-4">
          <h3 className="font-medium text-lg pb-5 md:pb-0">Hp EliteBook</h3>
          <div className="flex items-center gap-3">
            <button className="button">Edit</button>
            <button
              className="transparentButton"
              style={{ color: "var(--neutral)" }}
            >
              Delete
            </button>
            <button className="transparentButton">Add Document</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <div>
            <img src={placeholder} alt="asset" className="" />
          </div>
          <div className="bg-mainBg border rounded-lg text-sm shadow py-4 flex flex-col gap-3">
            <div className={listStyle}>
              <h5 className="group-hover:text-caramel font-medium">Asset ID</h5>
              <span className="text-sm">000</span>
            </div>
            <div className={listStyle}>
              <h5 className="group-hover:text-caramel font-medium">Brand</h5>
              <span className="text-sm">Hp</span>
            </div>

            <div className={listStyle}>
              <h5 className="group-hover:text-caramel font-medium">Model</h5>
              <span className="text-sm">EliteBook</span>
            </div>
            <div className={listStyle}>
              <h5 className="group-hover:text-caramel font-medium">Color</h5>
              <span className="text-sm">Red</span>
            </div>
            <div className={listStyle}>
              <h5 className="group-hover:text-caramel font-medium">
                Serial Number
              </h5>
              <span className="text-sm">000</span>
            </div>
            <div className={listStyle}>
              <h5 className="group-hover:text-caramel font-medium">
                Purchase Cost
              </h5>
              <span className="text-sm">N0</span>
            </div>
            <div className={listStyle}>
              <h5 className="group-hover:text-caramel font-medium">
                Purchase Date
              </h5>
              <span className="text-sm">14 Sep,2022</span>
            </div>
            <div className="px-3">
              <h5 className="font-medium pb-2">Description</h5>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>
          <div className="bg-mainBg border rounded-lg text-sm shadow py-4 px-3">
            <h4 className="font-medium text-lg">Current Assignee</h4>
            <div className="flex gap-4 pt-7">
              <img
                src="https://res.cloudinary.com/ddvaelej7/image/upload/v1639659955/HCmatrix/User-Icon_wdkmsf.png"
                alt="user"
                className="h-12"
              />
              <div className="flex flex-col gap-4">
                <p>Name: Ruth Godwin</p>
                <p>Job Role: Marketing Manager</p>
                <p>ID: 000000</p>
                <p>Department: Sale & Marketing </p>
                <div />
                <button className="button">Unassign</button>
              </div>
            </div>
          </div>
        </div>

        {/* Taps */}
        <div className="flex items-center gap-5 font-medium border-b-2 text-sm mb-5 mt-10">
          <h5
            onClick={() => setTap("History")}
            className={
              tap === "History"
                ? "cursor-pointer hover:text-caramel pb-4 border-b-2 border-caramel"
                : "cursor-pointer hover:text-caramel pb-4"
            }
          >
            Assignee History
          </h5>
          <h5
            onClick={() => setTap("Documents")}
            className={
              tap === "Documents"
                ? "cursor-pointer hover:text-caramel pb-4 border-b-2 border-caramel"
                : "cursor-pointer hover:text-caramel pb-4"
            }
          >
            Documents
          </h5>
        </div>

        {/* Assignee History */}
        {tap === "History" && (
          <>
            <div className="my-5 flex justify-end">
              <i className="ri-download-2-line text-lg"></i>
            </div>
            <table className="payroll-table text-accent">
              <div></div>
              <thead>
                <tr>
                  <th>
                    <input type="checkbox" />
                  </th>
                  <th>Assignee Name</th>
                  <th>Employee ID</th>
                  <th>Job Role</th>
                  <th>Department</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3].map((item) => (
                  <tr key={item}>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <Link
                        to="/self-service/assets-details"
                        className="hover:text-caramel"
                      >
                        Ruth Godwin
                      </Link>
                    </td>
                    <td>000</td>
                    <td>Marketing Manager</td>
                    <td>Sales & Marketing</td>
                    <td>DD/MM/YY</td>
                    <td>DD/MM/YY</td>
                    <td>
                      <i class="ri-more-2-fill text-lg cursor-pointer hover:text-caramel"></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AssetDetails;
