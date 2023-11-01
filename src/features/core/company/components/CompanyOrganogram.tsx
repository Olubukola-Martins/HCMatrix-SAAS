import { Avatar, Skeleton } from "antd";
import PageSubHeader from "components/layout/PageSubHeader";
import React, { useState } from "react";
import { Tree } from "react-organizational-chart";
import styled from "styled-components";
import { useGetCompanyOwnerOrganogram } from "../hooks/organogram/useGetCompanyOwnerOrganogram";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";
import { TCompanyEmployeeOrganogram } from "../types/organogram/companyEmployeeOrganogram";
import { DEFAULT_PROFILE_IMAGE_URL } from "constants/general";
import { truncateString } from "utils/dataHelpers/truncateString";
import { useGetCompanyEmployeeOrganogram } from "../hooks/organogram/useGetCompanyEmployeeOrganogram";

const StyledNode = styled.div`
  padding: 5px;
  border-radius: 8px;
  display: inline-block;
  width: max-content;
  // background: var(--caramel);
`;
const CompanyOrganogram = () => {
  const [organogramToDisplay, setOrganogramToDisplay] = useState<
    "owner" | "employee"
  >("owner");
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number>();
  const [lineManagerId, setLineManagerId] = useState<number>();
  const { data: owner, isLoading: ownerLoading } =
    useGetCompanyOwnerOrganogram();
  const { data: selectedEmployee, isLoading: employeeLoading } =
    useGetCompanyEmployeeOrganogram({ employeeId: selectedEmployeeId });

  return (
    <div className="w-full py-4 flex flex-col gap-4">
      <PageSubHeader
        description={`View your organization's organogram at a glance`}
      />
      <div>
        {lineManagerId !== undefined && (
          // TODO: Fix bug of not being able to go back, when no orgaonogram was found
          <i
            className="ri-arrow-left-s-line text-lg cursor-pointer hover:text-caramel"
            onClick={() => {
              setSelectedEmployeeId(lineManagerId);
            }}
          />
        )}
      </div>

      <Skeleton
        loading={ownerLoading || employeeLoading}
        active
        paragraph={{ rows: 14 }}
      >
        <div className="overflow-x-auto">
          {organogramToDisplay === "owner" && (
            <HierarchicalOrganogram
              person={owner}
              onDirectReportClick={(employeeId) => {
                setLineManagerId(owner?.id);
                setSelectedEmployeeId(employeeId);
                setOrganogramToDisplay("employee");
              }}
            />
          )}
          {organogramToDisplay === "employee" && (
            <HierarchicalOrganogram
              person={selectedEmployee}
              onDirectReportClick={(employeeId) => {
                setLineManagerId(selectedEmployee?.id);
                setSelectedEmployeeId(employeeId);
                setOrganogramToDisplay("employee");
              }}
            />
          )}
        </div>
      </Skeleton>
    </div>
  );
};
const HierarchicalOrganogram: React.FC<{
  person?: TCompanyEmployeeOrganogram;
  onDirectReportClick: (employeeId: number) => void;
}> = ({ person, onDirectReportClick }) => {
  return (
    <>
      {person === null && (
        <h4 className="text-gray-300 text-xl text-center py-5">
          No Organogram found!
        </h4>
      )}
      {person !== null && (
        <Tree
          lineWidth={"1px"}
          lineColor={`#aaa`}
          lineBorderRadius={"10px"}
          label={
            <OrgCard
              name={getEmployeeFullName(person)}
              designation={person?.designation?.name ?? ""}
              department={person?.designation?.department?.name}
              avatarUrl={person?.avatarUrl}
            />
          }
        >
          <div className="shadow-lg rounded-md p-2 bg-white w-full">
            {person?.directReport && person?.directReport.length === 0 && (
              <h4 className="text-gray-300 text-xl text-center py-5">
                No Direct Reports
              </h4>
            )}
            {/* TODO: Paginate Direct Reports */}
            {person?.directReport && person?.directReport.length > 0 && (
              <div className="grid grid-cols-4 gap-4">
                {person?.directReport.map((item) => (
                  <div
                    className="shadow cursor-pointer border p-2 rounded flex  gap-2"
                    key={item.employeeId}
                    onClick={() => {
                      onDirectReportClick(item.employeeId);
                    }}
                  >
                    <Avatar
                      src={
                        item.employee?.avatarUrl ??
                        `https://picsum.photos/${190 + item.employeeId}`
                      }
                    />

                    <div className="text-left">
                      <h5 className="text-xs capitalize font-extrabold text-gray-900">
                        {truncateString(getEmployeeFullName(item.employee), 12)}
                      </h5>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-xs capitalize text-gray-500 font-light">
                          {item.employee.designation.name}
                        </span>
                        <span className="text-xs capitalize text-gray-800 font-normal">
                          {item.employee.designation.department.name}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Tree>
      )}
    </>
  );
};

const OrgCard: React.FC<{
  designation: string;
  name: string;
  avatarUrl?: string;

  department?: string;
}> = ({ designation, name, department, avatarUrl }) => {
  return (
    <StyledNode>
      <div className="shadow border p-2 rounded flex  gap-2 min-w-[280px]">
        <Avatar src={avatarUrl ?? "https://picsum.photos/190"} size={`large`} />
        {/* <img src={DEFAULT_PROFILE_IMAGE_URL} alt="user" className="h-7" /> */}
        <div className="text-left">
          <h5 className="text-sm capitalize font-extrabold text-gray-900">
            {truncateString(name, 12)}
          </h5>
          <div className="flex flex-col gap-0.5">
            <span className="text-sm capitalize text-gray-500 font-light">
              {designation}
            </span>
            <span className="text-sm capitalize text-gray-800 font-normal">
              {department}
            </span>
          </div>
        </div>
      </div>
    </StyledNode>
  );
};

export default CompanyOrganogram;
