import React from "react";
import { boxStyle } from "styles/reused";
import SelectUserHeader from "./SelectUserHeader";
import SelectUserContent from "./SelectUserContent";

const UserSelectionContainer = () => {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-light">
        N:B The users not selected for either license or unlicensed will
        automatically be deactivated from the system.
      </p>
      <div className={`${boxStyle} text-sm bg-card flex flex-col gap-6`}>
        <SelectUserHeader />
        <SelectUserContent />
      </div>
    </div>
  );
};

export default UserSelectionContainer;
