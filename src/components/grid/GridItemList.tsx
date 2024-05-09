import React from "react";
import { Pagination, TablePaginationConfig } from "antd";
import type { PaginationProps } from "antd";
import { GridItem, TGridItem } from "./GridItem";
import { DataContainerLoader } from "components/loaders/DataContainerLoader";

interface IProps {
  data: TGridItem[];
  loading: boolean;
  pagination?: TablePaginationConfig;
  onChange: PaginationProps["onChange"];
}

export const GridItemList: React.FC<IProps> = ({
  data,
  pagination,
  onChange,
  loading,
}) => {
  if (loading) {
    return (
      <>
        <DataContainerLoader />
      </>
    );
  }
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6">
        {data.map((item) => (
          <GridItem key={item.title} {...item} />
        ))}
      </div>
      <div className="mt-4 flex justify-end">
        <Pagination {...pagination} onChange={onChange} size="small" />
      </div>
    </div>
  );
};
