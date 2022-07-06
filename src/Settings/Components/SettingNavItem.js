import React from "react";
import { Link } from "react-router-dom";

const SettingNavItem = ({ item }) => {
  const { title, items } = item;
  return (
    <div
      className="setting-nav-item border drop-shadow-md p-6 rounded"
      style={{ background: "var(--background)" }}
    >
      <h5 className="text-accent text-lg font-semibold">{title}</h5>
      <ul className="sub-items mt-4">
        {items.map((item) => (
          <li className="mb-3 text-base" key={item.Link}>
            <Link to={item.link}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SettingNavItem;
