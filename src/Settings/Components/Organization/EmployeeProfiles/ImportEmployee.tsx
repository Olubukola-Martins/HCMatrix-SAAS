import { Drawer, Form, Upload } from "antd";
import { IDrawerProps } from "../../../../AppTypes/Component";
import Themes from "../../../../Themes/Themes";

export const ImportEmployee = ({ open, handleClose }: IDrawerProps) => {
  return (
    <Drawer
      placement="right"
      title="Import Employees"
      onClose={() => handleClose(false)}
      open={open}
    >
      <Themes>
        <div className="bg-red-200 text-sm py-2 flex justify-between items-center my-5 px-3 rounded">
          <span>Employees Added: 2</span>
          <span>License count left: 5</span>
        </div>

        <Form className="px-3 mt-10 pb-5">
          <div className="border border-dotted border-slate-500 rounded flex flex-col items-center gap-5 py-10 px-2">
            <p>Choose file to be Imported</p>

            <div className="flex justify-center">
              <Upload>
                <div className="border border-dotted border-caramel px-2 py-1 rounded text-caramel text-sm flex flex-col gap-1 items-center">
                  <i className="ri-download-2-line text-lg"></i>
                  <span className="text-xs font-medium">Upload File</span>
                </div>
              </Upload>
            </div>
          </div>
          <p className="text-sm pt-1 font-medium cursor-pointer hover:text-caramel underline">
            Download template
          </p>
          <div className="flex items-center justify-between mt-10">
            <button
              onClick={() => handleClose(false)}
              type="button"
              className="transparentButton"
            >
              Cancel
            </button>
            <button className="button" type="submit">
              Submit
            </button>
          </div>
        </Form>
      </Themes>
    </Drawer>
  );
};
