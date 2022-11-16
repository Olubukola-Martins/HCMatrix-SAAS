import { useState } from "react";
import logo from "../Images/logo2.png";
// import sun from "../Images/sun.svg";
import { Link } from "react-router-dom";
import SearchModal from "./Search/SearchModal";
import Themes from "../../Themes/Themes";
import TransferOwnership from "./TransferOwnership";
import { AutoComplete, Avatar, Badge, Dropdown, Select } from "antd";

const companies = [
  {
    value: "Dangote Oil",
    id: 1994,
    image: "https://picsum.photos/190",
    label: (
      <div className="flex gap-2 items-center">
        <Avatar src="https://picsum.photos/190" />
        <span>Dangote Oil</span>
      </div>
    ),
  },
  {
    value: "Google",
    id: 1992,
    image: "https://picsum.photos/201",
    label: (
      <div className="flex gap-2 items-center">
        <Avatar src="https://picsum.photos/201" />
        <span>Google</span>
      </div>
    ),
  },
  {
    value: "General Electric",
    id: 1972,
    image: "https://picsum.photos/202",
    label: (
      <div className="flex gap-2 items-center">
        <Avatar src="https://picsum.photos/202" />
        <span>General Electric</span>
      </div>
    ),
  },
  {
    value: "PgLang",
    id: 1974,
    image: "https://picsum.photos/203",
    label: (
      <div className="flex gap-2 items-center">
        <Avatar src="https://picsum.photos/203" />
        <span>PgLang</span>
      </div>
    ),
  },
  {
    value: "Microsft",
    id: 1979,
    image: "https://picsum.photos/204",
    label: (
      <div className="flex gap-2 items-center">
        <Avatar src="https://picsum.photos/204" />
        <span>Microsft</span>
      </div>
    ),
  },
  {
    value: "Apple",
    id: 1999,
    image: "https://picsum.photos/205",
    label: (
      <div className="flex gap-2 items-center">
        <Avatar src="https://picsum.photos/205" />
        <span>Apple</span>
      </div>
    ),
  },
];

interface IProps {
  switchTheme: Function;
  theme: string;
  green: Function;
  yellow: Function;
  orange: Function;
  blue: Function;
  purple: Function;
  sidebarToggle: boolean;
  setSidebarToggle: Function;
}
const TopBar = ({
  switchTheme,
  theme,
  green,
  yellow,
  orange,
  blue,
  purple,
  sidebarToggle,
  setSidebarToggle,
}: IProps) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [transferOwnershipModal, setTransferOwnershipModal] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [companyId, setCompanyId] = useState(companies[0].value);
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const [options, setOptions] = useState(companies);
  const onSearch = (searchText: string) => {
    const result = companies.filter(
      (item) =>
        item.value.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
    );
    setOptions(() => result);
  };

  const onSelect = (data: string) => {
    setCompanyId(data);
  };
  return (
    <>
      <div className="bg-mainBg w-full py-3 sticky top-0 z-50 text-accent shadow-md">
        <div className="px-5 lg:px-12 flex items-center justify-between Container">
          <div className="flex items-center gap-3">
            <i
              onClick={() => setSidebarToggle()}
              className="ri-menu-line cursor-pointer"
              style={{ fontSize: 23 }}
            />
            <Link
              to="/"
              className={
                sidebarToggle
                  ? "lg:ml-16 transition-all duration-500 ease-in-out"
                  : "transition-all duration-500 ease-in-out"
              }
            >
              <img src={logo} alt="logo" className="md:h-8 h-7" />
            </Link>
          </div>

          <div className="flex gap-4 items-center">
            <i
              onClick={() => setOpenSearchModal(true)}
              className="fa-solid fa-magnifying-glass lg:hidden cursor-pointer text-base"
            ></i>
            <div className="lg:flex items-center gap-6 hidden mr-10">
              <i
                className="fa-solid fa-magnifying-glass cursor-pointer text-base"
                title="Search HcMatrix application"
                onClick={() => setOpenSearchModal(true)}
              ></i>
              <SearchModal
                open={openSearchModal}
                handleClose={() => setOpenSearchModal(false)}
              />
              <div className="flex items-center gap-2">
                <Avatar
                  src={
                    companies.find((item) => item.value === companyId)?.image
                  }
                />
                <AutoComplete
                  options={options}
                  defaultValue={companyId}
                  style={{ width: 200, borderRadius: "100px" }}
                  onSelect={onSelect}
                  onSearch={onSearch}
                  placeholder="Search Company"
                  className="top-autocomplete-company"
                  size="middle"
                />
              </div>
            </div>

            {/* Dark and Light */}
            {/* {theme === "light" ? (
              <i
                onClick={() => switchTheme()}
                className="fas fa-moon text-lg cursor-pointer text-black"
                title="Dark mode"
              ></i>
            ) : (
              <img
                src={sun}
                alt="sun"
                onClick={() => switchTheme()}
                className="cursor-pointer h-5"
                title="Light mode"
              />
            )} */}

            <Link to="/settings" className="hover:text-black">
              {" "}
              <i
                className="ri-settings-3-line text-xl cursor-pointer hover:text-black"
                title="Settings"
              ></i>
            </Link>

            <Badge size="small" count={5}>
              <i
                className="ri-notification-3-line text-xl cursor-pointer"
                title="Notifications"
              ></i>
            </Badge>

            <Dropdown
              overlay={
                <Themes>
                  <div className="rounded-md pt-5 pb-2 px-5 text-center bg-card shadow-md">
                    <div className="border-b-2 border-slate-600 pb-4">
                      <h4 className="font-extrabold text-lg">Todd Cantley</h4>
                      <span className="block text-xs pb-3 pt-1 text-gray-500">
                        todd@snapnetsolutions.com
                      </span>
                      <Link
                        to="/settings/profile"
                        className="font-semibold border border-red-500 rounded bg-red-500 text-white transition ease-in-out duration-300 text-sm py-2 px-3 tracking-wider hover:opacity-70"
                      >
                        My Profile
                      </Link>
                    </div>

                    <ul className="flex flex-col gap-2 pt-2 text-accent font-medium text-sm">
                      <li
                        onClick={() => setTransferOwnershipModal(true)}
                        className="border-b-2 pb-2 cursor-pointer hover:text-caramel"
                      >
                        Transfer Ownership
                      </li>
                      <TransferOwnership
                        open={transferOwnershipModal}
                        handleClose={() => setTransferOwnershipModal(false)}
                      />

                      <Link
                        to="/settings/delegations"
                        className="border-b-2 pb-2 cursor-pointer hover:text-caramel"
                      >
                        Delegate Role
                      </Link>

                      <li className="border-b-2 pb-2 cursor-pointer hover:text-caramel">
                        Advanced Settings
                      </li>
                      <Link
                        to="/billings"
                        className="border-b-2 pb-2 cursor-pointer hover:text-caramel"
                      >
                        Billings
                      </Link>
                      <li className="border-b-2 pb-2 cursor-pointer hover:text-caramel">
                        Change language
                      </li>
                    </ul>
                    <h5 className="font-bold text-left text-sm pb-3 pt-4">
                      Change Theme
                    </h5>
                    <div className="flex items-center gap-4 px-2 rounded">
                      <div
                        className="h-4 w-4 rounded-full cursor-pointer"
                        style={{ background: "#ff6647" }}
                        onClick={() => yellow()}
                      />
                      <div
                        className="h-4 w-4 rounded-full cursor-pointer"
                        style={{ background: "#01966b" }}
                        onClick={() => green()}
                      />
                      <div
                        className="h-4 w-4 rounded-full cursor-pointer"
                        style={{ background: "#d69a00" }}
                        onClick={() => orange()}
                      />
                      <div
                        className="h-4 w-4 rounded-full cursor-pointer"
                        style={{ background: "#349CE4" }}
                        onClick={() => blue()}
                      />
                      <div
                        className="h-4 w-4 rounded-full cursor-pointer"
                        style={{ background: "#6E55FF" }}
                        onClick={() => purple()}
                      />
                    </div>
                    <div className="flex items-center gap-2 mt-7 cursor-pointer font-medium text-gray-500 group">
                      <i className="ri-logout-box-r-line group-hover:text-caramel"></i>
                      <span className="group-hover:text-caramel">Logout</span>
                    </div>
                  </div>
                </Themes>
              }
              trigger={["click"]}
            >
              <Avatar
                src="https://res.cloudinary.com/ddvaelej7/image/upload/v1655735373/samples/Ellipse_4_j0womm.png"
                alt=""
                className="h-6 md:h-9 cursor-pointer border-2 border-slate-300 rounded-full ml-1"
                onClick={(e) => handleClick(e)}
              />
            </Dropdown>
          </div>
        </div>
      </div>

      {/* User profile dropdown*/}
    </>
  );
};

export default TopBar;
