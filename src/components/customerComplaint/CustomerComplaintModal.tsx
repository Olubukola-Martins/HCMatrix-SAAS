import { Modal } from "antd";
import React from "react";
import CustomerComplaintForm from "./CustomerComplaintForm";
import Themes from "components/Themes";

interface IProps {
  open: boolean;
  handleClose: Function;
}

const CustomerComplaintModal = ({ open, handleClose }: IProps) => {
  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      style={{ maxWidth: 500, top: 10 }}
      footer={null}
    >
      <Themes>
        <div>
          <div className="flex items-center justify-between w-full mb-5">
            <h5 className="text-base font-semibold">Drop Complaint</h5>
          </div>
          <CustomerComplaintForm handleClose={handleClose} />
        </div>
      </Themes>
    </Modal>
  );
};

export default CustomerComplaintModal;
