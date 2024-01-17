import { Dropdown, Skeleton } from "antd";
import React, { useState } from "react";
import DeleteProject from "./DeleteProject";

interface IData {
  description: string;
  createdAt: string;
  updatedAt: string;
  startDate: string;
  endDate: string;
  status: string;
}

interface IProps {
  data?: Partial<IData>;
  isLoading?: boolean;
  handleAddMember: () => void;
  handleEdit: () => void;
  handleDelete: () => void;
}

export const ProjectOverview: React.FC<IProps> = ({
  data,
  isLoading,
  handleEdit,
  handleAddMember,
  handleDelete,
}) => {
  const {
    description = "",
    createdAt = "",
    updatedAt = "",
    startDate = "",
    endDate = "",
    status = "",
  } = data as unknown as IData;

  return (
    <>
      <div className="bg-card shadow-sm rounded-md p-4">
        <div className="bg-mainBg shadow-md rounded-md p-4 flex gap-3 justify-between">
          <Skeleton loading={isLoading} active paragraph={{ rows: 4 }}>
            <>
              <div className="flex gap-3 items-center md:flex-row flex-col">
                <div className="flex flex-col gap-3 text-accent mt-4">
                  <h4 className="font-medium text-accent flex gap-4 capitalize">
                    <div>
                      <span className="font-semibold">Status</span> : {status}
                    </div>
                    <span className="text-caramel">|</span>{" "}
                    <div>
                      <span className="font-semibold">Start Date</span> :{" "}
                      {startDate}
                    </div>{" "}
                    <span className="text-caramel">|</span>{" "}
                    <div>
                      <span className="font-semibold">End Date</span> :{" "}
                      {endDate}
                    </div>{" "}
                  </h4>
                  <h4 className="font-medium text-accent flex gap-4">
                    <div>
                      <span className="font-semibold">Created At</span> :{" "}
                      {createdAt}
                    </div>{" "}
                    <span className="text-caramel">|</span>{" "}
                    <div>
                      <span className="font-semibold">Last Modified</span> :{" "}
                      {updatedAt}
                    </div>
                  </h4>

                  <div className=" gap-2 mt-2">
                    <h4 className="font-semibold text-accent">Description</h4>
                    <p>{description} </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 text-xl">
                <i
                  title="Edit Project"
                  className="ri-pencil-line cursor-pointer hover:text-caramel"
                  onClick={() => handleEdit()}
                ></i>
                <i
                  title="Delete Project"
                  className="ri-delete-bin-line cursor-pointer hover:text-caramel"
                  onClick={() => handleDelete()}
                ></i>
                <div>
                  <Dropdown
                    overlay={
                      <div>
                        <ul className="bg-mainBg rounded border shadow-sm p-2 flex gap-1 flex-col mb-2">
                          <li
                            className="cursor-pointer hover:text-caramel"
                            onClick={() => handleAddMember()}
                          >
                            Add Member
                          </li>
                        </ul>
                      </div>
                    }
                    trigger={["click"]}
                  >
                    <i className="ri-more-2-fill cursor-pointer hover:text-caramel"></i>
                  </Dropdown>
                </div>
              </div>
            </>
          </Skeleton>
        </div>
      </div>
    </>
  );
};
