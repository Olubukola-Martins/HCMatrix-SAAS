import React from "react";
import { IEmailTemplateDescriptionProps } from "../types";
import "../../../assets/style.css";
import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import { Link } from "react-router-dom";

export const RecruitmentEmailsDescription: React.FC<
  IEmailTemplateDescriptionProps
> = ({ emailMessage, emailSubject, candidateStatus, body, email, linkUrl }) => {
  const menuItems: MenuProps["items"] = [
    {
      label: <Link to={linkUrl}>View</Link>,
      key: "1",
    },
    {
      label: <Link to={linkUrl}>Edit</Link>,
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
    <div className="border-b p-2 m-2 flex justify-between">
      <div>
        <h3 className="recruitmentEmailSubject">{email}</h3>
        <h2 className="recruitmentEmailMessage"> {emailSubject}</h2>
        <h3 className="recruitmentEmailSubject">{body}</h3>
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
