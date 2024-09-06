import { timeSheetFilterProps } from "../types";
import { AppButton } from "components/button/AppButton";
import { Dispatch, SetStateAction } from "react";

export interface TSheetIProps {
  filterData: timeSheetFilterProps | undefined;
  setFilterData: Dispatch<SetStateAction<timeSheetFilterProps | undefined>>;
  setFilterSheet: Dispatch<SetStateAction<boolean>>;
}
export const EmployeeTimeSheet = ({
  filterData,
  setFilterData,
  setFilterSheet,
}: TSheetIProps) => {
  return (
    <div>
      <div className="flex items-center justify-between mt-5">
        <div>
          {filterData !== undefined && (
            <AppButton
              variant="transparent"
              label="Reset Report"
              handleClick={() => setFilterData(undefined)}
            />
          )}
        </div>
        <button
          className="flex items-center gap-x-2 transparentButton"
          onClick={() => setFilterSheet(true)}
        >
          <span className="text-caramel font-medium">Filter</span>
          <i className="ri-filter-2-line text-caramel"></i>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-6">
         
      </div>
    </div>
  );
};
