import { PageIntro } from "components/layout/PageIntro";
import { SubToper } from "../components/SubToper";
import { appRoutes } from "config/router/paths";
import { Input, Select } from "antd";
import { AppButton } from "components/button/AppButton";
import Table, { ColumnsType } from "antd/lib/table";

interface DataType {
  key: string;
  employee: string;
  timeIn: string;
  timeOut: string;
  status: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Employee",
    dataIndex: "employee",
  },
  {
    title: "Time in",
    dataIndex: "timeIn",
  },
  {
    title: "Time out",
    dataIndex: "timeOut",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Action",
    dataIndex: "",
  },
];

export const UploadTimesheet = () => {
  return (
    <div className="Container">
      <SubToper />
      <PageIntro title="Upload Attendance" link={appRoutes.attendanceHome} />
      <p className="pt-2 pb-6">Welcome on board, upload attendance manually</p>

      <Input.Search
        placeholder="Search branch"
        style={{ width: "35%" }}
        allowClear
      />

      <div className="flex items-center justify-between mt-6 mb-8">
        <div className="flex gap-3">
          <Select
            defaultValue="Daily"
            style={{ width: 120 }}
            options={[{ value: "daily", label: "Daily" }]}
          />
          <AppButton
            label="Feb 27-Mar 5"
            additionalClassNames={["transparentButton"]}
          />
        </div>
        <div className="flex gap-3">
          <AppButton variant="transparent" label="Add new" />
          <AppButton label="Add bulk" />
        </div>
      </div>

      <Table columns={columns} dataSource={[]} scroll={{ x: 500 }} />
    </div>
  );
};
