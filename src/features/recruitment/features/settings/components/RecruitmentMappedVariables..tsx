import { Modal } from "antd";
import React from "react";
import { IMappedVariableProps } from "../types";

export const RecruitmentMappedVariables: React.FC<IMappedVariableProps> = ({
  handleClose,
  open,
  showPanelistName
}) => {
  return (
    <Modal onCancel={handleClose} open={open} footer={null}>
      <div className="w-11/12 mt-0 mb-7 flex flex-col mx-auto">
        <h2 className="font-bold text-lg my-1">Mapped Variables</h2>
        <p className="text-sm mb-10 mx-auto w-full">
          Each words in the curly bracket are map to the words opposite it.
        </p>
        <div className="flex flex-col gap-6 mx-auto w-full">
          <div className="flex h-fit mx-auto w-full">
            <p className="px-4 py-3 border border-gray-100 bg-gray-100 rounded-lg w-5/12">
              {"{appplicant_name}"}
            </p>
            <span className="w-[10.5%] h-3.5 my-auto bg-gray-100"></span>
            <p className="px-4 py-3 border border-gray-100 bg-gray-100 rounded-lg w-5/12">
              Applicant full name
            </p>
          </div>
          <div className="flex h-fit mx-auto w-full">
            <p className="px-4 py-3 border border-gray-100 bg-gray-100 rounded-lg w-5/12">
              {"{job_role}"}
            </p>
            <span className="w-[10.5%] h-3.5 my-auto bg-gray-100"></span>
            <p className="px-4 py-3 border border-gray-100 bg-gray-100 rounded-lg w-5/12">
              Job opening
            </p>
          </div>
          {showPanelistName && (
            <div className="flex h-fit mx-auto w-full">
              <p className="px-4 py-3 border border-gray-100 bg-gray-100 rounded-lg w-5/12">
                {"{panelist_name}"}
              </p>
              <span className="w-[10.5%] h-3.5 my-auto bg-gray-100"></span>
              <p className="px-4 py-3 border border-gray-100 bg-gray-100 rounded-lg w-5/12">
                Employee Name
              </p>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
