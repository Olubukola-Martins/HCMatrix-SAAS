import React from "react";
import placeholder from "../../assets/images/placeholder.png";

interface IProps {
  src?: string;
  alt?: string;
}

// TO DO: create an image comp to be reused for image optimizaions like in nextjs
export const EntityImageCard: React.FC<IProps> = ({ src, alt }) => {
  return (
    <div className="flex justify-center">
      {
        <img
          src={src ?? placeholder}
          alt={alt ?? "entity image"}
          className=""
        />
      }
    </div>
  );
};
