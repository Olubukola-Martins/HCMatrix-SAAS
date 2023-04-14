import React, { useState } from "react";
import { Link } from "react-router-dom";
import placeholder from "../../../Assets/Images/placeholder.png";
import DashboardLayout from "Layout/DashboardLayout";
import UnassignedModal from "Self_Service/Components/Assets/UnassignedModal";
import SelfServiceSubNav from "Self_Service/Components/SelfServiceSubNav";
import AssigneeHistory from "../components/AssigneeHistory";
import Maintenance from "../components/Maintenance";
import Repair from "../components/Repair";
import RequiredDocuments from "../components/RequiredDocuments";

const VehicleDetails = () => {
  const [tap, setTap] = useState("Maintenance");
  const [unassigned, setUnassigned] = useState(false);
  const listStyle =
    "flex items-center justify-between cursor-pointer group border-b pb-2 px-3";

  return (
    <DashboardLayout>
      <SelfServiceSubNav />
      <UnassignedModal
        open={unassigned}
        handleClose={() => setUnassigned(false)}
      />

      <div className="Container">
        <div className="flex items-center gap-2">
          <Link to="/self-service/assets/1" className="hover:text-caramel">
            <i className="ri-arrow-left-s-line text-xl"></i>
          </Link>
          <h5 className="font-black text-lg">Vehicle Details</h5>
        </div>

        <div className="flex md:items-center flex-col md:flex-row justify-start md:justify-between mt-4">
          <h3 className="font-medium text-lg pb-5 md:pb-0">Toyota Camry</h3>
          <div className="flex items-center gap-3">
            <button className="button">Edit</button>
            <button
              className="transparentButton"
              style={{ color: "var(--neutral)" }}
            >
              Delete
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          <div className="flex justify-center">
            <img src={placeholder} alt="asset" className="" />
          </div>
          <div className="bg-mainBg border rounded-lg text-sm shadow py-4 flex flex-col gap-3">
            <div className={listStyle}>
              <h5 className="group-hover:text-caramel font-medium">
                Vehicle Type{" "}
              </h5>
              <span className="text-sm">Car</span>
            </div>
            <div className={listStyle}>
              <h5 className="group-hover:text-caramel font-medium">Brand</h5>
              <span className="text-sm">Hp</span>
            </div>

            <div className={listStyle}>
              <h5 className="group-hover:text-caramel font-medium">Model</h5>
              <span className="text-sm">Toyota</span>
            </div>
            <div className={listStyle}>
              <h5 className="group-hover:text-caramel font-medium">Color</h5>
              <span className="text-sm">Red</span>
            </div>
            <div className={listStyle}>
              <h5 className="group-hover:text-caramel font-medium">
                Plate Number
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
            <div className={listStyle}>
              <h5 className="group-hover:text-caramel font-medium">Status</h5>
              <span className="text-sm">Active</span>
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
                <p>Location : Lagos Island</p>
                <p>Estimated Journey Time: 0hrs</p>
                <div />
                <button className="button" onClick={() => setUnassigned(true)}>
                  Unassign
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Taps */}
        <div className="flex items-center gap-5 font-medium border-b-2 text-sm mb-5 mt-10">
          <h5
            onClick={() => setTap("Maintenance")}
            className={
              tap === "Maintenance"
                ? "cursor-pointer hover:text-caramel pb-4 border-b-2 border-caramel"
                : "cursor-pointer hover:text-caramel pb-4"
            }
          >
            Maintenance
          </h5>
          <h5
            onClick={() => setTap("Repair")}
            className={
              tap === "Repair"
                ? "cursor-pointer hover:text-caramel pb-4 border-b-2 border-caramel"
                : "cursor-pointer hover:text-caramel pb-4"
            }
          >
            Repair
          </h5>

          <h5
            onClick={() => setTap("RequiredDocuments")}
            className={
              tap === "RequiredDocuments"
                ? "cursor-pointer hover:text-caramel pb-4 border-b-2 border-caramel"
                : "cursor-pointer hover:text-caramel pb-4"
            }
          >
            Required Documents
          </h5>

          <h5
            onClick={() => setTap("AssigneeHistory")}
            className={
              tap === "AssigneeHistory"
                ? "cursor-pointer hover:text-caramel pb-4 border-b-2 border-caramel"
                : "cursor-pointer hover:text-caramel pb-4"
            }
          >
            Assignee History
          </h5>
        </div>

        {tap === "Maintenance" && <Maintenance />}
        {tap === "Repair" && <Repair />}
        {tap === "RequiredDocuments" && <RequiredDocuments />}
        {tap === "AssigneeHistory" && <AssigneeHistory />}
      </div>
    </DashboardLayout>
  );
};

export default VehicleDetails;
