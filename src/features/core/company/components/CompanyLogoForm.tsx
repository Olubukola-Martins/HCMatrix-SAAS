import { UploadOutlined } from "@ant-design/icons";
import { Typography, UploadProps } from "antd";
import { Button, message, Upload } from "antd";
import React from "react";

const props: UploadProps = {
  name: "file",
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const CompanyLogoForm = () => {
  return (
    <Upload {...props}>
      <div className="flex flex-col items-center">
        <Button
          shape="circle"
          size={"large"}
          icon={<UploadOutlined />}
          className="text-3xl"
        />
        <Typography.Text>Upload Company Logo</Typography.Text>
      </div>
    </Upload>
  );
};

export default CompanyLogoForm;
