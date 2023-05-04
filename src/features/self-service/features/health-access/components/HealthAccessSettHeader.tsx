import React from "react";
import { Link } from "react-router-dom";

const HealthAccessSettHeader = () => {
  // role from redux
  const roleContainsPerm = true;
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3 font-extrabold ">
        <i className="ri-arrow-left-s-line text-lg cursor-pointer hover:text-caramel"></i>
        <h2 className="text-xl md:text-2xl text-accent">Health Access</h2>
      </div>
    </div>
  );
};

export default HealthAccessSettHeader;
