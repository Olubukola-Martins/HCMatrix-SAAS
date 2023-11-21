import React from "react";
import { TSingleEmployeeHealthAccess } from "../../../types/employee";
import { Tabs } from "antd";
import { MedicalInfo } from "./medical/info/MedicalInfo";
import EmployeeHealthAccessDependents from "./dependent/EmployeeHealthAccessDependents";
import EmployeeMedicalConditions from "./medical/history/EmployeeMedicalConditions";

type TProps = {
  data?: Partial<
    Pick<
      TSingleEmployeeHealthAccess,
      "medicalHistory" | "medicalInfo" | "dependents"
    >
  >;
  employeeId?: number;
};
const SingleEmployeeHealthAccessTabs: React.FC<TProps> = ({
  data,
  employeeId,
}) => {
  return (
    <Tabs
      defaultActiveKey="Medical Info"
      className="tabBlackActive"
      items={[
        {
          key: "Medical Info",
          label: "Medical Info",
          children: (
            <MedicalInfo
              employeeId={employeeId}
              medicalInfo={data?.medicalInfo}
            />
          ),
        },
        {
          key: "Dependents",
          label: "Dependents",
          children: (
            <EmployeeHealthAccessDependents
              employeeId={employeeId}
              dependents={data?.dependents}
            />
          ),
        },
        {
          key: "Medical History",
          label: "Medical History",
          children: (
            <EmployeeMedicalConditions
              employeeId={employeeId}
              data={data?.medicalHistory}
            />
          ),
        },
      ]}
    />
  );
};

export default SingleEmployeeHealthAccessTabs;
