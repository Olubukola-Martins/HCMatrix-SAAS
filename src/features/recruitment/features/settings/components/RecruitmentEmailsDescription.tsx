import React from "react";
import { IEmailTemplateDescriptionProps } from "../types";
import "../../../assets/style.css";
import { Dropdown } from "antd";
import type { MenuProps } from "antd";

export const RecruitmentEmailsDescription: React.FC<
  IEmailTemplateDescriptionProps
> = ({ emailMessage, emailSubject, candidateStatus }) => {
  const menuItems: MenuProps["items"] = [
    {
      label: "View",
      key: "1",
    },
    {
      label: "Edit",
      key: "2",
    },
    {
      label: "Delete",
      key: "3",
    },
  ];

  const menu = {
    items: menuItems,
  };

  return (
    <div className="border-b p-2 m-3 flex justify-between">
      <div>
        <h3 className="recruitmentEmailSubject">Email Subject -:</h3>
        <h2 className="recruitmentEmailMessage"> {emailSubject}</h2>
        <h3 className="recruitmentEmailSubject">Email Message -:</h3>
        <p className="font-medium">{emailMessage}</p>
        {candidateStatus && (
          <>
            <h3 className="recruitmentEmailSubject">
              Selected Candidate Status -:
            </h3>
            <p className="font-medium">{candidateStatus}</p>
          </>
        )}
      </div>
      <Dropdown trigger={["click"]} className="cursor-pointer" menu={menu}>
        <i className="ri-more-2-line"></i>
      </Dropdown>
    </div>
  );
};
