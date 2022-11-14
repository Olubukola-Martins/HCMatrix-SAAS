import { Allergy } from "./Allergy";
import { CurrentMedicalCondition } from "./CurrentMedicalCondition";
import { FamilyHistory } from "./FamilyHistory";
import { Medication } from "./Medication";
import { PastMedicalCondition } from "./PastMedicalCondition";
import { Surgeries } from "./Surgeries";

export const MedicalHistory = () => {
  return (
    <div className="bg-card p-3">
      <div className="border-b border-gray-400 w-full mb-7">
        <h2 className="text-accent text-base pb-1">Medical History</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-10 gap-x-10 lg:gap-x-24">
        <CurrentMedicalCondition />
        <PastMedicalCondition />
        <Surgeries />
        <FamilyHistory />
        <Medication />
        <Allergy />
      </div>
    </div>
  );
};
