import React from "react";
import { ActivitiesGraph } from "./ActivitiesGraph";
import { Empty, Progress } from "antd";

export const Overview = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-x-5 gap-y-8 mt-5">
      <div className="lg:col-span-4 col-span-6">
        <h3 className="font-medium text-lg">Active</h3>
        <ActivitiesGraph />
      </div>
      <div className="lg:col-span-2 col-span-6">
        <h3 className="font-medium text-lg pb-7">Progress Overview</h3>
        <div className="flex justify-center">
          <Progress
            type="circle"
            percent={75}
            strokeColor="var(--caramel)"
            width={220}
          />
        </div>
        <div className="flex items-center justify-around mt-7">
          <button className="transparentButton flex items-center gap-2">
            <div className="rounded-full h-3 w-3 bg-green-700" />
            <span>{Math.floor((10 / 33) * 100)}% In progress</span>
          </button>
          <button className="transparentButton flex items-center gap-2">
            <div className="rounded-full h-3 w-3 bg-gray-400" />
            <span>{Math.floor((3 / 33) * 100)}% Not Started</span>
          </button>
        </div>
      </div>

      <div className="lg:col-span-4 col-span-6 bg-mainBg border rounded-lg shadow p-3">
        <div className="flex justify-between items-center">
          <h4 className="text-base font-medium">Compared to others</h4>
          <span className="text-sm text-caramel underline">Gamification</span>
        </div>

        <div className="flex justify-around gap-x-6 text-center mt-5">
          <div>
            <div
              className="rounded-full flex items-end justify-center h-52 w-20 p-5"
              style={{ background: " #FF66474D" }}
            >
              <span className="font-bold text-lg">15</span>
            </div>
            <span className="text-gray-500 text-base pt-3">Level</span>
          </div>
          <div>
            <div
              className="rounded-full flex items-end justify-center h-52 w-20 p-5"
              style={{ background: "#01966B4D" }}
            >
              <span className="font-bold text-lg">26</span>
            </div>
            <span className="text-gray-500 text-base pt-3">Badge</span>
          </div>
          <div>
            <div
              className="rounded-full flex items-end justify-center h-52 w-20 p-5"
              style={{ background: "#FFA6004D" }}
            >
              <span className="font-bold text-lg">3</span>
            </div>
            <span className="text-gray-500 text-base pt-3">Certification</span>
          </div>
        </div>
      </div>
      <div className="lg:col-span-2 col-span-6 bg-mainBg border rounded-lg shadow p-3">
        <div className="flex justify-between items-center">
          <h4 className="text-base font-medium">Recently Earned</h4>
          <span className="text-sm text-caramel underline">
            View all badges
          </span>
        </div>
        <Empty className="mb-3 mt-5" />
      </div>
    </div>
  );
};
