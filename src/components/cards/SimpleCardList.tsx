import React from "react";
import { ISimpleCard, SimpleCard } from "./SimpleCard";

interface IProps {
  entries: ISimpleCard[];
  extra?: React.ReactNode;
}

const SimpleCardList = ({ entries, extra }: IProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
      {entries.map((item, index) => (
        <div key={index}>
          {" "}
          <SimpleCard {...item} />
        </div>
      ))}
      {extra}
    </div>
  );
};

export default SimpleCardList;
