import React from "react";

export const ScoreRange = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center border-b border-slate-400 pb-2">
        <span>Score Title</span>
        <span>Score Range</span>
      </div>
      <div className="flex justify-between items-center border-b border-slate-400 pb-2">
        <button className="transparentButton w-32">Excellent</button>
        <button className="transparentButton w-20">100%</button>
      </div>
      <div className="flex justify-between items-center border-b border-slate-400 pb-2">
        <button className="transparentButton w-32">Good</button>
        <button className="transparentButton w-20">80%</button>
      </div>
      <div className="flex justify-between items-center border-b border-slate-400 pb-2">
        <button className="transparentButton w-32">Average</button>
        <button className="transparentButton w-20">60%</button>
      </div>
      <div className="flex justify-between items-center border-b border-slate-400 pb-2">
        <button className="transparentButton w-32">Poor</button>
        <button className="transparentButton w-20">50%</button>
      </div>
      <div className="flex justify-between items-center border-b border-slate-400 pb-2">
        <button className="transparentButton  w-32">Unsatisfactory</button>
        <button className="transparentButton w-20">40%</button>
      </div>
    </div>
  );
};
