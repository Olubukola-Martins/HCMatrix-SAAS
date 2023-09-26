import React from "react";
import { MedicalHistory } from "../MedicalHistory/MedicalHistory";
import { DisciplinaryHistory } from "./DisciplinaryHistory";
import { PromotionHistory } from "./PromotionHistory";
import { RoleHistory } from "./RoleHistory";
import { TrainingHistory } from "./TrainingHistory";

export const History = () => {
  return (
    <div className="bg-mainBg shadow-sm rounded-md py-6 md:px-4 mt-5">
      <RoleHistory />
      <PromotionHistory />
      <TrainingHistory />
      <DisciplinaryHistory />
      <MedicalHistory />
    </div>
  );
};
