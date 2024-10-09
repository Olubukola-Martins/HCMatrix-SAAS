import { Dropdown, Checkbox, Space } from "antd";
import { ColumnsType } from "antd/lib/table";
import { AppButton } from "components/button/AppButton";
import useHandleColorTheme from "hooks/theme/useHandleColorTheme";

interface TableFocusTypeBtnProps<TEntity> {
  selectedColumns: ColumnsType<TEntity>;
  setSelectedColumns: React.Dispatch<
    React.SetStateAction<ColumnsType<TEntity>>
  >;
  data: { columns: ColumnsType<TEntity>; leftComp?: React.ReactNode };
}

export function TableFocusTypeBtn<TEntity>({
  selectedColumns,
  setSelectedColumns,
  data,
}: TableFocusTypeBtnProps<TEntity>): JSX.Element {
  const { mode } = useHandleColorTheme();
  return (
    <Dropdown
      trigger={["click"]}
      overlay={
        <div
          className="px-2 py-3 shadow-lg"
          style={{
            background: mode === "dark" ? "#1a202c" : "#fff",
          }}
        >
          <Checkbox.Group
            value={selectedColumns.map(
              (column) => column.key?.toString() ?? ""
            )}
            onChange={(value: (number | string | boolean)[]) =>
              setSelectedColumns(
                data.columns.filter((column) =>
                  value.includes(column.key?.toString() ?? "")
                )
              )
            }
          >
            <Space direction="vertical">
              {data.columns.map((column) => (
                <Checkbox key={column.key} value={column.key}>
                  <span className="capitalize">{`${column.key}`}</span>
                </Checkbox>
              ))}
            </Space>
          </Checkbox.Group>
        </div>
      }
    >
      <div>
        <AppButton label="Focus Type" variant="transparent" />
      </div>
    </Dropdown>
  );
}
