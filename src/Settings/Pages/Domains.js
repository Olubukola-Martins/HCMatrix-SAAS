import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import DashboardLayout from "../../Layout/DashboardLayout";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxwidth: 400,
  bgcolor: "background.paper",
  p: 4,
  borderRadius: 4,
};

const Domains = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <DashboardLayout>
      <div className="Container pb-36">
        <div className="flex items-center justify-between">
          <h4 className="text-accent text-base">
            Create and Manage Domain information of your organization
          </h4>
          <div className="flex items-center gap-1">
            <span
              className="text-caramel font-medium text-sm cursor-pointer"
              onClick={handleOpen}
            >
              + Add Domain
            </span>
            <i
              className="ri-question-fill text-gray-500"
              title="Add domain"
            ></i>
          </div>
        </div>

        <div className="bg-card rounded py-3 font-medium text-accent flex items-center justify-between text-sm px-5 mt-5">
          <span>Domain Name</span>
          <span>Verification Status</span>
          <span>DKIM Details</span>
        </div>

        <h4 className="text-base text-accent text-center pt-10">
          No Dormain consfigured yet
        </h4>

        {/* Domain modal */}
        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <h1 className="font-bold text-lg text-accent">Add Domain Name</h1>
          </Box>
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Domains;
