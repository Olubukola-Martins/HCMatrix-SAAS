import React from "react";

interface CapsuleProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  name: string;
  className?: string;
  isActive?: boolean;
}

const Capsule: React.FC<CapsuleProps> = ({
  name,
  className,
  isActive = false,
  ...props
}) => {
  return (
    <div
      className={`inline-block cursor-pointer text-sm font-semibold px-5 py-2 border-2 h-fit rounded-full ease-in-out ${
        isActive
          ? "bg-caramel border-caramel text-white hover:bg-opacity-45"
          : "bg-mainBg border-card text-accent hover:border-caramel hover:text-caramel"
      }  ${className}`}
      {...props}
    >
      {name}
    </div>
  );
};

export default Capsule;
