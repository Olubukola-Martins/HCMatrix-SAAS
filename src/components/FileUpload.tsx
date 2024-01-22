import { UploadOutlined } from "@ant-design/icons";
import { UploadProps, message, Upload, Button, Typography } from "antd";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useContext } from "react";
import { GlobalContext, EGlobalOps } from "stateManagers/GlobalContextProvider";
import { TFileType } from "types/files";

// TO DO: HANDLE And account for the delete of a file from context

interface IFilesProps {
  allowedFileTypes: TFileType[];
  displayType?: "icon" | "button" | "form-space-between" | "dotted-box";
  textToDisplay?: string;
  fileKey: string;
}

export const FileUpload = ({
  allowedFileTypes,
  displayType = "button",
  textToDisplay = "Click to Upload",
  fileKey,
}: IFilesProps) => {
  const { token, companyId } = useApiAuth();
  const globalCtx = useContext(GlobalContext);
  const { dispatch } = globalCtx;

  const props: UploadProps = {
    beforeUpload: (file) => {
      let allowSubmission = true;
      if (!allowedFileTypes.includes(file.type as TFileType)) {
        allowSubmission = false;
      }
      if (!allowSubmission) {
        message.error(`This file type (${file.type}) is not allowed!`);
      }
      return allowSubmission || Upload.LIST_IGNORE;
    },
    name: "file",
    // showUploadList: false,
    action: `${MICROSERVICE_ENDPOINTS.UTILITY}/file`,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "x-company-id": companyId.toString(),
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        // console.log(info.file.response.data);
      }
      if (info.file.status === "done") {
        dispatch({
          type: EGlobalOps.setUploadFileString,
          payload: { value: info.file.response.data, key: fileKey },
        });
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div className="resusable-file-upload">
      <Upload {...props}>
        {displayType === "button" && (
          <Button icon={<UploadOutlined />}>{textToDisplay}</Button>
        )}
        {displayType === "form-space-between" && (
          <div className="flex justify-between items-center w-full">
            <span>{textToDisplay}</span>
            <UploadOutlined />
          </div>
        )}
        {displayType === "icon" && (
          <div className="flex flex-col items-center">
            <Button
              shape="circle"
              size={"large"}
              icon={<UploadOutlined />}
              className="text-3xl"
            />
            <Typography.Text>{textToDisplay}</Typography.Text>
          </div>
        )}
        {displayType === "dotted-box" && (
          <div className="w-full border border-dotted border-caramel px-2 py-1 rounded text-caramel text-sm flex flex-col gap-1 items-center justify-center">
            <i className="ri-download-2-line text-2xl"></i>
            <span className="text-xs font-medium">Upload File</span>
          </div>
        )}
      </Upload>
    </div>
  );
};
