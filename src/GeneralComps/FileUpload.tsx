import { UploadOutlined } from "@ant-design/icons";
import { UploadProps, message, Upload, Button } from "antd";
import { IAuthDets } from "AppTypes/Auth";
import { EGlobalOps, GlobalContext } from "Contexts/GlobalContextProvider";
import { useContext } from "react";
import { useAuthUser } from "react-auth-kit";

type TFileType =
  | "image/png"
  | "image/jpeg"
  | "image/jpg"
  | "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  | "text/plain"
  | "application/pdf"
  | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
interface IFilesProps {
  allowedFileTypes: TFileType[];
  displayType?: "icon" | "button";
}

export const FileUpload = ({
  allowedFileTypes,
  displayType = "button",
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
          payload: info.file.response.data,
        });
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div>
      <Upload {...props}>
        {displayType === "button" && (
          <Button icon={<UploadOutlined />} >Click to Upload</Button>
        )}
        {displayType === "icon" && <div>Test file +</div>}
      </Upload>
    </div>
  );
};
