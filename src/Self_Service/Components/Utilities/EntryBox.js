import React from "react";
import { Link } from "react-router-dom";

const EntryBox = ({ item }) => {
  const { isLink, title, info } = item;
  if (isLink) {
    return (
      <Link
        to="/self-service/loan-request"
        className="border rounded-md p-2 shadow-sm bg-card text-white hover:shadow-md cursor-pointer"
      >
        <div className="rounded-md bg-caramel shadow p-3 border">
          <p className="text-sm font-medium py-3">{title}</p>
          <h2 className="font-semibold text-lg">{info}</h2>
        </div>
      </Link>
    );
  }
  return (
    <div className="border rounded-md p-2 shadow-sm bg-card hover:shadow-md cursor-pointer group">
      <div className="rounded-md bg-mainBg shadow p-3 group-hover:border-b-2 group-hover:border-caramel">
        <p className="text-sm font-medium py-3">{title}</p>
        <h2 className="font-semibold text-lg">{info}</h2>
      </div>
    </div>
  );
};

export default EntryBox;
