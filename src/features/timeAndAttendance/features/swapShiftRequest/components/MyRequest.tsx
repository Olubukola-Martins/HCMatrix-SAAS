import { ColumnsType } from "antd/lib/table";
import { allSwapRequestProps } from "../types";
import { TableWithFocusType } from "components/table";

export const MyRequest = () => {
  const columns: ColumnsType<allSwapRequestProps> = [
    {
      title: "Name",
      key: "name",
    },
  ];
  return (
    <div className="mt-5">
        
      <TableWithFocusType columns={columns} dataSource={[]} />
    </div>
  );
};
