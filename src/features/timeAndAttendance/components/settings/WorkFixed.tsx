import React from "react";

export const WorkFixed = () => {
  const boxStyle = "border py-3 px-5 text-accent font-medium text-base";
  return (
    <div>
      <div className="flex items-center flex-wrap gap-3">
        <h4 className="text-base font-medium">Days of the week</h4>
        <div className="flex items-center flex-wrap">
          <div className={`${boxStyle} bg-caramel rounded-l`}>
            <h5>M</h5>
          </div>
        </div>
      </div>
    </div>
  );
};
