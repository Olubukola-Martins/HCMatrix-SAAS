import { Form, Modal, Typography, message } from "antd";
import Upload, { RcFile } from "antd/lib/upload";
import { AppButton } from "components/button/AppButton";
import { useState } from "react";
import { IModalProps } from "types";
import { TFileType } from "types/files";

export interface IImportEntityModalProps extends IModalProps {
  title: string;
  allowedFileTypes?: TFileType[];
  maxFileSizeInMB?: number;
  handleDownloadTemplate: { fn: () => void; isLoading?: boolean };
  handleSubmit: { fn: (props: { file: any }) => void; isLoading?: boolean };
}

export const AdvancedImportEntityModal: React.FC<IImportEntityModalProps> = ({
  open,
  handleClose,
  title,
  allowedFileTypes = [
    "text/csv",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ],
  maxFileSizeInMB = 2,
  handleDownloadTemplate,
  handleSubmit,
}) => {
  return (
    <Modal
      open={open}
      footer={null}
      title={title}
      style={{ top: 20 }}
      onCancel={() => handleClose()}
    ></Modal>
  );
};
