import React from "react";

interface CardWrapperProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  isActive?: boolean;
  isSelectable?: boolean;
}

const CardWrapper: React.FC<CardWrapperProps> = ({ children, className, isActive, isSelectable, ...props }) => {
  return (
    <div className={`border-2 rounded-[20px] h-fit p-3 bg-mainBg   shadow shadow-card text-accent ${isActive ? "border-caramel" : "border-card"} ${className} ${isSelectable ? "cursor-pointer" : ""}`} {...props}>
      {children}
    </div>
  );
};

export default CardWrapper;
