import { Drawer } from "antd";
import { IDrawerProps } from "../../../../AppTypes/Component";
import Themes from "../../../../Themes/Themes";

export const ImportEmployee = ({ open, handleClose }: IDrawerProps) => {
  return (
    <Drawer placement="right" onClose={() => handleClose(false)} open={open}>
      <Themes>
        <div className="border-b font-medium  px-3 py-2 flex items-center justify-between">
          <h3 className="text-lg">Upload File</h3>
          <i
            onClick={() => handleClose(false)}
            className="ri-close-line text-xl cursor-pointer"
          ></i>
        </div>
        <div className="bg-red-200 text-sm py-2 flex justify-between items-center my-5 px-3">
          <span>Employees Added: 2</span>
          <span>License count left: 5</span>
        </div>

        <form className="px-3 mt-10 pb-5">
          <div className="border border-dotted border-slate-500 rounded flex flex-col items-center gap-5 py-10 px-2">
            <p>Choose file to be Imported</p>
            <input type="file" name="" id="file" className="hidden" />
            <div className="flex justify-center">
              <label
                htmlFor="file"
                className="cursor-pointer border border-dotted border-caramel px-2 py-1 rounded text-caramel text-sm flex flex-col gap-1 items-center"
              >
                <i className="ri-download-2-line text-lg"></i>
                <span className="text-xs">Upload File</span>
              </label>
            </div>
            <p className="text-center text-xs">
              [only xls,xlsx and csv formats are supported] <br className="" />
              Maximum upload file size is 5 MB.
            </p>
          </div>
          <div className="flex items-center justify-between mt-7">
            <button
              onClick={() => handleClose(false)}
              type="button"
              className="transparentButton"
            >
              Cancel
            </button>
            <button className="button">Submit</button>
          </div>
        </form>
      </Themes>
    </Drawer>
  );
};
