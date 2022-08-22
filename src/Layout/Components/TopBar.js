import React, { useState } from "react";
import logo from "../Images/logo.png";
import sun from "../Images/sun.svg";
import { Link } from "react-router-dom";

import {
  Autocomplete,
  TextField as MuiTextField,
  Box,
  Avatar,
} from "@mui/material";
import SearchModal from "./Search/SearchModal";
import { Menu } from "@mui/material";
import Themes from "../../Themes/Themes";
import TransferOwnership from "./TransferOwnership";

import { styled } from "@mui/material/styles";
import UserLicense from "../../Billing/Components/UserLicense";

const companies = [
  { name: "Dangote Oil", id: 1994, image: "https://picsum.photos/190" },
  { name: "Google", id: 1992, image: "https://picsum.photos/201" },
  { name: "General Electric", id: 1972, image: "https://picsum.photos/202" },
  { name: "PgLang", id: 1974, image: "https://picsum.photos/203" },
  { name: "Microsft", id: 1979, image: "https://picsum.photos/204" },
  { name: "Apple", id: 1999, image: "https://picsum.photos/205" },
  { name: "Amazon", id: 2001, image: "https://picsum.photos/207" },
];

const TextField = styled(MuiTextField)(({ theme }) => ({
  width: 180,
  height: 30,
  color: "var(--textColor)",

  "& .MuiOutlinedInput-root": {
    // padding: 0,
    borderRadius: 100,
    background: "var(--background)",
    color: "var(--textColor)",
  },
  "& .MuiSvgIcon-root": {
    fill: "#aaa",
  },
  "& .MuiAutocomplete-input": {
    // padding: 0,
    background: "var(--background)",
  },
}));

const TopBar = ({
  switchTheme,
  theme,
  green,
  yellow,
  orange,
  blue,
  purple,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [transferOwnershipModal, setTransferOwnershipModal] = useState(false);
  const [licenseModal, setLicenseModal] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [companyId, setCompanyId] = useState(companies[0].image);
  function changeCompanyId(id) {
    if (companyId === id) {
      setCompanyId("");
      return;
    }
    setCompanyId(id);
  }

  const [openSearchModal, setOpenSearchModal] = useState(false);

  const id = open ? "simple-popover" : undefined;

  const openLicenseModal = () => {
    setLicenseModal(true);
    handleClose();
  };

  return (
    <>
      <UserLicense
        open={licenseModal}
        handleClose={() => setLicenseModal(false)}
      />
      <div className="bg-caramel w-full py-2 sticky top-0 z-50">
        <div className="px-5 lg:px-10 flex items-center justify-between">
          <Link to="/">
            <img src={logo} alt="logo" className="md:h-10 h-7" />
          </Link>

          <div className="flex gap-4 items-center">
            <i className="fa-solid fa-magnifying-glass lg:hidden cursor-pointer text-base text-white"></i>
            <div className="lg:flex items-center gap-6 hidden mr-10">
              <i
                className="fa-solid fa-magnifying-glass cursor-pointer text-base text-white"
                title="Search HcMatrix application"
                onClick={() => setOpenSearchModal(true)}
              ></i>
              <SearchModal
                open={openSearchModal}
                handleClose={() => setOpenSearchModal(false)}
              />
              <div className="flex items-center gap-1">
                <Avatar
                  sx={{
                    width: 35,
                    height: 35,
                    background: "none",
                    border: "2px solid #fff",
                  }}
                  src={companyId}
                ></Avatar>
                <div className="relative bottom-1">
                  {/* search omppz */}
                  {companyId === "" && (
                    <label className="text-gray-400 text-sm absolute z-10 pointer-events-none top-3 left-4">
                      Switch Company
                    </label>
                  )}
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={companies}
                    onInputChange={(_, value, reason) => {
                      reason === "input" && setCompanyId(() => value?.image);
                      (reason === "clear" || value === "") &&
                        setCompanyId(() => "");
                    }}
                    getOptionLabel={(option) => option.name}
                    defaultValue={companies.find((v) => v.name[0])}
                    onChange={(event, value, reason) =>
                      reason === "selectOption" && changeCompanyId(value?.image)
                    }
                    renderOption={(props, option) => (
                      <Box
                        component="li"
                        sx={{ "& > img": { mr: 1, flexShrink: 0 } }}
                        {...props}
                      >
                        <Avatar
                          sx={{ width: 24, height: 24, bgcolor: "#6E55FF" }}
                          src={option.image}
                        ></Avatar>

                        <span className="text-sm ml-1">{option.name}</span>
                      </Box>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        InputLabelProps={{
                          shrink: false,
                          placeholder: "Switch Company",
                        }}
                        size="small"
                      />
                    )}
                  />
                </div>
              </div>
            </div>

            {theme === "light" ? (
              <i
                onClick={switchTheme}
                className="fas fa-moon text-lg cursor-pointer text-black"
                title="Dark mode"
              ></i>
            ) : (
              <img
                src={sun}
                alt="sun"
                onClick={switchTheme}
                className="cursor-pointer h-5"
                title="Light mode"
              />
            )}

            <Link to="/settings">
              {" "}
              <i
                className="ri-settings-3-line text-xl text-white cursor-pointer"
                title="Settings"
              ></i>
            </Link>
            <i
              onClick={handleClick}
              className="ri-notification-3-line text-xl cursor-pointer text-white"
              title="Notifications"
            ></i>
            <img
              src="https://res.cloudinary.com/ddvaelej7/image/upload/v1655735373/samples/Ellipse_4_j0womm.png"
              alt=""
              className="h-6 md:h-8 cursor-pointer"
              onClick={handleClick}
            />
          </div>
        </div>
      </div>

      {/* User profile dropdown*/}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Themes>
          <div className="rounded-md pt-5 pb-2 px-5 text-center">
            <div className="border-b-2 border-slate-600 pb-4">
              <h4 className="font-extrabold text-lg">Todd Cantley</h4>
              <span className="block text-xs pb-3 pt-1 text-gray-500">
                todd@snapnetsolutions.com
              </span>
              <Link
                to="/settings/employee-profile/id"
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
              <li
                onClick={openLicenseModal}
                className="border-b-2 pb-2 cursor-pointer hover:text-caramel"
              >
                Billings
              </li>
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
                onClick={yellow}
              />
              <div
                className="h-4 w-4 rounded-full cursor-pointer"
                style={{ background: "#01966b" }}
                onClick={green}
              />
              <div
                className="h-4 w-4 rounded-full cursor-pointer"
                style={{ background: "#d69a00" }}
                onClick={orange}
              />
              <div
                className="h-4 w-4 rounded-full cursor-pointer"
                style={{ background: "#349CE4" }}
                onClick={blue}
              />
              <div
                className="h-4 w-4 rounded-full cursor-pointer"
                style={{ background: "#6E55FF" }}
                onClick={purple}
              />
            </div>
            <div className="flex items-center gap-2 mt-7 cursor-pointer font-medium text-gray-500 group">
              <i className="ri-logout-box-r-line group-hover:text-caramel"></i>
              <span className="group-hover:text-caramel">Logout</span>
            </div>
          </div>
        </Themes>
      </Menu>
    </>
  );
};

export default TopBar;
