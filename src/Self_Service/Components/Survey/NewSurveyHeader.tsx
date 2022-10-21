import React from "react";

const NewSurveyHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3 font-extrabold ">
        <i className="ri-arrow-left-s-line text-lg cursor-pointer hover:text-caramel"></i>
        <h2 className="text-xl md:text-2xl text-accent">New Survey</h2>
      </div>
      <div className="flex items-center gap-4 font-extrabold ">
        <i className="ri-eye-line text-base cursor-pointer hover:text-caramel" />
        <i className="ri-arrow-go-back-fill text-base cursor-pointer hover:text-caramel" />
        <i className="ri-arrow-go-forward-fill text-base cursor-pointer hover:text-caramel" />
        <button className="button">Send</button>
      </div>
    </div>
  );
};

export default NewSurveyHeader;
