import { Popover } from "antd";
import React from "react";
import { ISFEntry } from "./SurveyFormsContainer";

interface IProps {
  data?: ISFEntry[];
}

const SurveyFormsGridView = ({ data = [] }: IProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
      {data.map(() => (
        <div className="bg-card shadow-md rounded py-5 px-3 text-center flex flex-col gap-16">
          <h4>Survey Form</h4>

          <h2 className="font-medium text-lg">HR Survey Form</h2>
          <div className="flex items-center justify-between">
            <span>Opened DD/MM/YY</span>
            <Popover
              content={() => (
                <div className="flex flex-col gap-3">
                  <span>View</span>
                  <span>Rename</span>

                  <span>Delete</span>
                </div>
              )}
              trigger="click"
            >
              <i className="ri-more-2-fill text-lg cursor-pointer"></i>
            </Popover>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SurveyFormsGridView;
