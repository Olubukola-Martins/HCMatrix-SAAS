import { Typography, Upload } from "antd";
import React from "react";

const ImportBranchForm = ({ handleClose }: { handleClose: Function }) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="border border-dotted border-slate-500 rounded flex flex-col items-center gap-2 py-3 px-2">
        <p>Select file to be Imported</p>
        <Typography.Text title="Please Download template and populate">
          <a
            href={`
        `}
          >
            <span className="text-sm pt-1 font-medium cursor-pointer hover:text-caramel underline">
              Download template
            </span>
          </a>
        </Typography.Text>

        <div className="flex justify-center w-3/5">
          <Upload
            // fileList={fileList}
            //   beforeUpload={beforeUpload}
            //   onChange={handleChange}
            className="flex flex-col items-center w-full"
            maxCount={1}
          >
            <div className="w-full border border-dotted border-caramel px-2 py-1 rounded text-caramel text-sm flex flex-col gap-1 items-center justify-center">
              <i className="ri-download-2-line text-2xl"></i>
              <span className="text-xs font-medium">Upload File</span>
            </div>
          </Upload>
        </div>
      </div>
      <button
        className="button "
        //   onClick={handleSubmit}
        //   loading={isLoading}
        //   disabled={dataToBeSubmited === ""}
      >
        Upload Branches
      </button>
    </div>
  );
};

export default ImportBranchForm;
