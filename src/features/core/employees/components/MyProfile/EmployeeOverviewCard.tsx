import { Avatar, Dropdown, Skeleton } from "antd";
import { DEFAULT_PROFILE_IMAGE_URL } from "constants/general";
import React from "react";

interface IData {
  fullName: string;
  designation?: string;
  department?: string;
  empuid: string;
  email: string;
  phone?: string;
  address: string;
  avatarUrl?: string;
  role: string;
}

interface IProps {
  data?: Partial<IData>;
  isLoading?: boolean;
  handleResignation: () => void;
  handleSuspension: () => void;
  handleEdit: () => void;
  handleActivate: () => void;
}

export const EmployeeOverviewCard: React.FC<IProps> = ({
  data,
  isLoading,
  handleEdit,
  handleResignation,
  handleSuspension,
  handleActivate,
}) => {
  const {
    fullName = "No name",
    designation = "No Designation",
    department = "No Department",
    empuid = "No UID",
    email = "No Email",
    phone = "No Phone",
    address = "No Address",
    avatarUrl,
    role = "No Role",
  } = data as unknown as IData;
  return (
    <>
      <div className="bg-mainBg shadow-sm rounded-md p-4 flex gap-3 justify-between">
        <Skeleton loading={isLoading} active paragraph={{ rows: 4 }}>
          <>
            <div className="flex gap-3 items-center md:flex-row flex-col">
              <Avatar
                shape="circle"
                src={avatarUrl ?? DEFAULT_PROFILE_IMAGE_URL}
                alt={`employee avatar`}
                size={140}
              />

              <div className="flex flex-col gap-1 text-accent">
                <h3 className="text-lg font-medium text-accent">{fullName}</h3>
                <h4 className="font-medium text-accent">
                  {designation} | {department}
                </h4>
                <h5 className="text-sm text-accent">{role}</h5>
                <div className="text-sm flex md:items-center gap-3 md:flex-row flex-col mt-1">
                  <div className="flex items-center gap-2">
                    <i className="ri-profile-line text-caramel"></i>
                    <span>{empuid} | </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="ri-mail-line text-caramel"></i>
                    <span>{email} | </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="ri-phone-line text-caramel"></i>
                    <span> {phone}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <i className="ri-map-pin-line text-caramel"></i>
                  <span>{address} </span>
                </div>
              </div>
            </div>
            <div className="flex gap-3 text-xl">
              <i
                title="Edit Employee"
                className="ri-pencil-line cursor-pointer hover:text-caramel"
                onClick={handleEdit}
              />
              <Dropdown
                overlay={
                  <div>
                    {
                      <ul className="bg-mainBg rounded border shadow-sm p-2 flex gap-1 flex-col mb-2">
                        <li
                          className="cursor-pointer hover:text-caramel"
                          onClick={handleActivate}
                        >
                          Enable User
                        </li>
                        <li
                          className="cursor-pointer hover:text-caramel"
                          onClick={handleSuspension}
                        >
                          Suspend User
                        </li>
                      </ul>
                    }

                    {
                      <ul className="bg-mainBg rounded border shadow-sm p-2  mb-2">
                        <li
                          className="cursor-pointer hover:text-caramel"
                          onClick={handleResignation}
                        >
                          Submit Resignation
                        </li>
                      </ul>
                    }
                  </div>
                }
                placement="topLeft"
                trigger={["click"]}
              >
                <i className="ri-more-2-fill cursor-pointer hover:text-caramel"></i>
              </Dropdown>
            </div>
          </>
        </Skeleton>
      </div>
    </>
  );
};
