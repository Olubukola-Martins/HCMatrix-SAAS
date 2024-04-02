import { Input } from "antd";
import { ColumnsType } from "antd/lib/table";
import { TableFocusTypeBtn } from "components/table";
import React, { ComponentType, useState } from "react";

export interface TGenericEntityTableHOCProps {}

export function withGenericEntityTableHOCProps<
  T extends TGenericEntityTableHOCProps,
  TEntity
>(
  WrappedComponent: ComponentType<T>,
  data: {
    columns: ColumnsType<TEntity>;
    leftComp?: React.ReactNode;
  }
) {
  // Define the HOC component
  const WithAdditionalProp: React.FC<
    Omit<T, keyof TGenericEntityTableHOCProps>
  > = (props) => {
    const [selectedColumns, setSelectedColumns] = useState<
      ColumnsType<TEntity>
    >(data.columns);
    const [search, setSearch] = useState("");

    // Add the additionalProp to the props passed to the wrapped component
    const newProps = {
      ...(props as T),
      columns: selectedColumns,
      search,
    };

    // Render the wrapped component with the modified props
    return (
      <>
        <div className="space-y-6">
          <div className="flex justify-between flex-col lg:flex-row lg:items-center w-full  ">
            <>{data.leftComp}</>
            <div className="flex w-3/6 gap-x-6 lg:justify-end items-center">
              <Input.Search
                className="w-44 "
                onSearch={(val) => setSearch(val)}
                placeholder="Search"
                allowClear
              />
              {TableFocusTypeBtn<TEntity>({
                selectedColumns,
                setSelectedColumns,
                data,
              })}
            </div>
          </div>
          <WrappedComponent {...newProps} />
        </div>
      </>
    );
  };

  return WithAdditionalProp;
}
