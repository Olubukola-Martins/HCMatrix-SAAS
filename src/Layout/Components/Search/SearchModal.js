import Modal from "@mui/material/Modal";
import Themes from "../../../Themes/Themes";
import { useState } from "react";
import { settingNavItems } from "../../../Settings/Data/index";
import { Link } from "react-router-dom";

let links = [];

settingNavItems.forEach((parent) => {
  links = [...parent.items, ...links];
});

const SearchModal = ({ open, handleClose }) => {
  console.log(links);

  const [searchResults, setSearchResults] = useState([]);
  const handleSearch = (e) => {
    const val = e.target.value;

    const result = links.filter(
      (item) => item.name.toLowerCase().indexOf(val.toLowerCase()) !== -1
    );

    if (val !== "") {
      setSearchResults(() => result);
    } else {
      setSearchResults([]);
    }
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="Email Verification"
      aria-describedby="Please verify your account by checking your inbox."
      BackdropProps={{ invisible: false }}
    >
      <Themes>
        <div
          className="CModal overflow-y-auto"
          style={{
            maxWidth: 600,
            top: "20%",
            transform: "translate(-50%, -20%)",
            padding: 0,
          }}
        >
          <div className="overflow-hidden">
            {/* filter heading */}
            <div className="active w-full flex items-center md:px-5 px-10 h-12 notranslate">
              <i className="fa-solid fa-magnifying-glass text-caramel text-lg cursor-pointer mr-10"></i>
              <input
                type="search"
                name="search"
                id="search"
                placeholder="What are you looking for ?"
                className="bg-transparent flex-1 py-5 focus:outline-none text-lg notranslate"
                onChange={handleSearch}
              />
            </div>

            {/* content */}
            <div className="mt-2 text-accent border-0 border-t overflow-y-auto h-80">
              {searchResults.length > 0 ? (
                <div className="flex flex-col gap-4 py-4">
                  {searchResults.map((item) => (
                    <div
                      className="border-0 border-b px-10 pb-2"
                      key={Date.toString()}
                    >
                      <Link
                        to={item.link}
                        className="hover:text-caramel text-sm"
                      >
                        {item.name}
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center text-center h-40 justify-center">
                  <p className="text-lg text-slate-400">No results found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Themes>
    </Modal>
  );
};

export default SearchModal;
