import React from "react";
import { LeaningNavbar } from "../components/LeaningNavbar";
import { SimpleCard } from "components/cards/SimpleCard";

export const LeaningHome = () => {
  return (
    <>
      <LeaningNavbar active="none-active" />

      <div className="Container">
        <div>
          <h2 className="font-medium text-lg pb-2">Good morning Esther</h2>
          <p>
            Welcome on board, here is a breakdown summary of all employee
            Learning and Development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-3">
          <SimpleCard title="Total Employee" highlight="0" />
          <SimpleCard title="Total Number of Trainings" highlight="0" />
          <SimpleCard title="Training Enrollment" highlight="0" />
          <SimpleCard title="Remote workers" highlight="0" />
        </div>
      </div>
    </>
  );
};
