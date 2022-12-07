import { Drawer, Form, message, Typography, Upload } from "antd";
import { IDrawerProps } from "../../../../AppTypes/Component";
import Themes from "../../../../Themes/Themes";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { useState } from "react";
import * as XLSX from "xlsx";

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  // const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  // if (!isJpgOrPng) {
  //   message.error("You can only upload JPG/PNG file!");
  // }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return false;
};

export const ImportEmployee = ({ open, handleClose }: IDrawerProps) => {
  const [columns, setColumns] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
    console.log("FILE", info.file);
    var reader = new FileReader();
    reader.onload = function (e: any) {
      var data = e.target.result;
      let readedData = XLSX.read(data, { type: "binary" });
      const wsname = readedData.SheetNames[0];
      const ws = readedData.Sheets[wsname];

      /* Convert array to json*/
      const dataParse = XLSX.utils.sheet_to_json(ws, {
        header: 1,
      }) as unknown as string[][];
      console.log(dataParse[0], "reader");
      setColumns(dataParse[0]);
    };
    reader.readAsBinaryString(info.file.originFileObj as any);
  };
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
              <Upload
                // fileList={fileList}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={handleChange}
                className="flex flex-col items-center"
              >
                <div className="border border-dotted border-caramel px-2 py-1 rounded text-caramel text-sm flex flex-col gap-1 items-center justify-center">
                  <i className="ri-download-2-line text-lg"></i>
                  <span className="text-xs font-medium">Upload File</span>
                </div>
              </Upload>
            </div>
          </div>
          <Typography.Text title="Please Download template and populate">
            <span className="text-sm pt-1 font-medium cursor-pointer hover:text-caramel underline">
              Download template
            </span>
          </Typography.Text>
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
