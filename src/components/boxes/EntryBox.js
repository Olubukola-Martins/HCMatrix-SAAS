import React from "react";
import { Link } from "react-router-dom";

const EntryBox = ({ item }) => {
  const { isLink, title, info, url } = item;
  if (isLink) {
    return (
      <Link
        to={url}
        className="border rounded-md p-2 shadow-sm bg-card text-white hover:shadow-md cursor-pointer"
      >
        <div className="rounded-md bg-caramel shadow p-3 border">
          <p className="text-sm font-medium py-3">{title}</p>
          <p className="font-semibold text-lg">{info}</p>
        </div>
      </Link>
    );
  }
  return (
    <div className="border rounded-md p-2 shadow-sm bg-card hover:shadow-md cursor-pointer group">
      <div className="rounded-md bg-mainBg shadow p-3 group-hover:border-b-2 group-hover:border-caramel">
        <p className="text-sm font-medium py-3">{title}</p>
        <p className="font-semibold text-lg">{info}</p>
      </div>
    </div>
  );
};

export default EntryBox;
