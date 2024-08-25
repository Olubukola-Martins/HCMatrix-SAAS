import { Select } from "antd";
import Search from "antd/es/input/Search";
import { PageIntro } from "components/layout/PageIntro";
import AllCandidatesTable from "../components/candidates/AllCandidatesTable";
import { candidatesTableDummyData } from "../utils/data";

const AllCandidatesPage = () => {
  return (
    <div className="Container">
      <PageIntro link={true} title="Gt Sales 2024 Interview" />
      <div className="flex flex-col gap-2 md:flex-row justify-between items-center mt-8 mb-4">
        {/* <TbFileExport size={32} className="cursor-pointer hover:backdrop-grayscale-0 ml-auto" /> */}
        <div className="flex flex-nowrap">
          <i className="ri-team-line text-caramel" />{" "}
          <p className="text-caramel">
            <span>15</span> Candidate Score
          </p>
        </div>
        <div className="flex flex-row gap-2 md:gap-4">
          <Search placeholder="Search" loading={false} className="w-fit max-w-48" />
          <Select placeholder="Focus Type" options={[{ value: "type1", label: "Type 1" }]} />
          <Select placeholder="Filter Search" options={[{ value: "category1", label: "Category 1" }]} />
        </div>
      </div>

      <AllCandidatesTable data={candidatesTableDummyData} />
    </div>
  );
};

export default AllCandidatesPage;
