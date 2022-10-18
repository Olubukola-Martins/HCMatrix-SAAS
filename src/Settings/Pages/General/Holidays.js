import React from "react";
import DashboardLayout from "../../../Layout/DashboardLayout";
import HolidaysWrapper from "../../Components/General/Holidays/HolidaysWrapper";

const Holidays = () => {
  return (
    <DashboardLayout>
      <div className="Container">
        <HolidaysWrapper />
      </div>
    </DashboardLayout>
  );
};

export default Holidays;
