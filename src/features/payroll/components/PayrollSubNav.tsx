import { Menu } from "antd";
import { payrollRoutes } from "config/router/routes/payroll";
import React from "react";
import { Link } from "react-router-dom";

const PayrollSubNav = () => {
  return (
    <div className="">
      <Menu
        className="bg-white py-4 px-3 text-accent rounded mb-9 shadow-md  text-sm font-medium"
        mode="horizontal"
        items={payrollRoutes
          .filter((item) => item.isPrimaryFeature)
          .map((item, i) => ({
            label: (
              <Link to={item.path} className="">
                <span className="">{item.title}</span>
              </Link>
            ),
            key: i,
          }))}
      />
    </div>
  );
};

export default PayrollSubNav;
