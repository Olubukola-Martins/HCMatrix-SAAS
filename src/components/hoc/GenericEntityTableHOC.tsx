import { Checkbox, Dropdown, Input, Space } from "antd";
import { ColumnsType } from "antd/lib/table";
import { AppButton } from "components/button/AppButton";
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
              <Dropdown
                trigger={["click"]}
                overlay={
                  <div className="bg-white px-2 py-3 shadow-lg">
                    <Checkbox.Group
                      value={selectedColumns.map(
                        (column, i) => column.key?.toString() ?? ""
                      )}
                      onChange={(value: (number | string | boolean)[]) =>
                        setSelectedColumns(
                          data.columns.filter((column, i) =>
                            value.includes(column.key?.toString() ?? "")
                          )
                        )
                      }
                    >
                      <Space direction="vertical">
                        {data.columns.map((column, i) => (
                          <Checkbox key={column.key} value={column.key}>
                            <span className="capitalize">{column.key}</span>
                          </Checkbox>
                        ))}
                      </Space>
                    </Checkbox.Group>
                  </div>
                }
              >
                <div>
                  <AppButton label="Focus Type" variant="default" />
                </div>
              </Dropdown>
            </div>
          </div>
          <WrappedComponent {...newProps} />
        </div>
      </>
    );
  };

  return WithAdditionalProp;
}

// Usage example
