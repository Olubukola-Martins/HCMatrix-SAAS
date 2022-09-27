import React, { useState } from "react";
import DashboardLayout from "../../../Layout/DashboardLayout";
import SelfServiceSubNav from "../../Components/SelfServiceSubNav";
import Reminder from "../../Components/VehicleBooking/Reminder";
import VehicleList from "../../Components/VehicleBooking/VehicleList";
import VehicleOverview from "../../Components/VehicleBooking/VehicleOverview";

const VehicleBookingHome = () => {
  const [tap, setTap] = useState("overview");
  return (
    <DashboardLayout>
      <SelfServiceSubNav />
      <div className="Container">
        <h2 className="font-extrabold text-xl md:text-2xl text-accent pb-4">
          <i className="ri-arrow-left-s-line text-lg pr-2"></i>
          <span>Vehicle Booking</span>
        </h2>

        <div className="flex items-center gap-5 font-medium border-b-2 text-sm mt-4 mb-5">
          <h5
            onClick={() => setTap("overview")}
            className={
              tap === "overview"
                ? "cursor-pointer hover:text-caramel pb-4 border-b-2 border-caramel"
                : "cursor-pointer hover:text-caramel pb-4"
            }
          >
            Vehicle Overview
          </h5>
          <h5
            onClick={() => setTap("list")}
            className={
              tap === "list"
                ? "cursor-pointer hover:text-caramel pb-4 border-b-2 border-caramel"
                : "cursor-pointer hover:text-caramel pb-4"
            }
          >
            Vehicle List
          </h5>
          <h5
            onClick={() => setTap("reminder")}
            className={
              tap === "reminder"
                ? "cursor-pointer hover:text-caramel pb-4 border-b-2 border-caramel"
                : "cursor-pointer hover:text-caramel pb-4"
            }
          >
            Reminders
          </h5>
        </div>

         {/* Display tap */}
         {tap === "overview" && <VehicleOverview />}
        {tap === "list" && <VehicleList/>}
        {tap === "reminder" && <Reminder />}
      </div>
    </DashboardLayout>
  );
};

export default VehicleBookingHome;
