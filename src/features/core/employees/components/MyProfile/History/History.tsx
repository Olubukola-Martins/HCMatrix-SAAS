import React from "react";
import { MedicalHistory } from "../MedicalHistory/MedicalHistory";
import { DisciplinaryHistory } from "./DisciplinaryHistory";
import { RoleHistory } from "./RoleHistory";
import { TrainingHistory } from "./TrainingHistory";

import { TSingleEmployee } from "features/core/employees/types";
import { SalaryHistory } from "./SalaryHistory";

interface IProps {
  roleHistory?: TSingleEmployee["roleHistory"];
  salaryHistory?: TSingleEmployee["salaryHistory"];
}

export const History: React.FC<IProps> = ({ roleHistory, salaryHistory }) => {
  return (
    <div className="bg-mainBg shadow-sm rounded-md py-6 md:px-4 mt-5 flex flex-col gap-4">
      <RoleHistory data={roleHistory} />
      <SalaryHistory data={salaryHistory} />
      {/* <TrainingHistory />
      <DisciplinaryHistory />
      <MedicalHistory /> */}
    </div>
  );
};
