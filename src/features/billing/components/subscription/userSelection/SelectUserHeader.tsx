import { Input } from "antd";
import { AppButtonList } from "components/button/AppButtonList";
import { SelectDepartment } from "features/core/departments/components/SelectDepartment";

const ACTIVE_BTN_CLASS_NAME =
  "bg-caramel border-caramel text-white font-semibold rounded-full px-4 py-2 hover:opacity-70 transition ease-in-out duration-500 text-sm tracking-wider";
const INACTIVE_BTN_CLASS_NAME =
  "border hover:border-caramel hover:text-caramel border-slate-800 font-semibold rounded-full px-4 py-2  bg-transparent transition ease-in-out duration-500 text-sm tracking-wider";
const SelectUserHeader: React.FC<{
  onClearDepartment: () => void;
  onSelectDepartment: (id: number) => void;
  onSearchEmployee: (value: string) => void;
  onSelectLicenseType: (type: "licensed" | "unlicensed") => void;
  licenseType: "licensed" | "unlicensed";
}> = ({
  onSelectDepartment,
  onSearchEmployee,
  onSelectLicenseType,
  licenseType,
  onClearDepartment,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
      <div className="flex flex-col gap-4">
        <p>Select One</p>

        <div className="flex gap-4">
          <AppButtonList
            data={[
              {
                label: "License User",
                type: "button",
                variant: "style-with-class",
                additionalClassNames:
                  licenseType === "licensed"
                    ? [ACTIVE_BTN_CLASS_NAME]
                    : [INACTIVE_BTN_CLASS_NAME],
                handleClick: () => onSelectLicenseType("licensed"),
              },
              {
                label: "Unlicense User",
                type: "button",
                variant: "style-with-class",
                additionalClassNames:
                  licenseType === "unlicensed"
                    ? [ACTIVE_BTN_CLASS_NAME]
                    : [INACTIVE_BTN_CLASS_NAME],
                handleClick: () => onSelectLicenseType("unlicensed"),
              },
            ]}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <p>Select Department</p>
        <SelectDepartment
          handleSelect={(val) => onSelectDepartment(val)}
          handleClear={onClearDepartment}
        />
      </div>
      <div className="flex flex-col gap-4">
        <p>Search Employee</p>
        <Input
          placeholder="Search"
          onChange={(e) => onSearchEmployee(e.target.value)}
          allowClear
        />
      </div>
    </div>
  );
};

export default SelectUserHeader;
