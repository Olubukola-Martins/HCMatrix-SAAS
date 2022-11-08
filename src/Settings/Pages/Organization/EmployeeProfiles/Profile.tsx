import React from "react";
import { PageIntro } from "../../../../Layout/Components/PageIntro";
import DashboardLayout from "../../../../Layout/DashboardLayout";

export const Profile = () => {
  return (
    <DashboardLayout>
      <div className="Container">
        <PageIntro title="Profile" link="/" />

        <div className="bg-card py-5">
          <div className="bg-mainBg rounded-md p-3 ">
            <img
              src="https://res.cloudinary.com/ddvaelej7/image/upload/v1639659955/HCmatrix/User-Icon_wdkmsf.png"
              alt="user"
            />
            <div>
              <h3>Isaac Temi</h3>
              <h4>UI Designer</h4>
              <h5>Manger</h5>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
