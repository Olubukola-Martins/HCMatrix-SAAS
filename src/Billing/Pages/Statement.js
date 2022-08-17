import React from "react";
import DashboardLayout from "../../Layout/DashboardLayout";

const Statement = () => {
  return (
    <DashboardLayout>
      <div className="Container mt-4">
        <div className="flex justify-between items-center">
          <span className="font-bold text-lg">Statement</span>
          <i className="ri-close-fill cursor-pointer text-2xl font-semibold"></i>
        </div>

        <div className="flex gap-4 flex-col-reverse md:flex-row justify-between mt-3">
          <div className="text-accent text-sm">
            <span className="block">To</span>
            <span>Dangote Cement</span>
            <p className="pt-1">
              133 Ahmadu Bello Way, <br className="hidden md:flex" /> VI Lagos
              Nigeria
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button className="button">Pay Now</button>
            <button className="transparentButton">Send To</button>
            <i className="ri-download-2-line text-xl font-bold"></i>
          </div>
        </div>
        <div className="flex items-center justify-between mt-3">
              <div>

              </div>

              <div>

              </div>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default Statement;
