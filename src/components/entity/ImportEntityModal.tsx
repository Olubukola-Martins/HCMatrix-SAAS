import { Form, Modal, Typography, message } from "antd";
import Upload, { RcFile } from "antd/lib/upload";
import { AppButton } from "components/button/AppButton";
import { DEFAULT_MAX_FILE_UPLOAD_SIZE_IN_MB } from "constants/files";
import { useState } from "react";
import { IModalProps } from "types";
import { TFileType } from "types/files";

export interface IImportEntityModalProps extends IModalProps {
  title: string;
  description?: React.ReactNode;
  allowedFileTypes?: TFileType[];
  maxFileSizeInMB?: number;
  handleDownloadTemplate: { fn: () => void; isLoading?: boolean };
  handleSubmit: { fn: (props: { file: any }) => void; isLoading?: boolean };
}

export const ImportEntityModal: React.FC<IImportEntityModalProps> = ({
  open,
  handleClose,
  title,
  allowedFileTypes = [
    "text/csv",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ],
  maxFileSizeInMB = DEFAULT_MAX_FILE_UPLOAD_SIZE_IN_MB,
  handleDownloadTemplate,
  handleSubmit,
  description,
}) => {
  
  const [form] = Form.useForm();

  const [fileList, setFilelist] = useState<any>([]);
  const handleUpload = (val: any) => {
    setFilelist(val.fileList);
  };
  const [submission, setSubmission] = useState<{
    allow: boolean;
    errors: string[];
  }>({
    allow: false,
    errors: [],
  });
  const beforeUpload = (file: RcFile) => {
    const isLt2M = file.size / 1024 / 1024 <= maxFileSizeInMB;
    let allowSubmission = true;
    let errors = [];
    if (!allowedFileTypes.includes(file.type as TFileType)) {
      allowSubmission = false;

      let error = `This file type (${file.type}) is not allowed!`;
      errors.push(error);

      message.error(error);
    }

    if (!isLt2M) {
      allowSubmission = false;
      let error = `File must smaller than or equal to ${maxFileSizeInMB}MB!`;
      errors.push(error);

      message.error(error);
    }
    setSubmission({ allow: allowSubmission, errors });
    return false; //this is done so that it prevents dafault value
  };
  const onFinish = () => {
    if (submission.allow === false) {
      submission.errors.forEach((err) => message.error(err));
      return;
    }
    handleSubmit.fn({ file: fileList[0]?.originFileObj });
  };

  return (
    <Modal
      open={open}
      footer={null}
      title={title}
      style={{ top: 20 }}
      onCancel={() => handleClose()}
    >
  {description}
      <Form form={form} onFinish={onFinish} requiredMark={false}>
        <div className="border border-dotted border-slate-500 rounded flex flex-col items-center gap-2 py-3 px-2">
        
          <p>Select file to be Imported</p>
          <Typography.Text title="Please Download template and populate">
            <span
              className="text-sm pt-1 font-medium cursor-pointer hover:text-caramel underline"
              onClick={() => handleDownloadTemplate.fn()}
            >
              Download template
            </span>
          </Typography.Text>

          <div className="flex justify-center w-3/5">
            <Upload
              fileList={fileList}
              onChange={handleUpload}
              onRemove={(file) => {
                const index = fileList.indexOf(file);
                const newFileList = fileList.slice();
                newFileList.splice(index, 1);
                setFilelist(newFileList);
              }}
              beforeUpload={beforeUpload}
            >
              {fileList.length !== 1 && (
                <div className="w-full border border-dotted border-caramel px-2 py-1 rounded text-caramel text-sm flex flex-col gap-1 items-center justify-center">
                  <i className="ri-download-2-line text-2xl"></i>
                  <span className="text-xs font-medium">Upload File</span>
                </div>
              )}
            </Upload>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <AppButton
            label="Upload"
            type="submit"
            isLoading={handleSubmit.isLoading}
            disabled={fileList.length <= 0}
          />
        </div>
      </Form>
    </Modal>
  );
};
