import React from "react";
import CompanyEntryCard from "./CompanyEntryCard";

const CompanyEntryCards = () => {
  return (
    <div className="flex flex-col gap-4">
      {Array(10)
        .fill(0)
        .map((item) => (
          <CompanyEntryCard />
        ))}
    </div>
  );
};

export default CompanyEntryCards;
