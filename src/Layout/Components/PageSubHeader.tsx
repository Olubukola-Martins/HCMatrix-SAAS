import React from "react";

// Define a btn component

interface IProps {
  description: string;
  actions?: { name: string; handleClick: Function }[];
}

const PageSubHeader = ({ description, actions }: IProps) => {
  return (
    <div className="flex flex-col mt-5 gap-2 md:flex-row md:justify-between md:items-center bg-card p-2 rounded text-sm">
      <p>{description}</p>

      <div className="flex gap-4 items-center">
        {actions?.map((item) => (
          <button
            className="py-1 px-2 bg-caramel rounded text-sm text-white font-medium"
            onClick={() => item.handleClick()}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PageSubHeader;
