import { Menu } from "antd";
import { selfServiceRoutes } from "config/router/routes/selfService";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const SelfServiceSubNav = () => {
  const navigate = useNavigate();
  return (
    <div className="Container">
      <Menu
        className="bg-card  py-4 px-3 text-accent rounded mb-9 shadow  text-sm font-medium"
        mode="horizontal"
        items={selfServiceRoutes
          .filter((item) => item.isPrimaryFeature)
          .map((item) => ({
            label: item.title,
            key: item.path,
            onClick: () => navigate(item.path),
          }))}
      />
    </div>
  );
};

export default SelfServiceSubNav;
