import { Modal } from "antd";
import Themes from "components/Themes";
import React from "react";
import { IModalProps } from "types";

export const AddOrReplaceAsset: React.FC<IModalProps> = ({
  open,
  handleClose,
}) => {
  const inputStyle =
    "w-full rounded-md border border-gray-300 py-2 px-2 text-sm bg-mainBg focus:outline-none placeholder:text-accent";
  return (
    <Modal open={open} onCancel={() => handleClose()} footer={null}>
      <Themes>
        <div
          className="CModal overflow-y-auto scrollBar"
          style={{ maxWidth: 400, height: 500 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h5 className="font-semibold text-base">New Requisition</h5>
            <i
              onClick={() => handleClose()}
              className="ri-close-line font-semibold text-xl cursor-pointer hover:text-neutral"
            ></i>
          </div>
          <form>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
                placeholder="Requisition Date"
                className={inputStyle}
              />
              <input type="text" placeholder="Title" className={inputStyle} />

              <select name="" id="" className={inputStyle}>
                <option value="">Requisition Type</option>
                <option value="Requisition Type 1"> Requisition Type 1</option>
              </select>

              <div className="p-3 rounded-md text-sm bg-gray-200 text-black">
                <p>Previous Asset in Possession: Hp EliteBook </p>
              </div>

              <div className="text-sm bg-mainBg p-3 rounded-md">
                <p className="font-medium">Reason For Request</p>
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center gap-2">
                    <label htmlFor="Replace" className="cursor-pointer text-xs">
                      Replace Asset
                    </label>
                    <input
                      type="radio"
                      name="Reasons"
                      id="Replace"
                      className="scale-100 accent-caramel cursor-pointer"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <label
                      htmlFor="Additional"
                      className="cursor-pointer text-xs"
                    >
                      Additional Asset
                    </label>
                    <input
                      type="radio"
                      name="Reasons"
                      id="Additional"
                      className="scale-100 accent-caramel cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <input
                type="text"
                placeholder="State of previous Asset"
                className={inputStyle}
              />

              <select name="" id="" className={inputStyle}>
                <option value="">Item</option>
                <option value="Item 1">Item 1</option>
              </select>

              <input
                type="text"
                onFocus={(e) => (e.target.type = "file")}
                onBlur={(e) => (e.target.type = "text")}
                placeholder="Attachment"
                className={inputStyle}
              />
            </div>
            <div className="mt-7 flex items-center justify-between">
              <button className="transparentButton">
                Save And Add Another
              </button>
              <button className="button">Submit</button>
            </div>
          </form>
        </div>
      </Themes>
    </Modal>
  );
};
