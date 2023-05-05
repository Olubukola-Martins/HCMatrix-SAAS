import React from "react";
import placeholder from "../../../assets/images/placeholder.png";

interface IProps {
  src?: string;
  alt?: string;
}

export const VehicleImage: React.FC<IProps> = ({ src, alt }) => {
  return (
    <div className="flex justify-center">
      {
        <img
          src={src ?? placeholder}
          alt={alt ?? "vehicle image"}
          className=""
        />
      }
    </div>
  );
};
