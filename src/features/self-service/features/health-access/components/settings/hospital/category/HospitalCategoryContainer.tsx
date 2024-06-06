import { AddHospitalCategoryBtn } from "./AddHospitalCategory";
import { HospitalCategoryTable } from "./HospitalCategoryTable";

const HospitalCategoryContainer = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <AddHospitalCategoryBtn />
      </div>
      <HospitalCategoryTable />
    </div>
  );
};

export default HospitalCategoryContainer;
