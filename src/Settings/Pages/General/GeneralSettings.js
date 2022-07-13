import { useState } from "react";
import DashboardLayout from "../../../Layout/DashboardLayout";
import SettingNavItem from "../../Components/SettingNavItem";
import { settingNavItems } from "../../Data";
import FramerAccordian from "../../Components/custom/FramerAccordian";

const GeneralSettings = () => {
  const [navItems, setNavItems] = useState(settingNavItems);
  const [isSearch, setIsSearch] = useState(false);

  const handleSearch = (e) => {
    const val = e.target.value;
    console.log("val =>", val);
    const doChildrenMatch = (children) => {
      return children.some(
        (child) => child.name.toLowerCase().indexOf(val.toLowerCase()) !== -1
      );
    };
    const result = settingNavItems.filter(
      (parent) =>
        parent.title.toLowerCase().indexOf(val.toLowerCase()) !== -1 ||
        doChildrenMatch(parent.items)
    );

    if (val !== "") {
      setNavItems(() => result);
      setIsSearch(true);
    } else {
      setIsSearch(false);

      setNavItems(settingNavItems);
    }
  };
  return (
    <DashboardLayout>
      <div className="Container pb-96 ">
        <h4 className="font-bold text-accent text-2xl mt-6">All Settings</h4>
        <div className="flex flex-col mt-8">
          {/* search */}
          <div className="flex justify-between border-0 border-b w-3/4 md:w-2/4 self-center px-2">
            <input
              className="border-none mb-2 flex-1 outline-0 outline-none bg-transparent"
              onChange={handleSearch}
              placeholder="Search in company details, roles ................"
            ></input>
            <i class="fas fa-search"></i>
          </div>
          {/* Page NavItems */}
          {!isSearch ? (
            <div className="mt-12 grid grid-cols-1  gap-4">
              {/* grouped settings */}
              {/* Basic */}
              <FramerAccordian
                heading={
                  <h5 className="text-caramel text-xl font-semibold">
                    Basic settings
                  </h5>
                }
              >
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                  {/* item */}
                  {settingNavItems
                    .filter((item) => item.category === "basic")
                    .map((item) => (
                      <SettingNavItem item={item} key={item.title} />
                    ))}
                </div>
              </FramerAccordian>
              {/* Self service*/}
              <FramerAccordian heading={"Self Service"}>
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                  {/* item */}
                  {settingNavItems
                    .filter((item) => item.category === "self-service")
                    .map((item) => (
                      <SettingNavItem item={item} key={item.title} />
                    ))}
                </div>
              </FramerAccordian>
              {/* Payroll */}
              <FramerAccordian heading={"Payroll"}>
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                  {/* item */}
                  {settingNavItems
                    .filter((item) => item.category === "payroll")
                    .map((item) => (
                      <SettingNavItem item={item} key={item.title} />
                    ))}
                </div>
              </FramerAccordian>
              {/* Performance */}
              <FramerAccordian heading={"Performance"}>
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                  {/* item */}
                  {settingNavItems
                    .filter((item) => item.category === "performance")
                    .map((item) => (
                      <SettingNavItem item={item} key={item.title} />
                    ))}
                </div>
              </FramerAccordian>
            </div>
          ) : (
            <div className="mt-12">
              {navItems && navItems.length > 0 ? (
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                  {/* item */}
                  {navItems &&
                    navItems.map((item) => (
                      <SettingNavItem item={item} key={item.title} />
                    ))}
                </div>
              ) : (
                <div className="mt-32 w-full">
                  <p className="text-accent text-2xl text-center">
                    {" "}
                    No items found
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default GeneralSettings;
