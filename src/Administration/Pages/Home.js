import React, { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";
import CompanyEntryCards from "../Components/CompanyEntryCards";

const Home = () => {
  return (
    <DashboardLayout>
      <div className="Container pb-20 mt-4">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col w-full gap-2 md:flex-row md:justify-end md:items-center mt-2 p-2 rounded text-sm">
            <div className="">
              <input
                type="text"
                placeholder="Search comapnies"
                className="w-full bg-transparent rounded-md p-2 border border-gray-400 focus:outline-none "
              />
            </div>
          </div>

          {/* content */}
          <div className="bg-card px-4 py-6 rounded-lg">
            <div className="flex flex-col text-center gap-2">
              <h4 className="text-xl font-bold">5 Companies managed by you</h4>
              <p className="text-sm font-light">
                Choose the company you want to manage from the list below.
              </p>
            </div>
            <div className="mt-8 mb-2">
              <span className="underline text-caramel text-sm">
                Add new company
              </span>
            </div>

            <CompanyEntryCards />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
