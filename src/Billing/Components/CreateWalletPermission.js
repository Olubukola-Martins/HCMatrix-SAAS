import { Modal } from "@mui/material";
import React from "react";
import Themes from "../../Themes/Themes";

const CreateWalletPermission = ({ open, handleClose }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Themes>
        <div className="CModal" style={{ maxWidth: 400 }}>
          <i
            className="fas fa-times cursor-pointer text-xl flex justify-end mb-4"
            onClick={handleClose}
          ></i>
          <h3 className="font-semibold text-lg">Create Wallet</h3>
          <p className="text-sm pt-1">
            System will automatically generate a NUBAN E-Wallet for you. You can
            find the account details on your wallet.
          </p>

          
        </div>
      </Themes>
    </Modal>
  );
};

export default CreateWalletPermission;
