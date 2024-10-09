import React from "react";
import { ISimpleCard, SimpleCard } from "./SimpleCard";
import { IDivProps } from "types/html";

interface IProps extends Pick<IDivProps, "className"> {
  entries: ISimpleCard[];
  extra?: React.ReactNode;
}

const SimpleCardList = ({
  entries,
  extra,
  className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6",
}: IProps) => {
  return (
    <div className={className}>
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
