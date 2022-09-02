import React from "react";

const CompanyEntryCard = () => {
  return (
    <div className="flex justify-between rounded-md items-center px-3 py-4 bg-white">
      <div className="flex gap-4">
        <div>
          {/* logo */}
          <div className=" rounded-full min-h-min min-w-min">
            <img
              src="https://picsum.photos/201"
              alt="bg"
              className="h-12 w-12 object-contain rounded-full"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="text-lg font-light">Dangote Cement</h4>
          <p className="text-xs">Last login Today at 5:32 AM</p>
        </div>
      </div>
      <div className="flex items-center gap-4 text-xs">
        <button className="bg-caramel px-3 py-2 rounded-md text-white">
          Enter{" "}
        </button>
        <button className="border border-red-300 px-3 py-2 rounded-md">
          Delete{" "}
        </button>
      </div>
    </div>
  );
};

export default CompanyEntryCard;
