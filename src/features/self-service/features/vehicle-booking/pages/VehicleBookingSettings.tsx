import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import React from "react";
import { VehicleSetting } from "../components/VehicleSetting";
import SelfServiceSubNav from "features/self-service/components/SelfServiceSubNav";

const VehicleBookingSettings = () => {
  return (
    <>
      <SelfServiceSubNav />

      <div>
        <div className="Container">
          <PageIntro
            title="Vehicle Booking Setting"
            link={appRoutes.vehicleBooking}
          />
          <VehicleSetting />
        </div>
      </div>
    </>
  );
};

export default VehicleBookingSettings;
