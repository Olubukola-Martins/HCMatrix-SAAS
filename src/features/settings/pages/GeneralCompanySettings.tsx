import { useState } from "react";
import FramerAccordian from "components/accordian/FramerAccordian";
import { settingNavItems } from "../constants/settingNavItems";
import { SettingNavItem } from "../components/SettingNavItem";

const GeneralCompanySettings = () => {
  const [navItems, setNavItems] = useState(settingNavItems);
  const [isSearch, setIsSearch] = useState(false);

  const handleSearch = (e: any) => {
    const val = e.target.value;

    const doChildrenMatch = (children: { name: string; link: string }[]) => {
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
    <>
      <div className="Container">
        <h4 className="font-bold text-accent text-2xl mt-6">All Settings</h4>
        <div className="flex flex-col mt-8">
          {/* search */}
          <div className="flex justify-between border-0 border-b w-3/4 md:w-2/4 self-center px-2">
            <input
              className="border-none mb-2 flex-1 outline-0 outline-none bg-transparent"
              onChange={handleSearch}
              placeholder="Search in company details, roles ................"
            ></input>
            <i className="fas fa-search"></i>
          </div>
          {/* Page NavItems */}
          {!isSearch ? (
            <div className="mt-12 grid grid-cols-1  gap-4">
              {/* grouped settings */}
              {/* Basic */}
              <FramerAccordian
                heading={
                  <h5 className="text-caramel  text-base lg:text-xl  font-semibold">
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
              <FramerAccordian
                heading={
                  <h5 className="text-caramel  text-base lg:text-xl  font-semibold">
                    Self Service
                  </h5>
                }
              >
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
              <FramerAccordian
                heading={
                  <h5 className="text-caramel  text-base lg:text-xl  font-semibold">
                    Payroll
                  </h5>
                }
              >
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                  {/* item */}
                  {settingNavItems
                    .filter((item) => item.category === "payroll")
                    .map((item) => (
                      <SettingNavItem item={item} key={item.title} />
                    ))}
                  {/* <Link to="/settings/payroll">Payroll settings</Link> */}
                </div>
              </FramerAccordian>
              {/* Performance */}
              <FramerAccordian
                heading={
                  <h5 className="text-caramel  text-base lg:text-xl  font-semibold">
                    Performance
                  </h5>
                }
              >
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
    </>
  );
};

export default GeneralCompanySettings;
