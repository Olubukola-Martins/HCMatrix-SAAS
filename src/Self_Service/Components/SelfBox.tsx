import { Dropdown, Popover } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import Themes from "../../Themes/Themes";

const requisitionContent = (
  <Themes>
    <div className="py-3 shadow-md px-4 text-sm font-medium rounded-md flex flex-col gap-3">
      <Link
        to="/self-service/requisition"
        className="cursor-pointer hover:text-caramel"
      >
        Asset Requisition
      </Link>
      <Link
        to="/self-service/reimbursements"
        className="cursor-pointer hover:text-caramel"
      >
        Reimbursement
      </Link>
      <Link
        to="/self-service/monetary"
        className="cursor-pointer hover:text-caramel"
      >
        Monetary Request
      </Link>
    </div>
  </Themes>
);

const moreContent = (
  <Themes>
    <ul className="py-3 shadow-md px-4 text-sm font-medium rounded-md flex flex-col gap-3">
      <li className="cursor-pointer hover:text-caramel">My Trainings</li>
      <li className="cursor-pointer hover:text-caramel">Appraisal</li>
      <Link
        to="/self-service/hr-letters"
        className="cursor-pointer hover:text-caramel"
      >
        HR Letters
      </Link>
      <li className="cursor-pointer hover:text-caramel">Documents</li>
      <Link
        to="/self-service/conference-room-booking"
        className="cursor-pointer hover:text-caramel"
      >
        Meeting Room Booking
      </Link>
      <Link
        to="/self-service/survey"
        className="cursor-pointer hover:text-caramel"
      >
        Survey Forms
      </Link>
      <Link
        to="/self-service/handover-form"
        className="cursor-pointer hover:text-caramel"
      >
        Hand-over Forms
      </Link>
    </ul>
  </Themes>
);

interface IProps {
  title: string;
  desc?: string;
  icon: string;
  link: string;
}

export const RequisitionBox = ({ icon }: { icon: string }) => {
  return (
    <div className="bg-card p-2 rounded-lg shadow cursor-pointer group text-accent">
      <div className="bg-mainBg transition ease-in-out duration-300 py-2 px-3 rounded-lg group-hover:border-b-2 group-hover:border-caramel group-hover:shadow-md">
        <div className="flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2">
            <div className="border rounded-full h-11 w-11 flex items-center justify-center">
              <img src={icon} alt="requisition" />
            </div>
            <h5 className="font-medium capitalize text-sm md:text-base">
              Requisition
            </h5>
          </div>
          <Dropdown
            overlayStyle={{ top: 1000 }}
            overlay={requisitionContent}
            trigger={["click"]}
            placement="bottomCenter"
          >
            <i className="ri-more-fill text-lg"></i>
          </Dropdown>
        </div>
        <p className="text-xs md:text-sm py-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
    </div>
  );
};
export const MoreBox = () => {
  return (
    <div className="bg-card p-2 rounded-lg shadow cursor-pointer group text-accent">
      <div className="bg-mainBg transition ease-in-out duration-300 py-2 px-3 rounded-lg  group-hover:border-b-2 group-hover:border-caramel group-hover:shadow-md">
        <div className="flex items-center justify-between">
          <button
            className="transparentButton"
            style={{ color: "var(--caramel)" }}
          >
            More
          </button>
          <Dropdown
            overlay={moreContent}
            trigger={["click"]}
            placement="bottomCenter"
          >
            <i className="ri-more-fill text-lg"></i>
          </Dropdown>
        </div>
        <p className="text-xs md:text-sm py-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
    </div>
  );
};

const SelfBox = ({ title, desc, icon, link }: IProps) => {
  return (
    <Link
      to={`/self-service/${link}`}
      className="bg-card p-2 rounded-lg shadow cursor-pointer group text-accent"
    >
      <div className="bg-mainBg transition ease-in-out duration-300 py-2 px-3 rounded-lg group-hover:border-b-2 group-hover:border-caramel group-hover:shadow-md">
        <div className="flex items-center gap-2">
          <div className="border rounded-full h-11 w-11 flex items-center justify-center">
            <img src={icon} alt={title} />
          </div>
          <h5 className="font-medium capitalize text-sm md:text-base">
            {title}
          </h5>
        </div>
        <p className="text-xs md:text-sm py-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
    </Link>
  );
};

export default SelfBox;
