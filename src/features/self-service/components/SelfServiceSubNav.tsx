import { Menu } from "antd";
import { appRoutes } from "config/router/paths";

import React from "react";
import { Link } from "react-router-dom";

const routes = [
  { title: "Dashboard", path: appRoutes.selfServiceHome },
  { title: "Onboarding", path: appRoutes.onboarding },
  { title: "Tasks", path: appRoutes.selfServiceTasks },
  { title: "Asset", path: appRoutes.selfServiceAssets },
  { title: "Loan", path: appRoutes.loans },
  { title: "Leave", path: appRoutes.leaveHome },
  { title: "Payslips", path: appRoutes.payslipTransactions },
  {
    title: "Requisitions",
    children: [
      { title: "Settings", path: appRoutes.selfServiceRequisition },
      { title: "Asset", path: appRoutes.selfServiceAssets },
      { title: "Transfer", path: appRoutes.selfServiceTransfer },
      { title: "Monetary", path: appRoutes.selfServiceMonetary },
      { title: "Promotion", path: appRoutes.selfServicePromotion },
      { title: "Reimbursement", path: appRoutes.selfServiceReimbursement },
      { title: "Job", path: appRoutes.selfServiceJob },
      { title: "Position Change", path: appRoutes.selfServicePositionChange },
      { title: "Travel", path: appRoutes.selfServiceTravels },
    ],
  },

  { title: "Vehicle Booking", path: appRoutes.vehicleBooking },
  {
    title: "More",
    children: [
      { title: "Conference Room", path: appRoutes.conferenceRoomBooking },
      { title: "Tasks", path: appRoutes.selfServiceTasks },
      { title: "Hand Over", path: appRoutes.newHandOverForm },
      { title: "Documents", path: appRoutes.documents },

      { title: "Health Access", path: appRoutes.healthAccessHome },
    ],
  },
];

const SelfServiceSubNav = () => {
  return (
    <div className="">
      <Menu
        className="bg-white py-4 px-3 text-accent rounded mb-9 shadow-md  text-sm font-medium"
        mode="horizontal"
        items={routes.map((item, i) => ({
          key: i,

          label: (
            <>
              {item?.path ? (
                <Link to={item.path} className="">
                  <span className="">{item.title}</span>
                </Link>
              ) : (
                <span>{item.title}</span>
              )}
            </>
          ),
          children: item?.children?.map((item) => ({
            key: item.title,
            label: (
              <>
                {item?.path ? (
                  <Link to={item.path} className="">
                    <span className="">{item.title}</span>
                  </Link>
                ) : (
                  <span>{item.title}</span>
                )}
              </>
            ),
          })),
        }))}
      />
    </div>
  );
};

export default SelfServiceSubNav;
