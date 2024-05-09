import React from "react";
import { IModalProps } from "types";
import { TNotification } from "../types";
import ViewApprovalRequest from "features/core/workflows/components/approval-request/ViewApprovalRequest";

interface IProps extends IModalProps {
  content?: TNotification["content"];
}
const ViewNotification: React.FC<IProps> = ({ handleClose, open, content }) => {
  // TODO: Update to account for all the possible content data, also update type content in TNotification e.g Task
  return (
    <ViewApprovalRequest
      handleClose={handleClose}
      open={open}
      request={content?.[0]}
    />
  );
};

export default ViewNotification;
