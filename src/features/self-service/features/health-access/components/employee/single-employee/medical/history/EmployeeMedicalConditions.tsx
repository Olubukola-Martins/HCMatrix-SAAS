import {
  TEmployeeMedicalHistoryType,
  TSingleEmployeeHealthAccess,
} from "features/self-service/features/health-access/types/employee";
import React from "react";
import { MedicalCondition } from "./MedicalCondition";

const MEDICAL_CATEGORIES: {
  title: string;
  type: TEmployeeMedicalHistoryType;
}[] = [
  {
    title: "Current Condition",
    type: "current-condition",
  },
  {
    title: "Past Condition",
    type: "past-condition",
  },
  {
    title: "Surgeries",
    type: "sugeries",
  },
  {
    title: "Allergy",
    type: "allergy",
  },
  {
    title: "Family History",
    type: "family-history",
  },
  {
    title: "Medication",
    type: "medication",
  },
];
const EmployeeMedicalConditions: React.FC<{
  employeeId?: number;
  data?: TSingleEmployeeHealthAccess["medicalHistory"];
}> = ({ data, employeeId }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-10 gap-x-10 lg:gap-x-24">
      {MEDICAL_CATEGORIES.map(({ title, type }) => (
        <MedicalCondition
          type={type}
          title={title}
          conditions={data}
          employeeId={employeeId}
        />
      ))}
    </div>
  );
};

export default EmployeeMedicalConditions;
