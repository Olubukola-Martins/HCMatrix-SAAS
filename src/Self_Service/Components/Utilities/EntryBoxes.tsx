import React from "react";
import EntryBox from "./EntryBox";

interface IEntry {
  title: string;
  isLink: boolean;
  info: string;
  url?: string;
}

interface IProps {
  entries: IEntry[];
  extra?: React.ReactNode;
}

const EntryBoxes = ({ entries, extra }: IProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
      {entries.map((item, index) => (
        <div key={index}>
          {" "}
          <EntryBox item={item} />
        </div>
      ))}
      {extra}
    </div>
  );
};

export default EntryBoxes;
