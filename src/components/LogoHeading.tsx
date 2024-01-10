import { hcMatrixLogo } from "assets/images";
import React from "react";

const LogoHeading: React.FC<{ title: string }> = ({ title }) => {
  return (
    <div className="flex flex-col gap-y-1">
      <img src={hcMatrixLogo} alt="hcmatrix logo" className="h-12" />
      <h4 className="font-bold text-xl tracking-wider capitalize">{title}</h4>
    </div>
  );
};

export default LogoHeading;
