import { useCallback, useEffect, useMemo, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { Modal } from "antd";
import { appPagesData } from "config/router/routes";
import { IModalProps } from "types";
import Themes from "components/Themes";
import { TSearchLink } from "./types";
import { TPermissionLabel } from "features/core/roles-and-permissions/types";

const TEXT_FOR_NOT_SPECIFIED_TITLE = "_______________";
interface IProps extends IModalProps {
  userPermissions: TPermissionLabel[];
}
const SearchModal = ({ open, handleClose, userPermissions }: IProps) => {
  let links = useMemo(
    () =>
      appPagesData({ userPermissions }).filter(
        (item) => item.isSearchable === true
      ),
    [userPermissions]
  );
  const navigate = useNavigate();
  const [value, setValue] = useState<string>("");
  const [searchResults, setSearchResults] = useState<TSearchLink[]>([]);
  const handleSearch = useCallback(
    (val: string) => {
      const result: TSearchLink[] = links
        .filter(
          (item) => item.path.toLowerCase().indexOf(val.toLowerCase()) !== -1
        )
        .map(
          (item): TSearchLink => ({
            name: item.title ?? TEXT_FOR_NOT_SPECIFIED_TITLE,
            link: item.path,
          })
        );

      if (val !== "") {
        return result;
      }
      return [];
    },
    [links]
  );
  useEffect(() => {
    const result = handleSearch(value);
    setSearchResults(() => result);
  }, [value, handleSearch]);
  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      closeIcon={false}
      style={{ top: 60 }}
      footer={null}
      title={
        <div className="active w-full flex items-center  notranslate">
          <i className="fa-solid fa-magnifying-glass text-caramel text-lg cursor-pointer mr-10"></i>
          <input
            value={value}
            type="search"
            name="search"
            id="search"
            placeholder="What are you looking for ?"
            className="bg-transparent flex-1  focus:outline-none text-lg notranslate"
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
      }
    >
      <Themes>
        <div>
          <div className="overflow-hidden">
            {/* content */}
            <div className=" text-accent h-44">
              {/* TO DO: Refactor code to use list and list item components */}
              {searchResults.length > 0 ? (
                <div className="flex flex-col gap-4 py-2">
                  {searchResults.map((item, i) => (
                    <div className="border-0 border-b px-10 pb-2" key={i}>
                      <Link
                        to={item.link}
                        className="hover:text-caramel text-sm"
                        onClick={(e) => {
                          e.preventDefault();
                          setSearchResults([]);
                          setValue("");
                          handleClose();
                          navigate(item.link);
                        }}
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
