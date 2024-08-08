import { Modal } from "antd";
import React from "react";
import Themes from "components/Themes";
import { IoIosArrowBack } from "react-icons/io";

interface IProps {
  open: boolean;
  handleClose: Function;
}

const SearchAIChatBotModal = ({ open, handleClose }: IProps) => {
  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      style={{ maxWidth: 500, top: 10 }}
      footer={null}
      closable={false}
    >
      <Themes>
        <div className="relative mb-4">
          <button onClick={() => handleClose()} className="absolute left-0">
            <IoIosArrowBack  />
          </button>
          <h5 className="text-sm font-medium text-center">Search</h5>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search ..."
            className="w-full px-4 py-2 pl-9 text-sm border rounded-full focus:outline-none focus:border-blue-400"
          />
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <i className="ri-search-line text-gray-400"></i>
          </div>
        </div>
      </Themes>
    </Modal>
  );
};

export default SearchAIChatBotModal;
