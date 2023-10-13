import React from "react";
import { MedicalHistory } from "../MedicalHistory/MedicalHistory";
import { DisciplinaryHistory } from "./DisciplinaryHistory";
import { RoleHistory } from "./RoleHistory";
import { TrainingHistory } from "./TrainingHistory";
import { DirectSalaryHistory } from "./DirectSalaryHistory";
import { OfficeGradeHistory } from "./OfficeGradeHistory";
import { WagesHistory } from "./WagesHistory";

export const History = () => {
  return (
    <div className="bg-mainBg shadow-sm rounded-md py-6 md:px-4 mt-5 flex flex-col gap-4">
      <RoleHistory />
      <DirectSalaryHistory />
      <OfficeGradeHistory />
      <WagesHistory />
      <TrainingHistory />
      <DisciplinaryHistory />
      <MedicalHistory />
    </div>
  );
};
