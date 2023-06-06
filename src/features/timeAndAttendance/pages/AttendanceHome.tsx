import React from "react";
import { SubToper } from "../components/SubToper";
import { SimpleCard } from "components/cards/SimpleCard";

export const AttendanceHome = () => {
  const today = new Date();
  const month = today.toLocaleString("default", { month: "long" });
  const year = today.getFullYear();
  return (
    <div className="Container">
      <SubToper />
      <div className="flex justify-between">
        <div>
          <h2 className="font-medium text-lg pb-2">Good morning Esther</h2>
          <p>
            Welcome to border, here is a breakdown summary of all employee
            attendance today.
          </p>
        </div>
        <div>
          <button className="border rounded px-3 py-2 flex items-center gap-x-3 font-medium">
            <i className="ri-calendar-2-line"></i>
            <span>
              {month} {year}
            </span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-3">
        <SimpleCard title="Clocked in" highlight="0" />
        <SimpleCard title="Clocked out" highlight="0" />
        <SimpleCard title="Break" highlight="0" />
        <SimpleCard title="Remote workers" highlight="0" />
      </div>
    </div>
  );
};
