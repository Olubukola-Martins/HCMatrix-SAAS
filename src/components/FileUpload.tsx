import { UploadOutlined } from "@ant-design/icons";
import { UploadProps, message, Upload, Button, Typography } from "antd";
import { IAuthDets } from "features/authentication/types";
import { useContext } from "react";
import { useAuthUser } from "react-auth-kit";
import { GlobalContext, EGlobalOps } from "stateManagers/GlobalContextProvider";

// TO DO: HANDLE And account for the delete of a file from context

type TFileType =
  | "image/png"
  | "image/jpeg"
  | "image/jpg"
  | "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  | "text/plain"
  | "application/pdf"
  | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  | "video/*"
  | "audio/*";
interface IFilesProps {
  allowedFileTypes: TFileType[];
  displayType?: "icon" | "button" | "form-space-between";
  textToDisplay?: string;
  fileKey: string;
}

export const FileUpload = ({
  allowedFileTypes,
  displayType = "button",
  textToDisplay = "Click to Upload",
  fileKey,
}: IFilesProps) => {
  const auth = useAuthUser();
  const authDetails = auth() as unknown as IAuthDets;
  const token = authDetails.userToken;
  const globalCtx = useContext(GlobalContext);
  const { state: globalState, dispatch } = globalCtx;
  const companyId = globalState.currentCompany?.id;

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
    action: `${process.env.REACT_APP_UTILITY_BASE_URL}/file`,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "x-company-id": companyId as string,
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
      </Upload>
    </div>
  );
};
