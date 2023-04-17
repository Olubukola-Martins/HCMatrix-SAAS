import {
  Button,
  Drawer,
  Form,
  message,
  Select,
  Typography,
  Upload,
} from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { useState } from "react";
import * as XLSX from "xlsx";
import { TMappingSection } from "./MappingDetails";
import { generalValidationRules } from "utils/formHelpers/validation";

const importBasedOnOptions = [
  {
    label: "Employee Id",
    value: "empUid",
  },
  {
    label: "Email",
    value: "email",
  },
];

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
  // const isLt2M = file.size / 1024 / 1024 < 2;
  // if (!isLt2M) {
  //   message.error("Image must smaller than 2MB!");
  // }
  return false;
};

interface IProps {
  setColumns: Function;
  setRetrievedData: Function;
  handleNext: Function;
  activeStep: number;
  sections: TMappingSection[];
  handleSections: (val: TMappingSection[]) => void;
}

export const UploadExcelForm = ({
  setColumns,
  handleNext,
  activeStep,
  setRetrievedData,
  sections,
  handleSections,
}: IProps) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
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
      console.log("Data", dataParse);
      const columns: string[] = dataParse[0];
      const retrievedData: any[] = dataParse.splice(1);

      console.log("FData", retrievedData);

      setColumns(columns);
      setRetrievedData(retrievedData);
    };
    reader.readAsBinaryString(info.file as unknown as any);
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
  };

  const handleSubmit = (data: any) => {
    console.log("QW", data);
    const selectedSections = sections.filter((section) =>
      data.sections.find((item: string) => item === section.title)
    );
    handleSections(selectedSections);
    handleNext();
  };
  return (
    <Form className="" requiredMark={false} onFinish={handleSubmit}>
      <Form.Item
        label="Import for:"
        name="sections"
        rules={generalValidationRules}
      >
        <Select
          options={sections.map((item) => ({
            label: item.title,
            value: item.title,
          }))}
          mode="multiple"
          placeholder="What data are you importing"
        />
      </Form.Item>
      <Form.Item
        label="Import based on:"
        name="basedOn"
        rules={generalValidationRules}
      >
        <Select
          options={importBasedOnOptions}
          placeholder="What is this import based on"
        />
      </Form.Item>
      <div className="border border-dotted border-slate-500 rounded flex flex-col items-center gap-2 py-3 px-2">
        <p>Select file to be Imported</p>
        <Typography.Text title="Please Download template and populate">
          <span className="text-sm pt-1 font-medium cursor-pointer hover:text-caramel underline">
            Download template
          </span>
        </Typography.Text>

        <div className="flex justify-center w-3/5">
          <Upload
            // fileList={fileList}
            beforeUpload={beforeUpload}
            onChange={handleChange}
            className="flex flex-col items-center w-full"
          >
            <div className="w-full border border-dotted border-caramel px-2 py-1 rounded text-caramel text-sm flex flex-col gap-1 items-center justify-center">
              <i className="ri-download-2-line text-2xl"></i>
              <span className="text-xs font-medium">Upload File</span>
            </div>
          </Upload>
        </div>
      </div>
      {/* buttons */}
      <div className="flex flex-row justify-between w-full mt-4">
        <div className="ml-auto">
          <button className="button" type="submit">
            Next
          </button>
        </div>
      </div>
    </Form>
  );
};
