import React from "react";
import JobOpeningsTable from "./JobOpeningsTable";
import { Select, Input } from "antd";
import { TbFileExport } from "react-icons/tb";
import { AppButton } from "components/button/AppButton";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "config/router/paths";

const { Search } = Input;
const JobOpeningsContainer = () => {
  const navigator = useNavigate();
  return (
    <div className="flex flex-col gap-y-7">
      <div className="flex flex-row justify-between items-center">
        <Search placeholder="Search" loading={false} className="w-fit max-w-48" />
        <AppButton type="submit" label="Add Job Opening" handleClick={()=>{navigator(appRoutes.recruitmentAddJobOpenings)} } />
      </div>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row gap-2 md:gap-4">
          <Select placeholder="Select status" options={[{ value: "type1", label: "Type 1" }]} />
          <Select placeholder="Focus Display" options={[{ value: "category1", label: "Category 1" }]} />
        </div>

        <TbFileExport size={32} className="cursor-pointer hover:backdrop-grayscale-0 ml-auto" />
      </div>

      <JobOpeningsTable />
    </div>
  );
};

export default JobOpeningsContainer;
