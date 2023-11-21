// simply pass the props here as opposed to making a call
import React from "react";
import { TSingleEmployeeHealthAccess } from "../../../types/employee";
import { EmployeeOverviewCard } from "features/core/employees/components/MyProfile/EmployeeOverviewCard";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";
import SingleEmployeeHealthAccessTabs from "./SingleEmployeeHealthAccessTabs";

type TProps = { data?: TSingleEmployeeHealthAccess };
const SingleEmployeeHealthAccess: React.FC<TProps> = ({ data }) => {
  const employee = data?.employee;
  return (
    <div className="bg-card p-1 md:p-5 mt-5  flex flex-col gap-5">
      <EmployeeOverviewCard
        {...{
          showMoreActions: false,
          data: {
            fullName: getEmployeeFullName(employee),
            designation: employee?.designation?.name,
            department: employee?.designation?.department.name,
            empuid: "",
            email: employee?.email,
            phone: employee?.personalInformation?.phoneNumber,
            address: employee?.personalInformation?.address?.streetAddress,
            avatarUrl: employee?.avatarUrl,
            role: "",
          },
        }}
      />
      <SingleEmployeeHealthAccessTabs
        data={{
          dependents: data?.dependents,
          medicalHistory: data?.medicalHistory,
          medicalInfo: data?.medicalInfo,
        }}
        employeeId={data?.employeeId}
      />
    </div>
  );
};

export default SingleEmployeeHealthAccess;
