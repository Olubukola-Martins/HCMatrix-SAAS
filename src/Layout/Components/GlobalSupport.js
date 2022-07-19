import { Tooltip } from "@mui/material";
import React from "react";

const GlobalSupport = () => {
  return (
    <Tooltip title="HCMatrix Quick Links" placement="top">
      <i style={{borderWidth: "6px"}} className="ri-question-mark text-lg z-50 cursor-pointer font-semibold text-caramel border-caramel bg-white h-10 w-10 flex items-center rounded-full justify-center fixed bottom-10 right-3"></i>
      </Tooltip>
  );
};

export default GlobalSupport;
