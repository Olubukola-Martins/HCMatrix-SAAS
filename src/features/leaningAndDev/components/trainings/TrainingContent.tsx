import React from "react";

export const TrainingContent = () => {
  return (
    <>
      <div className="bg-card rounded p-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-3">
        <div className="bg-mainBg rounded-l-md px-2 py-3 flex lg:justify-center gap-3">
          <div>
            <img
              src="https://res.cloudinary.com/ddvaelej7/image/upload/v1657714689/samples/personal-info_vgptbq.png"
              alt="user"
              className="h-28"
            />
          </div>
          <div className="hidden md:flex flex-col gap-2">
            <h3 className="font-semibold">Training Title:</h3>
            <h3 className="font-semibold">Training Description:</h3>
          </div>
        </div>

        <div className="bg-mainBg rounded-r-md px-2 py-3 gap-2 lg:col-span-2">
          <div className="flex flex-col gap-2">
            <p>
              <span className="font-semibold pr-2 md:hidden flex">
                Training Title:
              </span>
              Angular js
            </p>
            <p className="text-sm">
              <span className="font-semibold pr-2 md:hidden flex">
                Training Description:
              </span>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque
              temporibus enim culpa, dignissimos recusandae alias a ut.
              Laboriosam doloremque ipsa cumque dolore a sed, alias, accusantium
              nemo tenetur dolorum amet.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
