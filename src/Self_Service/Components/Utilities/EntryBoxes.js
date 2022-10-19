import React from "react";
import EntryBox from "./EntryBox";

const EntryBoxes = ({ entries }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
      {entries.map((item, index) => (
        <EntryBox key={index} item={item} />
      ))}
    </div>
  );
};

export default EntryBoxes;
