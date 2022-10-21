import { Button, Popover, Tooltip } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import SurveyFormsGridView from "./SurveyFormsGridView";
import SurveyFormsListView from "./SurveyFormsListView";

export interface ISFEntry {
  name: string;
  author: string;
  lastModified: string;
  description: string;
}

const dummyData: ISFEntry[] = [
  {
    name: "HR Survey Form",
    author: "Esther",
    lastModified: "6/07/2022",
    description: "This is to get data",
  },
  {
    name: "Dev Survey Form",
    author: "James",
    lastModified: "6/07/2022",
    description: "For productivity",
  },
];

const SurveyFormsContainer = () => {
  const [listView, setListView] = useState(false);
  return (
    <div>
      <div className="flex items-center justify-between text-lg font-normal mb-5 mt-14">
        <h4>Recent Forms</h4>

        <div className="flex items-center gap-3">
          <Link to="/self-service/survey/new">
            <Button type="dashed">Create Form</Button>
          </Link>
          {/* <button className="button"> Create Form</button> */}
          {listView ? (
            <Tooltip title="List View">
              <i
                className="ri-list-unordered text-2xl cursor-pointer"
                onClick={() => setListView(false)}
              ></i>
            </Tooltip>
          ) : (
            <Tooltip title="Grid View">
              <i
                className="ri-layout-grid-line text-2xl cursor-pointer"
                onClick={() => setListView(true)}
              ></i>
            </Tooltip>
          )}
        </div>
      </div>
      <div className="mt-6">
        {listView ? (
          <SurveyFormsGridView data={dummyData} />
        ) : (
          <SurveyFormsListView data={dummyData} />
        )}
      </div>
    </div>
  );
};

export default SurveyFormsContainer;
