import { Menu } from "antd";
import { appRoutes } from "config/router/paths";
import React from "react";
import { Link } from "react-router-dom";

const routes = [
  { title: "Cost Centres", path: appRoutes.payrollCostCentres },
  { title: "Exchange Rates", path: appRoutes.payrollExchangeRates },
  { title: "Payroll Schemes", path: appRoutes.payrollSchemes },
  { title: "Grade & Categories", path: appRoutes.payGradeAndCategorySettings },
  { title: "Cost Centres", path: appRoutes.payrollCostCentres },
  {
    title: "Organizations",
    children: [
      { path: appRoutes.taxAuthorities, title: "Tax" },
      { path: appRoutes.pensionAdministrators, title: "Pension" },
      { path: appRoutes.itfAuthorities, title: "ITF" },
      { path: appRoutes.nsitfAuthorities, title: "NSITF" },
    ],
  },
  { title: "Reports", path: appRoutes.payrollReport },
  { title: "Payslips", path: appRoutes.payslips },
];
const PayrollSubNav = () => {
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

export default PayrollSubNav;
