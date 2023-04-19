import { Modal } from "antd";
import React from "react";
import { IModalProps } from "types";

export const NewEvaluation = ({open, handleClose}: IModalProps) => {
  return (
    <Modal footer={null} open={open} onCancel={() => handleClose()} title="New Evaluation">
      NewEvaluation
    </Modal>
  );
};
