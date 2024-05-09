import React from "react";
import { Empty } from "antd";
import { AppButton } from "components/button/AppButton";
import { DEFAULT_PROFILE_IMAGE_URL } from "constants/general";

interface IProps {
  isAssigned: boolean;
  data?: {
    image?: string;
    name: string;
    designation?: string;
    empUid: string;
    department?: string;
    address?: string;
  };
  handleAssign: { fn: () => void; loading?: boolean };
  handleUnAssign: { fn: () => void; loading?: boolean };
}
export const AssigneeCard: React.FC<IProps> = ({
  data,
  isAssigned,
  handleAssign,
  handleUnAssign,
}) => {
  return (
    <div className="bg-mainBg border rounded-lg text-sm shadow py-4 px-3">
      <h4 className="font-medium text-lg">Current Assignee</h4>
      {isAssigned && data ? (
        <div className="flex gap-4 pt-7">
          <img
            src={data.image ?? DEFAULT_PROFILE_IMAGE_URL}
            alt="user"
            className="h-12"
          />
          <div className="flex flex-col gap-4">
            <p>Name: {data.name}</p>
            <p>Job Role: {data.designation}</p>
            <p>ID: {data.empUid}</p>
            <p>Department: {data.department} </p>
            <p>Location : {data.address}</p>

            <div className="flex justify-center">
              <AppButton
                label="Unassign"
                isLoading={handleUnAssign.loading}
                handleClick={() => handleUnAssign.fn()}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <Empty
            className="mt-10"
            description="Nobody is currently assigned !"
          />
          <div className="flex justify-center">
            <AppButton
              label="Assign"
              isLoading={handleAssign.loading}
              handleClick={() => handleAssign.fn()}
            />
          </div>
        </div>
      )}
    </div>
  );
};
