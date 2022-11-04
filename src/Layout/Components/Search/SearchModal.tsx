import Themes from "../../../Themes/Themes";
import { useState } from "react";
import {
  ISettNavItem,
  settingNavItems,
  TLink,
} from "../../../Settings/Data/index";
import { Link } from "react-router-dom";
import { Modal } from "antd";

let links: TLink[] = [];

settingNavItems.forEach((parent) => {
  links = [...parent.items, ...links];
});

interface IProps {
  open: boolean;
  handleClose: Function;
}

const SearchModal = ({ open, handleClose }: IProps) => {
  const [searchResults, setSearchResults] = useState<TLink[]>([]);
  const handleSearch = (val: string) => {
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
      onCancel={() => handleClose()}
      aria-labelledby="Email Verification"
      aria-describedby="Please verify your account by checking your inbox."
      closeIcon={false}
      style={{ top: 60 }}
      footer={null}
      title={
        <div className="active w-full flex items-center  notranslate">
          <i className="fa-solid fa-magnifying-glass text-caramel text-lg cursor-pointer mr-10"></i>
          <input
            type="search"
            name="search"
            id="search"
            placeholder="What are you looking for ?"
            className="bg-transparent flex-1  focus:outline-none text-lg notranslate"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      }
    >
      <Themes>
        <div>
          <div className="overflow-hidden">
            {/* content */}
            <div className=" text-accent h-44">
              {searchResults.length > 0 ? (
                <div className="flex flex-col gap-4 py-2">
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
