import React from "react";

const successInfo = [
  { title: "Number of records added", count: 20 },
  { title: "Number of records updated", count: 12 },
  { title: "Number of records Skipped", count: 29 },
  { title: "Number of errors", count: 0 },
];

const HandleDuplicate = ({ handleActiveStep, handleClose }) => {
  return (
    <div className="mt-4 pb-6">
      <div className="px-6 py-3 flex flex-col gap-6">
        {/* view record box */}
        <div className="flex flex-col align-center text-center text-xs border border-dotted border-gray-400 px-1 py-2 gap-3 pb-4">
          <i className="ri-download-2-line text-caramel text-2xl cursor-pointer"></i>
          <h6 className="text-bold text-base mb-2">
            The selected file has been imported Successfully.
          </h6>

          <div className="button-container mt-2">
            <button
              className="py-1 px-2 rounded text-sm text-caramel border font-medium"
              style={{ borderColor: "var(--caramel)" }}
            >
              View Records
            </button>
          </div>
        </div>
        {/* info section */}
        <div className="grid grid-cols-2 gap-4">
          {successInfo.map((item) => (
            <div>
              <div
                key={item.title}
                className="info-container py-2 px-3 flex items-center justify-between rounded-md bg-white"
              >
                <p className="text-slate-400 text-sm">{item.title}</p>
                <span className="block border-caramel border py-0.5 px-1 rounded-sm text-xs">
                  {item.count}
                </span>
              </div>
            </div>
          ))}
        </div>
        {/* ctrl btns */}
        <div className="form-buttons flex justify-between mt-2 mb-4">
          <button className="py-2 px-4  rounded text-sm  font-medium border border-black">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default HandleDuplicate;
